import { user } from '../models/user';
import { Request, Response } from 'express';

// Define the response data structure using `type`
type ResponseData<T> = {
    status: "success" | "error";
    message?: string;
    data?: T;
};

const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await user.find({});
        const responseData: ResponseData<typeof users> = users.length
            ? { status: "success", data: users }
            : { status: "error", message: "Users not found" };
        
        res.status(users.length ? 200 : 404).json(responseData);
    } catch (error: unknown) {
        const responseData: ResponseData<null> = {
            status: "error",
            message: (error as Error).message || "Internal server error"
        };
        console.error("Error while fetching all users:", error);
        res.status(500).json(responseData);
    }
};

const postAllUser = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, email, gender, job_title } = req.body;

    if (!first_name || !last_name || !email || !gender || !job_title) {
        res.status(400).json({ status: "error", message: "All fields are required" });
        return;
    }

    try {
        const newUser = new user({ first_name, last_name, email, gender, job_title });
        const savedUser = await newUser.save();
        const responseData: ResponseData<typeof savedUser> = {
            status: "success",
            data: savedUser
        };

        res.status(201).json(responseData);
    } catch (error: unknown) {
        const responseData: ResponseData<null> = {
            status: "error",
            message: (error as Error).message || "Internal server error"
        };
        console.error("Error while posting user:", error);
        res.status(500).json(responseData);
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findById(req.params.id);
        const responseData: ResponseData<typeof userId> = userId
            ? { status: "success", data: userId }
            : { status: "error", message: "User not found" };

        res.status(userId ? 200 : 404).json(responseData);
    } catch (error: unknown) {
        const responseData: ResponseData<null> = {
            status: "error",
            message: (error as Error).message || "Internal server error"
        };
        console.error("Error while fetching user by id:", error);
        res.status(500).json(responseData);
    }
};

const patchUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const responseData: ResponseData<typeof userId> = userId
            ? { status: "success", data: userId }
            : { status: "error", message: "User not found" };

        res.status(userId ? 200 : 404).json(responseData);
    } catch (error: unknown) {
        const responseData: ResponseData<null> = {
            status: "error",
            message: (error as Error).message || "Internal server error"
        };
        console.error("Error while updating user by id:", error);
        res.status(500).json(responseData);
    }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await user.findByIdAndDelete(req.params.id);
        const responseData: ResponseData<null> = userId
            ? { status: "success", message: "User deleted successfully" }
            : { status: "error", message: "User not found" };

        res.status(userId ? 200 : 404).json(responseData);
    } catch (error: unknown) {
        const responseData: ResponseData<null> = {
            status: "error",
            message: (error as Error).message || "Internal server error"
        };
        console.error("Error while deleting user by id:", error);
        res.status(500).json(responseData);
    }
};

export { allUsers, postAllUser, getUserById, patchUserById, deleteUserById };