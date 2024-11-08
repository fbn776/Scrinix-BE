import {Router} from "express";
import Logger from "../../lib/Logger";
import pgPool from "../../config/db";
import HTTP_status from "../../lib/HTTP_status";
import {verifyPassword} from "../../lib/hashPassword";

const staffRouter = Router();

staffRouter.post('/by-clg', async (req, res) => {
    const {clg_id} = req.body;
    Logger.info('Getting staff by subject:', clg_id);

    if (!clg_id) {
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    try {
        const result = await pgPool.query(
            `SELECT *
             FROM faculty F
             WHERE F.clgid = $1`, [clg_id]);

        return res.status(200).json({
            data: result.rows
        });
    } catch
        (e) {
        Logger.error('Error in getting staff by subject:', e);
        return res.status(400).json({
            message: 'Error'
        });
    }
});

staffRouter.get('/has-faculty/:clg_id/:f_id', async (req, res) => {
    const {clg_id, f_id} = req.params;

    if (!f_id || !clg_id) {
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    try {
        const result = await pgPool.query(
            `SELECT clgid, name, f_id, email, phone
             FROM faculty F
             WHERE F.f_id = $1
               AND F.clgid = $2`,
            [f_id, clg_id]);

        if (result.rows.length === 0) {
            return res.json({
                hasFaculty: false
            });
        }

        return res.status(200).json({
            hasFaculty: true
        });
    } catch (e) {
        Logger.error('Error in checking faculty:', e);
        return res.status(400).json({
            message: 'Error'
        });
    }

});

staffRouter.get('/faculty/:clg_id/:f_id', async (req, res) => {
    const {clg_id, f_id} = req.params;

    if (!f_id || !clg_id) {
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    try {
        const result = await pgPool.query(
            `SELECT *
             FROM faculty F
             WHERE F.f_id = $1
               AND F.clgid = $2`,
            [f_id, clg_id]);

        if (result.rows.length === 0) {
            return res.status(HTTP_status.NOT_FOUND).json({
                message: 'Faculty not found'
            });
        }

        return res.status(200).json({
            data: result.rows[0]
        });
    } catch (e) {
        Logger.error('Error in getting faculty:', e);
        return res.status(400).json({
            message: 'Error'
        });
    }
});

/**
 * Get all question paper and college id for a staff with f_id
 */
staffRouter.post('/available-qp', async (req, res) => {
    const {clgid, f_id} = req.body;

    Logger.info("Get all question paper with clg id = ", clgid, "and f_id = ", f_id);

    if (!clgid || !f_id) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'clg_id, f_id as body are required'
        });
    }
    /*
    e_id                serial,
        clgid               varchar(10)  not null
            references college
                on update cascade,
        title               varchar(100) not null,
        start_date          date         not null,
        end_date            date         not null,
        seating_arrangement integer
            references files
                on update cascade,
        time_table          integer
            references files
                on update cascade,
        created_time        timestamp default CURRENT_TIMESTAMP,
        primary key (e_id, clgid)
     */
    try {
        const result = await pgPool.query(`
            SELECT QP.f_id,
                   QP.e_id,
                   QP.clgid,
                   C.name                as course_name,
                   QP.course_id,
                   QP.scheme,
                   C.semester,
                   QP.status,
                   QP.due_date           as qp_due_date,
                   QP.submitted_date     as qp_submitted_date,
                   QP.file_id,
                   QP.created_date       as qp_created_at,
                   F.name                as faculty_name,
                   F.email               as faculty_email,
                   F.phone               as faculty_phone,
                   E.title               as exam_title,
                   E.start_date          as exam_start_date,
                   E.end_date            as exam_end_date,
                   E.seating_arrangement as seating_arrangement,
                   E.time_table          as time_table,
                   E.created_time        as exam_created_at
            FROM questionpaper QP
                     JOIN faculty F ON QP.f_id = F.f_id and QP.clgid = F.clgid
                     JOIN course C ON QP.course_id = C.course_id AND QP.scheme = C.scheme
                     JOIN exam E ON QP.e_id = E.e_id AND QP.clgid = E.clgid
            WHERE QP.clgid = $1
              AND QP.f_id = $2
        `, [clgid, f_id]);

        return res.json({data: result.rows});
    } catch (e) {
        Logger.error("Error: ", e);

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "An error happened"
        })
    }
});


staffRouter.post('/login', async (req, res) => {
    const {clgid, f_id, password} = req.body;

    if (!clgid || !f_id || !password) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'clgid, f_id and password are required'
        });
    }

    try {
        const result = await pgPool.query(`SELECT * FROM faculty WHERE clgid = $1 AND f_id = $2`, [clgid, f_id]);

        if(result.rows.length === 0) {
            return res.status(HTTP_status.NOT_FOUND).json({
                message: 'Faculty not found'
            });
        }

        const faculty = result.rows[0];

        const isMatch = (faculty.hashed_password === password);// TODO await verifyPassword(password, faculty.hashed_password);

        if(isMatch) {
            return res.status(HTTP_status.OK).json({
                message: 'Logged in'
            });
        } else
            return res.status(HTTP_status.UNAUTHORIZED).json({
                message: 'Invalid credentials'
            });

    } catch (e) {
        Logger.error('Error in login:', e);
        return res.status(400).json({
            message: 'Error'
        });
    }
});

export default staffRouter;

