import {Router} from "express";
import HTTP_status from "../../lib/HTTP_status";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";

const examRouter = Router();

const getAllExamQuery = `SELECT E.*,
                                STRING_AGG(CONCAT(EF.semester, '-', EF.scheme), ' ') AS sem_scheme
                         FROM Exam E
                                  JOIN
                              ExamFor EF ON E.E_ID = EF.E_ID AND E.ClgID = EF.ClgID
                         GROUP BY E.E_ID, E.ClgID;
`;

examRouter.get('/all', async (req, res) => {
    try {
        Logger.info('STARTED');

        const result = await pgPool.query(getAllExamQuery);

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