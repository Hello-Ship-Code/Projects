import { user } from '../models/user';
import { Request, Response } from 'express';

// Define the response data structure
type ResponseData<T> = {
    status: string;
    message?: string;
    data?: T;
}

const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await user.find({});
        const responseData: ResponseData<typeof users> = {
            status: users.length ? 'success' : 'error',
            data: users.length ? users : undefined,
            message: users.length ? undefined : 'Users not found',
        };
        res.status(users.length ? 200 : 404).json(responseData);
    } catch (error) {
        console.error("Error while fetching all users", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

const postAllUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !gender || !jobTitle) {
        res.status(400).json({ status: "error", message: "All fields are required" });
        return;
    }

    try {
        const newUser = new user({ firstName, lastName, email, gender, jobTitle });
        const savedUser = await newUser.save();
        res.status(201).json({ status: "success", data: savedUser });
    } catch (error) {
        console.error("Error while posting user", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findById(req.params.id);
        res.status(userId ? 200 : 404).json({
            status: userId ? "success" : "error",
            data: userId || undefined,
            message: userId ? undefined : "User not found",
        });
    } catch (error) {
        console.error("Error while fetching user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

const patchUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(userId ? 200 : 404).json({
            status: userId ? "success" : "error",
            data: userId || undefined,
            message: userId ? undefined : "User not found",
        });
    } catch (error) {
        console.error("Error while updating user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findByIdAndDelete(req.params.id);
        res.status(userId ? 200 : 404).json({
            status: userId ? "success" : "error",
            message: userId ? "User deleted successfully" : "User not found",
        });
    } catch (error) {
        console.error("Error while deleting user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

export { allUsers, postAllUser, getUserById, patchUserById, deleteUserById };
