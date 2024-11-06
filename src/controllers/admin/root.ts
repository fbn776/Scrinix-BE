import HTTP_status from "../../lib/HTTP_status";
import {db_createCollege, db_updateCollege} from "../../models/college/model";
import {isSuccess} from "../../lib/ErrorHandling";
import {Request, Response} from "express";
import pgPool from "../../config/db";
import Logger from "../../lib/Logger";


const rootAdminController = {
    /** Create college entry */
    createCollege: async (req: Request, res: Response) => {
        const body: {
            clgID: string,
            name: string
        } = req.body;

        if (!body.clgID || !body.name) {
            res.status(HTTP_status.BAD_REQUEST).send(
                !body.clgID ? 'ID is required' : !body.name ? 'name is required' :
                    'ID and name are required'
            );
            return;
        }

        const result = await db_createCollege(body.clgID, body.name);

        if (isSuccess(result)) {
            console.log(result.data);
            res.json(result.data);
        } else {
            console.error(result.error);
            res.status(HTTP_status.CONFLICT).send(result.error);
        }
    },

    /** Delete college entry */
    deleteCollege: async (req: Request, res: Response) => {
        const ID = req.params.id;
        Logger.info('Deleting college with ID:', ID);
        if (!ID) {
            res.status(HTTP_status.BAD_REQUEST).send('ID is required');
            return;
        }
        try {
            const result = await pgPool.query('DELETE FROM College WHERE id = $1', [ID]);
            Logger.success('Deleted college with ID:', ID);
            return res.json(result.rows[0]);
        } catch (e: any) {
            if (e.code === '23503') {
                Logger.error('Cannot delete user due to foreign key constraint:', e);
                return res.status(HTTP_status.CONFLICT).json({ message: `Cannot delete ${ID}, since other values depend on this college`});
            }
            Logger.error('Cannot delete college:', e);
            return res.status(HTTP_status.NOT_FOUND).send("Cannot delete college");
        }
    },


    /** Update college entry */
    updateCollege: async (req: Request, res: Response) => {
        const body: {
            ID: string,
            name: string
        } = req.body;

        if (!body.ID || !body.name) {
            res.status(HTTP_status.BAD_REQUEST).send(
                !body.ID ? 'ID is required' : !body.name ? 'name is required' :
                    'ID and name are required'
            );
            return;
        }

        const result = await db_updateCollege(body.ID, body.name);

        if (isSuccess(result)) {
            console.log(result.data);
            res.json(result.data);
        } else {
            console.error(result.error);
            res.status(HTTP_status.CONFLICT).send(result.error);
        }
    }
}

export default rootAdminController;