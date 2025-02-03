import express from "express";
import { handleAllUsers, getUserById, postUser, putUserById, patchUserById, deleteUserById } from "../controllers/user.js";

const userRoutes = express.Router();

// Define routes
userRoutes.route("/")
  .get(handleAllUsers)
  .post(postUser);

userRoutes.route("/:id")
  .get(getUserById)
  .put(putUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

export { userRoutes };
