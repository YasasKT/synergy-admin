import express from "express";
import * as ClientController from "../controllers/clientController";
import upload from "../middleware/uploadMiddleware";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/", ClientController.getClients);

router.get("/:clientId", ClientController.getClient);

router.post(
  "/",
  isAuthenticated,
  upload.single("imageUrl"),
  ClientController.createClient
);

router.patch(
  "/:clientId",
  isAuthenticated,
  upload.single("imageUrl"),
  ClientController.updateClient
);

router.delete("/:clientId", isAuthenticated, ClientController.deleteClient);

export default router;
