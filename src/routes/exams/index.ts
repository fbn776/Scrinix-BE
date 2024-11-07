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

/**
 * Gets all the exams;
 */
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

/**
 * Checks if an exam with the given exam id and college id exists
 */
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

/**
 * Get all exams with the exam id and college id
 */
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

/**
 * Gets all the subjects available for the exam (that is not selected [selected = false])
 *
 * Get all courses associated with the exam (older version)
 *```psql
 SELECT C.*
    FROM exam E
    JOIN examfor EF
        ON E.clgid = EF.clgid AND E.e_id = EF.e_id
    JOIN course C
        ON EF.semester = C.semester AND EF.scheme = C.scheme
    WHERE E.clgid = $1
        AND E.e_id = $2
 ```
 */
examRouter.post('/get-available-subjects', async (req, res) => {
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
                     LEFT JOIN questionpaper QP
                               ON C.course_id = QP.course_id AND C.scheme = QP.scheme AND E.e_id = QP.e_id AND
                                  E.clgid = QP.clgID
            WHERE E.clgid = $1
              AND E.e_id = $2
              AND QP.course_id IS NULL;
        `, [clg_id, e_id]);

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

/**
 * Gets all question paper with the specify exam id and college id
 */
examRouter.post('/get-qp', async (req, res) => {
    const {e_id, clgid} = req.body;

    Logger.info("Get all question paper with exam id = ", e_id, " and clg id = ", clgid);

    if(!e_id || !clgid) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'e_id and clg_id as body are required'
        });
    }

    try {
        const result = await pgPool.query(`
            SELECT QP.f_id,
                   QP.e_id,
                   QP.clgid,
                   C.name            as course_name,
                   QP.course_id,
                   QP.scheme,
                   C.semester,
                   QP.status,
                   QP.due_date       as qp_due_date,
                   QP.submitted_date as qp_submitted_date,
                   QP.file_id,
                   QP.created_date   as qp_created_at,
                   F.name            as faculty_name,
                   F.email           as faculty_email,
                   F.phone           as faculty_phone
            FROM questionpaper QP
                     JOIN faculty F ON QP.f_id = F.f_id and QP.clgid = F.clgid
                     JOIN course C ON QP.course_id = C.course_id AND QP.scheme = C.scheme
            WHERE QP.e_id = $1
              AND QP.clgid = $2
        `, [e_id, clgid]);

        return res.json({data: result.rows});
    } catch (e) {
        Logger.error("Error: ", e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "An error happened"
        })
    }
});


export default examRouter;