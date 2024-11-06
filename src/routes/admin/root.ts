import {Request, Response, Router} from "express";
import rootAdminController from "../../controllers/admin/root";
import HTTP_status from "../../lib/HTTP_status";
import {db_getAllCollege, db_getCollegeBy} from "../../models/college/model";
import {isSuccess} from "../../lib/ErrorHandling";
import pgPool from "../../config/db";
import hashPassword from "../../lib/hashPassword";
import Logger from "../../lib/Logger";

/**
 * /admin/root/
 */
const rootAdminRouter = Router();

rootAdminRouter.get('/college', async (req: Request, res: Response) => {
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
});

rootAdminRouter.get('/colleges', async (req: Request, res: Response) => {
    const query = req.query;
    const limit = query.limit ? parseInt(query.limit as string) : undefined;
    const offset = query.offset ? parseInt(query.offset as string) : undefined;


    const result = await db_getAllCollege(limit, offset);
    if (isSuccess(result)) {
        res.json(result.data);
    } else {
        res.status(HTTP_status.INTERNAL_SERVER_ERROR).send(result.error);
    }
},);

rootAdminRouter.post('/create-college', rootAdminController.createCollege);

rootAdminRouter.patch('/update-college', rootAdminController.updateCollege);

rootAdminRouter.delete('/delete-college/:id', rootAdminController.deleteCollege);

/**
 * Create a new college admin
 */
rootAdminRouter.post('/create-admin', async (req, res) => {
    const {userName, clgID, password} = req.body;

    if (!userName || !clgID || !password) {
        return res.status(HTTP_status.BAD_REQUEST).json({
            message: "username, clgID and password are required fields"
        })
    }

    try {
        const hashedPassword = await hashPassword(password);
        const result = await pgPool.query('INSERT INTO collegeadmins VALUES ($1, $2, $3) RETURNING clgid, username, created_at', [clgID, userName, hashedPassword]);

        return res.json({
            message: "College Admin successfully created",
            data: result.rows[0]
        })
    } catch (e) {
        if (e instanceof Error) {
            Logger.error("Database error:", e.message);
            if (e.message.includes('duplicate key')) {
                return res.status(HTTP_status.CONFLICT).json({
                    message: 'duplicate user',
                    isDuplicate: true
                })
            }
        }

        return res.status(HTTP_status.BAD_REQUEST).json({
            message: 'An error happened'
        })
    }
});

rootAdminRouter.get('/get-college-admins', async (req, res) => {
    Logger.info('Getting all college admins');
    try {
        const result = await pgPool.query('SELECT clgid, username, created_at FROM collegeadmins ORDER BY created_at DESC');
        return res.json({
            data: result.rows
        })
    } catch (e) {
        Logger.error("Error while getting all college admins:", e);
        return res.status(HTTP_status.INTERNAL_SERVER_ERROR).json({
            message: 'An error happened'
        });
    }
});

rootAdminRouter.delete('/delete-admin/:clgID/:username', async (req, res) => {
   try {
       const result = await pgPool.query('DELETE FROM collegeadmins WHERE clgid = $1 AND username = $2', [req.params.clgID, req.params.username]);

       return res.json({
              message: 'Admin deleted successfully',
              data: result.rows
       });
   } catch (e) {
         Logger.error('Error while deleting admin:', e);
         return res.status(HTTP_status.NOT_FOUND).json({
              message: 'Cannot delete admin'
         });
   }
});

export default rootAdminRouter;