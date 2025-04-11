FROM python:3.11-slim

# Microsoft ODBC Driver 17
RUN apt-get update && apt-get install -y \
    curl gnupg2 apt-transport-https ca-certificates \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    # Remove conflicting Debian packages
    && apt-get remove -y libodbc1 libodbcinst2 unixodbc unixodbc-dev || true \
    # Install only Microsoft’s packages
    && ACCEPT_EULA=Y apt-get install -y \
        msodbcsql17 \
        unixodbc-dev \
    # Clean up
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install pipenv

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

COPY . .

EXPOSE 6666

CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6666"]