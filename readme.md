# WeatherApp
Live Demo:  
- Front: NA
- Backend: [https://weather-api.joeper.myds.me](https://weather-api.joeper.myds.me)

This web application was made with the following stack:
- Backend:
    - Flask
    - Connexion
    - Flask-SQLAlchemy
    - OpenMeteo
    - MS SQL Server

- Frontend:
    - React
    - Base Web
    - Redux React

It presents daily and hourly forecast data for previously loaded cities through the administration dashboard.
This doesn't make much sense, as all the data is directly available via OpenMeteo API without the need to setup a backend service or DB, but it was done for the sake of the assignement.

The admin dashboard allows to inspect the data, filter by fields, edit, delete and create new entries easily by utilizing the OpenMeteo Geocoding API to fetch the relevant information of the cities to load into the DB.

The API is totally documented with the OpenAPI standard.

## Requirements
- [Python 3.11](https://www.python.org/downloads/windows/)
- [Node v20+](https://nodejs.org/en)
- [pipenv](https://pipenv.pypa.io/en/latest/)
- [SQL Server 2022](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [ODBC Driver 17 for SQL Server](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16#version-17) 

## Running locally
Due to the stack used, there is some setup to do, I will go step by step so you can follow along.

### Setup

First of all, we need to setup a MS SQL Server instance, and create a .env file for the server.

You can use the bacpac file in the api directory to import the DB, or create a new one from scratch.

To import the bacpac, follow these steps (example with SSMS):
- Connect to the target SQL Server instance in SSMS.
- Right-click on the "Databases" node in Object Explorer.
- Select "Import Data-tier Application".
- Follow the wizard, selecting the .bacpac file and specifying the target database name. 

The bacpac file should contain around 25/30 cities loaded up.

After the DB is setup, you can clone or download the repo, then go into de api folder.

There you will see a `.env-template` file. Copy the contents and paste them into a new .env file inside the /api folder.
The .env-template file already contains some default values, but you should replace the following ones.

This will be needed to create the connection to the SQL Server instance, make sure that you have SQL Authentication enabled:
- `DB_USER=your_sql_username`
- `DB_PASS=your_sql_password`
- `DB_HOST=your_sql_server_hostname`


These values are the ones used to create the CRUD admin user, you will need them to log into the administrator dashboard of the app:
- `AUTO_CREATE_ADMIN=true`
- `ADMIN_NAME=the_username_for_the_admin_user`
- `ADMIN_PASS=the_password_for_the_admin_user`

The rest of the variables are not very critical and can be kept as is.

On the client side, you also have a `.env-template` file. You can copy teh contents into a `.env` file, it only contains the API URLs the client uses. 

Now you will need two terminals to run the two servers simultaneously.  

#### Backend:  
```bash
cd api
pipenv install
pipenv run uvicorn main:app
# or `pipenv run python main.py` for fast reload
``` 

#### Frontend:
```bash
cd client
npm run build
npm run preview
```

Now you should be able to access:
- The OpenAPI Swagger documentation on [http//:localhost:8000/ui](http//:localhost:8000/ui)
- The API on the endpoints specified in the docs (you can use postman or interact with it directly from Swagger)
- The Web application on [http://localhost:4173/](http://localhost:4173/)

The admin dashboard is not accessible via the UI. You should navigate to the `/login` route to login with the credentials specified in the .env file.

## Further development
Due to time constraints, some enhancements that would be nice to have could not be implemented.  

- Features:
    - Add historical weather data support.
    - Add possibility to create cities in bulk through a JSON or CSV file.
    - Add `react-map-gl` to `/city` route and `CityForm` to display the location of the city in question.
    - Add localization support.

- Enhancements: 
    - Add user creation to persist data on DB instead of browser storage.
    - Add admin user management to CRUD (different admin roles / CRUD admin users).
    - Add DB migration to manage schema changes in a better more susteinable way.
    - Migrate Redux AsyncThunks to RTK Query.


## SQL Server Troubleshooting
If you encounter any errors during the setup related to SQL Server, please check the following items:
- Enable SQL Authentication
- Make sure you have the [ODBC Driver 17 for SQL Server](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16#version-17) installed in your system.
- Make sure your MSSQLSERVER instance has the TCP/IP protocol enabled in `SQL Server Configuration Manager -> SQL Server Network Configuration -> Protocols for MSSQLSERVER`.


## Resources
Media used for the UI elements:

[Weather](https://icons8.com/icon/qA3w9Yp2vY7r/weather) icon by [Icons8](https://icons8.com)  
[Wind](https://icons8.com/icon/RtDA8YDN9Mi9/wind) icon by [Icons8](https://icons8.com)  
[Wet](https://icons8.com/icon/I7Uv9dQ4WLYh/wet) icon by [Icons8](https://icons8.com)  
[Rain](https://icons8.com/icon/kKxyuLXD4w0n/rain) icon by [Icons8](https://icons8.com)  
[Rain Cloud](https://icons8.com/icon/PIXtKMDAXCzo/rain-cloud) icon by [Icons8](https://icons8.com)  
[Partly Cloudy Day](https://icons8.com/icon/zIVmoh4T8wh7/partly-cloudy-day) icon by [Icons8](https://icons8.com)  
[Clouds](https://icons8.com/icon/W8fUZZSmXssu/clouds) icon by [Icons8](https://icons8.com)  
[Cloud Lightning](https://icons8.com/icon/c0Otgmp74zQX/cloud-lightning) icon by [Icons8](https://icons8.com)  
[Snow](https://icons8.com/icon/cyZConbteZk9/snow) icon by [Icons8](https://icons8.com)  
[Sunny](https://icons8.com/icon/8EUmYhfLPTCF/sun) icon by [Icons8](https://icons8.com)  
[Thermometer](https://icons8.com/icon/e3LJkBOFiBL7/thermometer) icon by [Icons8](https://icons8.com)  
[Water Drop](https://icons8.com/icon/IVnaKF3VkqSZ/blur) icon by [Icons8](https://icons8.com)  
[Sun](https://icons8.com/icon/60002/sun) icon by [Icons8](https://icons8.com)  
<a target="_blank" href="https://icons8.com/icon/9eToT1eAIEII/uv-index">Uv Index</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>  
<a target="_blank" href="https://icons8.com/icon/19436/windsock">Windsock</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>  

