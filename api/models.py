from config import flask_app, db, ENV

class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)

class City(db.Model):
    __tablename__ = "cities"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    country = db.Column(db.String(80), nullable=False)
    country_code = db.Column(db.String(10), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    timezone = db.Column(db.String(80), nullable=False)
    admin_zone_1 = db.Column(db.String(80), nullable=True)
    admin_zone_2 = db.Column(db.String(80), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'cityName': self.name,
            'country': self.country,
            'countryCode': self.country_code,
            'coordinates': {
                'lat': self.lat,
                'lon': self.lon
            },
            'timezone': self.timezone,
            'adminZone1': self.admin_zone_1,
            'adminZone2': self.admin_zone_2
        }

def auto_create_admin():
    """Create admin user in the DB if there is none present."""
    from security import pass_hasher

    if ENV['AUTO_CREATE_ADMIN'] != 'true':
        return
    
    admins = db.session.execute(db.select(Admin)).scalars().all()
    if len(admins) > 0:
        return

    username = ENV['ADMIN_NAME']
    password = ENV['ADMIN_PASS']

    admin = Admin(username=username, password=pass_hasher.hash(password))
    db.session.add(admin)
    db.session.commit()

    print(f'INFO:     Created admin user: {username}')

with flask_app.app_context():
    db.create_all()
    auto_create_admin()