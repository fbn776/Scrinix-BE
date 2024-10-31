import {Router} from "express";

const clgAdminRouter = Router();


/**
 * TODO:
 * Only a college admin can create a faculty; that is both college ID should be same
 */
clgAdminRouter.post('/create-faculty', collegeAdminController.createFaculty);

clgAdminRouter.get('/faculty', collegeAdminController.getFaculty);

clgAdminRouter.get('/faculties', collegeAdminController.getAllFaculties);

clgAdminRouter.delete('/faculty', collegeAdminController.deleteFaculty);

clgAdminRouter.patch('/faculty', collegeAdminController.updateFaculty);

clgAdminRouter.post('/set-exam-coordinator', collegeAdminController.setExamCoordinator);



export default clgAdminRouter;
