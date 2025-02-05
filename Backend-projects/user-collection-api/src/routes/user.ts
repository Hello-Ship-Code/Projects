import express from "express";
import { allUsers, postAllUser, getUserById, patchUserById, deleteUserById } from "../controllers/user";

const useRouter = express.Router();

useRouter.route("/").get(allUsers).post(postAllUser);

useRouter.route("/:id").get(getUserById).patch(patchUserById).delete(deleteUserById);


export { useRouter };