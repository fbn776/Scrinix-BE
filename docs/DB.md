# Database Configurations


This uses `psql` cli for postgresql database.

## Create Database and User

```bash
sudo -u postgres psql
```

```postgresql
CREATE DATABASE dbms_lab;
```

```postgresql
CREATE USER dbms_user WITH PASSWORD 'pass@123';
```

```postgresql
GRANT ALL PRIVILEGES ON DATABASE dbms_lab TO dbms_user;
```

```postgresql
ALTER USER dbms_user CREATEDB;
```

If you're having issues with permission, exit the psql using `\q` command and type in the following commands
    
```bash
psql dbms_lab
```
    
```postgresql
GRANT ALL PRIVILEGES ON DATABASE dbms_lab TO dbms_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dbms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO dbms_user;
```

```postgresql
GRANT USAGE, SELECT ON SEQUENCE exam_e_id_seq TO dbms_user;
```


Once done create the .env file and populate the following fields:

```dotenv
PORT=5432
DB_USER=dbms_user
DB_HOST=localhost
DB_NAME=dbms_lab
DB_PASSWORD=pass@123
```

> If the above credentials are used the .env file would look something like this

## Creating the schema

```bash
sudo -u postgres  psql -d dbms_lab
```
Then...
```postgresql
\i /path-to-backend/init/schema.sql
```

For cleaning up the database:

```postgresql
\i /path-to-backend/init/cleanup.sql
```
