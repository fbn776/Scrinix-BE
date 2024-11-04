import {Router} from "express";
import rootAdminController from "../../controllers/admin/root";

/**
 * /admin/root/
 */
const rootAdminRouter = Router();

rootAdminRouter.get('/college', rootAdminController.getCollege);

rootAdminRouter.get('/colleges', rootAdminController.getAllCollege);

rootAdminRouter.post('/create-college', rootAdminController.createCollege);

rootAdminRouter.patch('/update-college', rootAdminController.updateCollege);

rootAdminRouter.delete('/delete-college/:id', rootAdminController.deleteCollege);



export default rootAdminRouter;