import {Router} from "express";
import HTTP_status from "../../lib/HTTP_status";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";

const coordinatorRouter = Router();

coordinatorRouter.post('/exam', async (req, res) => {
    const body: {
        clgID: string,
        title: string,
        sem_scheme: string[],
        start_date: string,
        end_date: string
    } = req.body;

    if (!body.clgID || !body.title || (body.sem_scheme || []).length === 0 || !body.start_date || !body.end_date) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `Missing item from body, it should be of the format {clgID, title, semesters, startDate, endDate}`
        })
    }

    if (new Date(body.start_date) > new Date(body.end_date)) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'Start date should be before end date'
        });
    }


    try {
        Logger.info('STARTED');
        await pgPool.query('BEGIN');

        const result = await pgPool.query(
            'INSERT INTO Exam (ClgID, title, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING E_ID, ClgID, created_time',
            [body.clgID, body.title, body.start_date, body.end_date]
        );

        const e_id: number = result.rows[0].e_id,
            clg_id: string = result.rows[0].clgid,
            created_time: string = result.rows[0].created_time;

        Logger.info('Exam added to DB with ID:', e_id, 'and clg_id:', clg_id, ' at:', created_time);

        for (let semester of body.sem_scheme) {
            let splits = semester.split('-');
            let sem = parseInt(splits[0].trim().substring(1));
            let scheme = parseInt(splits[1].trim());

            await pgPool.query('INSERT INTO ExamFor (ClgID, E_ID, scheme, semester) VALUES ($1, $2, $3, $4)', [clg_id, e_id, scheme, sem]);
        }

        await pgPool.query('COMMIT');
        Logger.success("Added to DB");
        return res.status(200).json({
            message: 'Exam added successfully',
            data: {
                e_id: e_id,
                clgID: clg_id,
                title: body.title,
                start_date: body.start_date,
                end_date: body.end_date,
                sem_scheme: body.sem_scheme,
                created_time
            }
        });
    } catch (e: any) {
        Logger.error('DB insertion failed: ', e);
        await pgPool.query('ROLLBACK');

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `ERROR: ${e}`
        })
    }
});

/** Create a new question paper */
coordinatorRouter.post('/assign-faculty', async (req, res) => {
    Logger.info('Creating question paper');
    const {
        f_id,
        e_id,
        clgID,
        course_id,
        scheme,
        due_date,
    } = req.body;

    Logger.info(
        f_id,
        e_id,
        clgID,
        course_id,
        scheme,
        due_date
    );

    if (!f_id || !e_id || !clgID || !course_id || !scheme || !due_date) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'Missing required fields'
        });
    }

    try {
        await pgPool.query('BEGIN');

        await pgPool.query('INSERT INTO QuestionPaper (f_id, e_id, clgID, course_id, scheme, due_date) VALUES ($1, $2, $3, $4, $5, $6)',
            [f_id, e_id, clgID, course_id, scheme, due_date]);
        /*
        clgid, e_id, scheme, semester
         */

        await pgPool.query('COMMIT');

        return res.json({
            message: 'Question paper created successfully'
        });
    } catch (e: any) {
        Logger.error('ERROR in creating qp: ', e);
        if (e.code === '23505') {
            return res.status(HTTP_status.CONFLICT).json({
                message: 'Question paper already exists'
            });
        }

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `ERROR: ${e}`
        });
    }
});

export default coordinatorRouter;