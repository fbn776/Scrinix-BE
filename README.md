# Scrinix-backend


## Usage

### Development

1. Clone the repository
2. Install the dependencies.
    ```bash
    npm install
   # or
    yarn install
    # or
    pnpm install
    ```
3. Create a `.env` file and populate it with the following environment variables.
    ```dotenv
    PORT=3000
    DB_USER=
    DB_HOST=
    DB_NAME=
    DB_PASSWORD=
    ```
4. Start the development server.
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
5. The server would be running at [http://localhost:3000](http://localhost:3000) locally.

### Production

1. Clone the repository and install the dependencies and follow the above mentioned steps upto step 3.
2. Build the project.
    ```bash
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```
3. Start the production server.
    ```bash
    npm start
    # or
    yarn start
    # or
    pnpm start
    ```

### Database

The project uses postgres SQL as the database. 
For creating the scheme run the [schema](./init/schema.sql) file in the database.
For cleaning up the scheme run the [cleanup](./init/cleanup.sql) file in the database.

### API Documentation

The API documentation is available at [http://localhost:5000/api-docs](http://localhost:3000/api-docs) when the server is running.