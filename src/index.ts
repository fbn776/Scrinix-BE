import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pgPool from "./config/db";
import facultyRouter from "./routes/faculty";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import adminRouter from "./routes/admin";
import coordinator from "./routes/coordinator";
import coordinatorRouter from "./routes/coordinator";
import examRouter from "./routes/exams";

require('dotenv').config();

const PORT = process.env.PORT;
if(!PORT)
    throw new Error('No PORT specified');

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

/**** Routes ****/
app.use('/admin', adminRouter);
app.use('/faculty', facultyRouter);

app.use('/coordinator', coordinatorRouter);
app.use('/exams', examRouter);

app.listen(PORT, async () => {
    try {
        await pgPool.connect();

        console.log(`Server listening on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
});