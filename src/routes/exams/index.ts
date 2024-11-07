import {Request, Response, Router} from "express";
import HTTP_status from "../../lib/HTTP_status";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";
import multer from "multer";

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
 * /exam?e_id=?&clg_id=?
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

    if (!e_id || !clgid) {
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

/**
 * Deletes the seating arrangement for the exam with the given exam id and college id
 */
examRouter.delete('/delete/seating/:clgid/:e_id', async (req, res) => {
    const {clgid, e_id} = req.params;

    Logger.info("Deleting seating arrangement for exam with clgid = ", clgid, " and e_id = ", e_id);

    if (!clgid || !e_id) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'clgid and e_id as params are required'
        });
    }

    try {
        await pgPool.query(`DELETE
                            FROM files f
                            WHERE f.file_id = (SELECT seating_arrangement
                                               FROM exam
                                               WHERE clgid = $1
                                                 AND e_id = $2)`, [clgid, e_id]);

        return res.status(HTTP_status.OK).json({
            message: 'Seating arrangement deleted'
        });
    } catch (e) {
        Logger.error("Error: ", e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "An error happened"
        })
    }
});

/**
 * Deletes the timetable for the exam with the given exam id and college id
 */
examRouter.delete('/delete/timetable/:clgid/:e_id', async (req, res) => {
    const {clgid, e_id} = req.params;

    Logger.info("Deleting time table for exam with clgid = ", clgid, " and e_id = ", e_id);

    if (!clgid || !e_id) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'clgid and e_id as params are required'
        });
    }

    try {
        await pgPool.query(`DELETE
                            FROM files f
                            WHERE f.file_id = (SELECT time_table
                                               FROM exam
                                               WHERE clgid = $1
                                                 AND e_id = $2)`, [clgid, e_id]);

        return res.status(HTTP_status.OK).json({
            message: 'Time table deleted'
        });
    } catch (e) {
        Logger.error("Error: ", e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "An error happened"
        })
    }
});

async function uploadFile(req: Request, res: Response, type: 'seating' | 'timetable') {
    const {e_id, clgid} = req.body;
    const file = req.file;

    console.log(type, e_id, clgid, file);

    if (!e_id || !clgid || !file) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'e_id, clgid and file as body are required'
        });
    }

    try {
        await pgPool.query('BEGIN');
        const fileQuery = `
            INSERT INTO Files (file_data, file_name)
            VALUES ($1, $2)
            RETURNING file_id, created_at;
        `;
        const fileResult = await pgPool.query(fileQuery, [file.buffer, file.originalname]);

        await pgPool.query(type === 'seating' ?
                'UPDATE Exam SET seating_arrangement = $1 WHERE e_id = $2 AND clgid = $3' :
                'UPDATE Exam SET time_table = $1 WHERE e_id = $2 AND clgid = $3',
            [fileResult.rows[0].file_id, e_id, clgid]);

        await pgPool.query('COMMIT');

        return res.json({
           message: `Successfully uploaded ${type}`
        });
    } catch (e) {
        Logger.error("Error: ", e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "An error happened"
        })
    }

}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 10 * 1024 * 1024}
});

/**
 * Uploads the seating arrangement for the exam with the given exam id and college id
 */
examRouter.post('/upload/seating', upload.single('file'), async (req, res) => {
    await uploadFile(req, res, 'seating');
});

/**
 * Uploads the timetable for the exam with the given exam id and college id
 */
examRouter.post('/upload/timetable', upload.single('file'), async (req, res) => {
    await uploadFile(req, res, 'timetable');
})

export default examRouter;