import {Router} from "express";
import rootAdminController from "../../controllers/admin/root";

/**
 * /admin/root/
 */
const rootAdminRouter = Router();

/**
 * @swagger
 * /admin/root/college:
 *   get:
 *     summary: Get a college entry
 *     description: This endpoint returns a college entry with the specified ID.
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: string
 *                   example: '123'
 *                 name:
 *                   type: string
 *                   example: 'Rajiv Gandhi Institute of Technology'
 *       400:
 *         description: Bad Request
 */
rootAdminRouter.get('/college', rootAdminController.getCollege);

/** @swagger
* /admin/root/colleges:
*   get:
*     summary: Get all college entries
*     description: This endpoint returns all college entries.
*     parameters:
*       - in: query
*         name: limit
*         required: false
*         schema:
*           type: integer
*           description: Number of items per page
*       - in: query
*         name: offset
*         required: false
*         schema:
*           type: integer
*           description: Number of items to skip
*     responses:
*       200:
*         description: Successfully retrieved
*         content:
*           application/json:
*             schema:
    *               type: array
*               items:
*                 type: object
*                 properties:
*                   ID:
    *                     type: string
*                     example: '123'
*                   name:
*                     type: string
*                     example: 'Rajiv Gandhi Institute of Technology'
*       500:
*         description: Internal server error
*/
rootAdminRouter.get('/colleges', rootAdminController.getAllCollege);

/**
 * @swagger
 * /admin/root/create-college:
 *   post:
 *     summary: Create a college entry
 *     description: This endpoint creates a new college with the specified ID and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: string
 *                 example: '123'
 *               name:
 *                 type: string
 *                 example: 'Rajiv Gandhi Institute of Technology'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Collage created!'
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 */
rootAdminRouter.post('/create-college', rootAdminController.createCollege);

/**
 * @swagger
 * /admin/root/update-college:
 *  patch:
 *  summary: Update a college entry
 *  description: This endpoint updates a college with the specified ID and name.
 */
rootAdminRouter.patch('/update-college', rootAdminController.updateCollege);

/**
 * @swagger
 * /admin/root/delete-college:
 *   delete:
 *     summary: Delete a college entry
 *     description: This endpoint deletes a college with the specified ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: string
 *                 example: '123'
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Collage deleted!'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
rootAdminRouter.delete('/delete-college', rootAdminController.deleteCollege);

export default rootAdminRouter;