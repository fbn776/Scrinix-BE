import {Router} from "express";
import Logger from "../../lib/Logger";
import pgPool from "../../config/db";

const collegeRouter = Router();

collegeRouter.get('/has-clg/:clg_id', async (req, res) => {
    const {clg_id} = req.params;
    if(!clg_id) return res.status(400).json({success: false});

    try {
        const result = await pgPool.query('SELECT * FROM college WHERE id = $1', [clg_id]);

        if(result.rows.length === 0) return res.json({success: false});

        return res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (e) {
        Logger.error(e);

        return res.status(500).json({success: false});
    }


});


export default collegeRouter;