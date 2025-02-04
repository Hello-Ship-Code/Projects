import { user } from '../models/user';
import { Request, Response } from 'express';

const allUsers = async (req: Request, res: Response): Promise<void> => {
    try{
    const users = await user.find({});

    if(!users) { res.status(404).json({ status: "error", message: "users not found" }); return;}
    res.status(200).json({ status: "success", data: users });
    return;
    } catch (error){
        console.log("Error while fetching all users", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
        return;
    }
};

const postAllUser = async ( req: Request, res: Response): Promise<void> =>{

    const { first_name, last_name, email, gender, job_title } = req.body;

    if( !first_name || !last_name || !email || !gender || !job_title){
        res.status(400).json({ status: "error", message: "All fields are required" });
        return;
    }
    try{
        const newUser = new user({ first_name, last_name, email, gender, job_title });
        res.status(201).json({ status: "success", data: await newUser.save() });
        return;

    } catch(error) {
        console.log("Error while posting all users", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
        return;
    }
}

const getUserById = async( req: Request, res: Response ): Promise<void> =>{
    try{
        const userId = await user.findById(req.params.id);
        if(!userId) { res.status(404).json({ status: "error", message: "User not found" }); return;}
        res.status(200).json({ status: "success", data: userId });
        return;
    } catch(error)
    {
        console.log("Error while fetching user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
        return;
    }
}

const patchUserById = async( req: Request, res: Response ): Promise<void> =>{
    try{
        const userId = await user.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!userId) { res.status(404).json({ status: "error", message: "User not found" }); return;}
        res.status(200).json({ status: "success", data: userId });
    } catch(error){
        console.log("Error while updating user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });        
        return;
    }
}

const deleteUserById = async( req: Request, res: Response ): Promise<void> =>{
    try{
        const userId = await user.findByIdAndDelete(req.params.id);
        if(!userId) { res.status(404).json({ status: "error", message: "User not found" }); return;}
        res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch(error){
        console.log("Error while updating user by id", error);
        res.status(500).json({ status: "error", message: "Internal server error" });        
        return;
    }
}


export { allUsers , postAllUser, getUserById, patchUserById, deleteUserById };