import {Router} from "express";
import Logger from "../../lib/Logger";
import pgPool from "../../config/db";
import HTTP_status from "../../lib/HTTP_status";


const courseRouter = Router();

courseRouter.get('/all', async (req, res) => {
    try {
        Logger.info('STARTED');

        const result = await pgPool.query('SELECT * FROM Course');

        return res.json({
            data: result.rows
        });
    } catch (e: any) {
        return res.status(HTTP_status.NOT_FOUND).json({
            message: `ERROR: ${e}`
        })
    }
});

courseRouter.delete('/delete-course/:course_id/:scheme', async (req, res) => {
    const {course_id, scheme} = req.params;
    if(!course_id || !scheme) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'Missing parameters'
        });
    }

    try {
        Logger.info('STARTED');

        const result = await pgPool.query('DELETE FROM Course WHERE course_id = $1 AND scheme = $2', [course_id, scheme]);

        return res.json({
            data: result.rows
        });
    } catch (e: any) {
        return res.status(HTTP_status.NOT_FOUND).json({
            message: `ERROR: ${e}`
        })
    }

});

export default courseRouter;