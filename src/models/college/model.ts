import {CollegeModel} from "../type";
import pgPool from "../../config/db";
import {error, ResultPromise, success} from "../../lib/ErrorHandling";

/**
 * Creates a college
 * @param ID
 * @param name
 */
export async function db_createCollege(ID: string, name: string): ResultPromise<CollegeModel, string> {
    if (ID.length > 10) {
        return error('ID or name too long');
    }

    try {
        await pgPool.query('INSERT INTO College (id, name) VALUES ($1, $2)', [ID, name]);

        return success({
            ID,
            name
        });
    } catch (e: any) {
        console.error(e);
        return error(e.message || 'Error creating college');
    }
}

/**
 * Deletes a college by ID
 * @param ID
 */
export async function db_deleteCollegeByID(ID: string): ResultPromise<string, string> {
    try {
        console.log(await pgPool.query('DELETE FROM College WHERE id = $1', [ID]));
        return success("College deleted");
    } catch (e: any) {
        return error(e.message || 'Error deleting college');
    }
}

/**
 * Gets a single college by ID
 * @param ID
 */
export async function db_getCollegeBy(ID: string): ResultPromise<CollegeModel, string> {
    try {
        const data = await pgPool.query('SELECT * FROM College WHERE ID = $1', [ID]);
        return success(data.rows[0] as CollegeModel);
    } catch (e: any) {
        return error(e.message || 'Error getting college');
    }

}

/**
 * Gets all colleges
 * @param limit No of items per page
 * @param offset No of items to skip
 */
export async function db_getAllCollege(limit?: number, offset?: number): ResultPromise<CollegeModel[], string> {
    try {
        const data = await pgPool.query('SELECT * FROM College LIMIT $1 OFFSET $2', [limit || 1000, offset || 0]);
        return success(data.rows as CollegeModel[]);
    } catch (e: any) {
        return error(e.message || 'Error getting all colleges');
    }
}

export async function db_updateCollege(ID: string, name: string): ResultPromise<CollegeModel, string> {
    try {
        await pgPool.query('UPDATE College SET name = $1 WHERE ID = $2', [name, ID]);
        return success({
            ID,
            name
        });
    } catch (e: any) {
        return error(e.message || 'Error updating college');
    }
}