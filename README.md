# Scrinix-backend
Welcome to the backend of Scrinix, a platform designed to streamline the moderation of internal exams.
This documentation outlines the key aspects, features, and structure of the backend system, built to provide a secure and efficient foundation for the application.

> **Note**: The application is not completed. Feel free to contribute or fork this project.

## **Frontend Repository**
The frontend repository can be found [here](https://github.com/fbn776/Scrinix-FE).

## **Tech Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **File Uploads**: Multer (stored in postgres)

---

## **Project Structure**
```plaintext
└── Scrinix-BE/
    ├── README.md
    ├── package.json
    ├── tsconfig.json
    ├── .swcrc
    ├── docs/
    │   ├── README.md
    │   ├── DB.md
    │   ├── File structure.md
    │   ├── Private.md
    │   ├── TODO.md
    │   └── assets/
    ├── init/
    │   ├── basic_insertions.sql
    │   ├── cleanup.sql
    │   └── schema.sql
    └── src/
        ├── index.ts
        ├── config/
        │   └── db.ts
        ├── controllers/
        │   └── admin/
        │       └── root.ts
        ├── lib/
        │   ├── ErrorHandling.ts
        │   ├── HTTP_status.ts
        │   ├── Logger.ts
        │   ├── hashPassword.ts
        │   └── utils.ts
        ├── models/
        │   ├── type.d.ts
        │   ├── college/
        │   │   └── model.ts
        │   └── faculty/
        │       └── model.ts
        └── routes/
            ├── swagger.ts
            ├── admin/
            │   ├── clgAdmin.ts
            │   ├── index.ts
            │   └── root.ts
            ├── coordinator/
            │   └── index.ts
            ├── course/
            │   └── index.ts
            ├── exams/
            │   └── index.ts
            └── staff/
                └── index.ts
```

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