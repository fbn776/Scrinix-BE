import pgPool from "../../config/db";
import {error, ResultPromise, success} from "../../lib/ErrorHandling";


export interface FacultyModel {
    f_id: string;
    clgid: string
    name: string,
    email: string
    phone: string;
}

export default async function db_createFaculty(f_id: string, clgid: string, name: string, email: string, phone: string): ResultPromise<FacultyModel, string> {
    try {
        const data = await pgPool.query('INSERT INTO Faculty (f_id, clgid, name, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [f_id, clgid, name, email, phone]);
        return success(data.rows[0] as FacultyModel);
    } catch (e: any) {
        console.error(e);
        return error(e.message || 'Error creating faculty');
    }
}

export async function db_deleteFacultyByID(f_id: string, clgid: string): ResultPromise<string, string> {
    try {
        await pgPool.query('DELETE FROM Faculty WHERE f_id = $1 AND clgid = $2', [f_id, clgid]);
        return success("Faculty deleted");
    } catch (e: any) {
        return error(e.message || 'Error deleting faculty');
    }
}

export async function db_getFacultyBy(f_id: string, clgid: string): ResultPromise<FacultyModel, string> {
    try {
        const data = await pgPool.query('SELECT * FROM Faculty WHERE f_id = $1 AND clgid = $2', [f_id, clgid]);
        return success(data.rows[0] as FacultyModel);
    } catch (e: any) {
        return error(e.message || 'Error getting faculty');
    }
}

export async function db_updateFaculty(f_id: string, clgid: string, name: string, email: string, phone: string): ResultPromise<FacultyModel, string> {
    try {
        const data = await pgPool.query('UPDATE Faculty SET name = $1, email = $2, phone = $3 WHERE f_id = $4 AND clgid = $5 RETURNING *', [name, email, phone, f_id, clgid]);
        return success(data.rows[0] as FacultyModel);
    } catch (e: any) {
        return error(e.message || 'Error updating faculty');
    }
}

export async function db_getAllFacultyByCollege(clgid: string, limit?: number, offset?: number): ResultPromise<FacultyModel[], string> {
    try {
        const data = await pgPool.query('SELECT * FROM Faculty WHERE clgid = $1 LIMIT $2 OFFSET $3', [clgid, limit, offset]);
        return success(data.rows as FacultyModel[]);
    } catch (e: any) {
        return error(e.message || 'Error getting all faculty');
    }
}
