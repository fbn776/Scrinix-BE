import {Router} from "express";

const facultyRouter = Router();

facultyRouter.get('/', async (req, res) => {
    res.send('Hello from faculty');
});

facultyRouter.get('/profile', (req, res) => {
    res.send('Hello from faculty profile');
});

export default facultyRouter;