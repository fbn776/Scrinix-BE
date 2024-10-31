import HTTP_status from "../../lib/HTTP_status";
import {
    db_createCollege,
    db_deleteCollegeByID,
    db_getAllCollege,
    db_getCollegeBy,
    db_updateCollege
} from "../../models/college/model";
import {isSuccess} from "../../lib/ErrorHandling";
import {Request, Response} from "express";


const rootAdminController = {
    /** Create college entry */
    createCollege: async (req: Request, res: Response) => {
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

        const result = await db_createCollege(body.ID, body.name);

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
        const body: {
            ID: string,
        } = req.body;

        if (!body.ID) {
            res.status(HTTP_status.BAD_REQUEST).send('ID is required');
            return;
        }

        const result = await db_deleteCollegeByID(body.ID);

        if (isSuccess(result)) {
            console.log(result.data);
            res.json(result.data);
        } else {
            console.error(result.error);
            res.status(HTTP_status.NOT_FOUND).send(result.error);
        }
    },

    /** Get college entry */
    getCollege: async (req: Request, res: Response) => {
        const body: {
            ID: string,
        } = req.body;

        if (!body.ID) {
            res.status(HTTP_status.BAD_REQUEST).send('ID is required');
            return;
        }

        const result = await db_getCollegeBy(body.ID);

        if (isSuccess(result)) {
            console.log(result.data);
            res.json(result.data);
        } else {
            console.error(result.error);
            res.status(HTTP_status.NOT_FOUND).send(result.error);
        }
    },

    /** Get all college entries */
    getAllCollege: async (req: Request, res: Response) => {
        const query = req.query;
        const limit = query.limit ? parseInt(query.limit as string) : undefined;
        const offset = query.offset ? parseInt(query.offset as string) : undefined;

        const result = await db_getAllCollege(limit, offset);
        if(isSuccess(result)){
            res.json(result.data);
        } else {
            res.status(HTTP_status.INTERNAL_SERVER_ERROR).send(result.error);
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