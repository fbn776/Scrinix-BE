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

examRouter.post('/has-exam', async (req, res) => {
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
    })

examRouter.get('/exam', async (req, res) => {
    const {e_id, clg_id} = req.query;
    Logger.info('Getting exam with exam id =', e_id, clg_id);

    if (!e_id || !clg_id) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'e_id and clg_id as query params are required'
        });
    }

    try {
        const result = await pgPool.query(
            `SELECT E.*,
                    STRING_AGG(CONCAT(EF.semester, '-', EF.scheme), ' ') AS sem_scheme
             FROM Exam E
                      JOIN
                  ExamFor EF ON E.E_ID = EF.E_ID AND E.ClgID = EF.ClgID
             WHERE E.E_ID = $1
               AND E.clgid = $2
             GROUP BY E.E_ID, E.ClgID, E.created_time
             ORDER BY E.created_time DESC`, [e_id, clg_id]
        );

        return res.status(HTTP_status.OK).json({
            data: result.rows
        });
    } catch (e: any) {
        Logger.error(`Getting exam with e_id = ${e_id} and clg_id = ${clg_id} failed; ERROR:`, e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `ERROR: ${e}`
        });
    }
});

examRouter.post('/get-subjects', async (req, res) => {
    const {e_id, clg_id}: {
        e_id: string,
        clg_id: string,
    } = req.body;

    Logger.info('Getting subjects for exam with exam ID = ', e_id, "clg ID = ", clg_id);

    if (!e_id || !clg_id) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'e_id and clg_id as body are required'
        });
    }

    try {
        const result = await pgPool.query(`
            SELECT C.*
            FROM exam E
                     JOIN examfor EF
                          ON E.clgid = EF.clgid AND E.e_id = EF.e_id
                     JOIN course C
                          ON EF.semester = C.semester AND EF.scheme = C.scheme
            WHERE E.clgid = $1
              AND E.e_id = $2`, [clg_id, e_id]);

        return res.status(HTTP_status.OK).json({
            data: result.rows
        });
    } catch (e: any) {
        Logger.error(`Getting subjects for exam with e_id = ${e_id} and clg_id = ${clg_id} failed; ERROR:`, e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: e
        });
    }
});


export default examRouter;