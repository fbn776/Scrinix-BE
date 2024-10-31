# Backend Structure

1. **Root Folder Structure:**
   ```
   ├── src
   │   ├── config
   │   ├── controllers
   │   ├── middleware
   │   ├── models
   │   ├── routes
   │   ├── services
   │   ├── utils
   │   └── app.ts
   └── README.md
   ```

2. **Folders Overview:**

    - **`config/`:** Configuration files (database, environment variables, etc.). Example: `db.ts` for database connection.
    - **`controllers/`:** Request handlers for your routes (business logic). Each file typically corresponds to a model (e.g., `userController.ts`).
    - **`middleware/`:** Express middleware for request handling (e.g., authentication, logging, etc.).
    - **`models/`:** Your database models (using Sequelize, TypeORM, or raw queries).
    - **`routes/`:** All API route definitions. Organize by resource (e.g., `userRoutes.ts`).
    - **`services/`:** Core business logic that interacts with models (optional but helps separate concerns).
    - **`utils/`:** Helper functions (e.g., error handling, formatting).
    - **`app.ts`:** Main entry point, where you initialize Express and middleware, connect to the DB, and define routes.

## Example Code

1. **Route Example (in `routes/userRoutes.ts`):**
   ```ts
   import express from 'express';
   import { getUser, createUser } from '../controllers/userController';

   const router = express.Router();

   router.get('/:id', getUser);
   router.post('/', createUser);

   export default router;
   ```

2. **Controller Example (in `controllers/userController.ts`):**
   ```ts
   import { Request, Response } from 'express';
   import pool from '../config/db';

   export const getUser = async (req: Request, res: Response) => {
     const { id } = req.params;
     const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
     res.json(user.rows[0]);
   };

   export const createUser = async (req: Request, res: Response) => {
     const { name, email } = req.body;
     await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
     res.status(201).json({ message: 'User created' });
   };
   ```

3. **Middleware Example (in `middleware/auth.ts`):**
   ```ts
   import { Request, Response, NextFunction } from 'express';

   export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
     const token = req.headers.authorization;
     if (!token) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     // Token validation logic
     next();
   };
   ```

4. **App Entry (in `app.ts`):**
   ```ts
   import express from 'express';
   import userRoutes from './routes/userRoutes';
   import dotenv from 'dotenv';
   import pool from './config/db';

   dotenv.config();

   const app = express();
   app.use(express.json());

   app.use('/api/users', userRoutes);

   const PORT = process.env.PORT || 5000;

   app.listen(PORT, async () => {
     try {
       await pool.connect();
       console.log(`Server running on port ${PORT}`);
     } catch (error) {
       console.error('Error connecting to the database', error);
     }
   });
   ```
If you're planning to use raw SQL queries with PostgreSQL, here's how you can organize and implement them using the `pg` package (PostgreSQL client for Node.js).

Let’s walk through an example with raw queries for handling users in the database.

### Folder: `models/userModel.ts`

This file will contain raw SQL queries interacting with the PostgreSQL database using the `pg` package. You'll use `pg`'s `Pool` to query the database.

```ts
import pool from '../config/db';

// Fetch a user by ID
export const getUserById = async (id: number) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (name: string, email: string) => {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [name, email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUserById = async (id: number) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    throw error;
  }
};
```

### Folder: `controllers/userController.ts`

Here’s how you can use the raw queries in the controller.

```ts
import { Request, Response } from 'express';
import { getUserById, createUser, deleteUserById } from '../models/userModel';

// Controller for fetching a user by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller for creating a new user
export const createUserController = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller for deleting a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserById(Number(id));
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

### Folder: `routes/userRoutes.ts`

Connect these controllers to your routes.

```ts
import express from 'express';
import { getUser, createUserController, deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUser);
router.post('/', createUserController);
router.delete('/:id', deleteUser);

export default router;
```

### Example SQL Table (PostgreSQL)

Here’s a simple table schema for the `users` table in PostgreSQL:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);
```

### Database Configuration (`config/db.ts`)

Your `pg` setup in the `config/db.ts` file would look like this:

```ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;
```

This way, you're interacting with the database using raw queries directly from your `models` while keeping the codebase clean and organized. Let me know if you'd like to adjust or extend this structure!

This structure is flexible and modular, making it easy to maintain and scale. Let me know if you need help setting up any specific part!