import {Router} from "express";
import HTTP_status from "../../lib/HTTP_status";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";

const examRouter = Router();

examRouter.get('/all', async (req, res) => {
    try {
        Logger.info('STARTED');


        const result = await pgPool.query('SELECT * FROM Exam');

        return res.status(HTTP_status.OK).json({
           data: result.rows
        });

    } catch (e: any) {
        Logger.error('DB insertion failed: ', e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `ERROR: ${e}`
        })
    }
});

export default examRouter;