import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pgPool from "./config/db";
import facultyRouter from "./routes/faculty";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import adminRouter from "./routes/admin";

require('dotenv').config();

const PORT = process.env.PORT;
if(!PORT)
    throw new Error('No PORT specified');

const app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));



const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Scrinix API docs',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/routes/*/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**** Routes ****/
app.use("/admin", adminRouter);
app.use("/faculty", facultyRouter);

app.use("/coordinator", coodinatorRouter);


app.listen(PORT, async () => {
    try {
        await pgPool.connect();

        console.log(`Server listening on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
});