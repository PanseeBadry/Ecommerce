import  express  from "express";
import { addUser, changePassword, deleteUser, getAllUsers, getUserById, updateUser } from "./controller/user.controller.js";

export const userRoutes = express.Router()


userRoutes.route("/")
.post(addUser)
.get(getAllUsers)


userRoutes.route("/:id")
.get(getUserById)
.patch(updateUser)
.delete(deleteUser)

userRoutes.route("/changePassword/:id").put(changePassword)




