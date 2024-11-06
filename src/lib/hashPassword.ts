import bcrypt from "bcrypt";
import {ResultPromise, success, error} from "./ErrorHandling";

/**
 * Takes in a string (password) and hashes it using the bcrypt lib (10 rounds of salt)
 * @param password
 */
export default async function hashPassword(password: string): ResultPromise<string, string> {
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return success(hashedPassword);
    } catch (e) {
        console.error("Error hashing password:", e);
        return error("Error while hashing password");
    }
};

/**
 * Checks if a password is the same as a hashed password;
 * @param password
 * @param hashedPassword
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            console.log("Password is correct!");
        } else {
            console.log("Password is incorrect.");
        }
        return match;
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;
    }
}

