import express from "express";
import * as ProjectController from "../controllers/projectController";
import upload from "../middleware/uploadMiddleware";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/", ProjectController.getProjects);

router.get("/:projectId", ProjectController.getProject);

router.post(
  "/",
  isAuthenticated,
  upload.single("imageUrl"),
  ProjectController.createProject
);

router.patch(
  "/:projectId",
  isAuthenticated,
  upload.single("imageUrl"),
  ProjectController.updateProject
);

router.delete("/:projectId", isAuthenticated, ProjectController.deleteProject);

export default router;
