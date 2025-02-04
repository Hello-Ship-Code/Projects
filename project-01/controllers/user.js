import { User } from "../models/user.js";

const handleAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.status(404).json({ status: "error", message: "No users found" });
        }
        return res.status(200).json({ status: "success", data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

const postUser = async (req, res) => {
    const { firstName, lastName, email, gender, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !gender || !jobTitle) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    try {
        const newUser = await User.create({ firstName, lastName, email, gender, jobTitle });
        return res.status(201).json({ status: "success", message: "User created successfully", data: newUser._id });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ status: "error", message: "Failed to create user", error: error.message });
    }
};

const updateUserById = async (req, res, method) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        return res.status(200).json({ message: `User ${method} successfully`, user: updatedUser });
    } catch (error) {
        console.error(`Error ${method} user:`, error);
        return res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

const putUserById = (req, res) => updateUserById(req, res, "updated");

const patchUserById = (req, res) => updateUserById(req, res, "updated");

const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};

export { handleAllUsers, getUserById, postUser, putUserById, patchUserById, deleteUserById };

// const validateUserFields = (req, res, next) => {
//     const { firstName, lastName, email, gender, jobTitle } = req.body;
//     if (!firstName || !lastName || !email || !gender || !jobTitle) {
//         return res.status(400).json({ status: "error", message: "All fields are required" });
//     }
//     next();
// };

// export { validateUserFields };