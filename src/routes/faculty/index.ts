import {Router} from "express";
import Logger from "../../lib/Logger";
import pgPool from "../../config/db";

const faultyRouter = Router();

faultyRouter.post('/by-sub', async (req, res) => {
    const {scheme, course_id, clg_id} = req.body;
    Logger.info('Getting faculty by subject:', scheme, course_id, clg_id);

    if (!scheme || !course_id || !clg_id) {
        return res.status(400).json({
            message: 'Invalid request'
        });
    }

    try {
        const result = await pgPool.query(
            `SELECT *
             FROM faculty F
                      JOIN teaches T ON F.f_id = T.f_id
             WHERE T.clg_id = $1
               AND T.scheme = $2
               AND T.course_id = $3`, [clg_id, scheme, course_id]);

        return res.status(200).json({
            data: result.rows
        });
    } catch
        (e) {
        Logger.error('Error in getting faculty by subject:', e);
        return res.status(400).json({
            message: 'Error'
        });
    }
});

export default faultyRouter;

