import {Router} from "express";
import rootAdminRouter from "./root";
import clgAdminRouter from "./clgAdmin";

const adminRouter = Router();

adminRouter.use('/root', rootAdminRouter);
adminRouter.use('/college', clgAdminRouter);

export default adminRouter;

