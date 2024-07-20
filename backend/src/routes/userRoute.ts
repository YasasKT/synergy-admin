import express from "express";
import * as UserController from "../controllers/userController";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.get("/admins", UserController.getAllUsers);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.patch("/edit", UserController.updateUser);

router.delete("/delete", UserController.deleteUser);

export default router;
