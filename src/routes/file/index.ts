import {Router} from "express";
import pgPool from "../../config/db";

const fileRouter = Router();

fileRouter.get('/download/:fileId', async (req, res) => {
    const { fileId } = req.params;

    try {
        const query = 'SELECT file_data, file_name FROM Files WHERE file_id = $1';
        const values = [fileId];
        const result = await pgPool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send('File not found');
        }

        const file = result.rows[0];
        res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(file.file_data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Internal server error');
    }
});

export default fileRouter;