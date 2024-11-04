import {Router} from "express";
import Logger from "../../lib/Logger";
import pgPool from "../../config/db";

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

export default staffRouter;

