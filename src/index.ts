import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pgPool from "./config/db";
import adminRouter from "./routes/admin";
import coordinatorRouter from "./routes/coordinator";
import examRouter from "./routes/exams";
import facultyRouter from "./routes/staff";
import courseRouter from "./routes/course";
import fileRouter from "./routes/file";

require('dotenv').config();

const PORT = process.env.PORT;
if(!PORT)
    throw new Error('No PORT specified');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**** Routes ****/
app.use('/admin', adminRouter);

app.use('/coordinator', coordinatorRouter);
app.use('/exams', examRouter);

app.use('/staff', facultyRouter);

app.use('/course', courseRouter);

app.use('/file', fileRouter);

app.listen(PORT, async () => {
    try {
        await pgPool.connect();

        console.log(`Server listening on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
});
