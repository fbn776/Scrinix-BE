import {Router} from "express";
import HTTP_status from "../../lib/HTTP_status";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";

const coordinatorRouter = Router();

coordinatorRouter.post('/exam', async (req, res) => {
    const body: {
        clgID: string,
        title: string,
        semesters: string[],
        startDate: string,
        endDate: string
    } = req.body;

    console.log(body);

    if (!body.clgID || !body.title || (body.semesters || []).length === 0 || !body.startDate || !body.endDate) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: `Missing item from body, it should be of the format {clgID, title, semesters, startDate, endDate}`
        })
    }

    if (new Date(body.startDate) > new Date(body.endDate)) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'Start date should be before end date'
        });
    }


    try {
        Logger.info('STARTED');
        await pgPool.query('BEGIN');

        const result = await pgPool.query(
            'INSERT INTO Exam (ClgID, title, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING E_ID, ClgID',
            [body.clgID, body.title, body.startDate, body.endDate]
        );
        console.log(result.rows[0])

        const e_id: number = result.rows[0].e_id,
            clg_id: string = result.rows[0].clgid;

        for (let semester of body.semesters) {
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
                E_ID: e_id,
                ClgID: clg_id,
                title: body.title,
                startDate: body.startDate,
                endDate: body.endDate,
                semesters: body.semesters
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

export default coordinatorRouter;