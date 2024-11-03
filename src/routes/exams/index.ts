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
                         GROUP BY E.E_ID, E.ClgID, E.created_time
                         ORDER BY E.created_time DESC;
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

examRouter.get('/has-exam', async (req, res) => {
        const {e_id, clg_id} = req.body;
        Logger.info('Has exam check with exam id =', e_id, clg_id);
        try {
            const result = await pgPool.query('SELECT e_id FROM exam WHERE e_id = $1 AND clgid = $2', [e_id, clg_id]);

            return res.status(HTTP_status.OK).json({
                hasExam: (result.rowCount || 0) > 0
            });
        } catch (e: any) {
            Logger.error(`Check for has exam with e_id = ${e_id} and clg_id = ${clg_id} failed; ERROR:`, e);

            return res.status(HTTP_status.BAD_REQUEST).json({
                message: `ERROR: ${e}`
            });
        }
    }
)

export default examRouter;