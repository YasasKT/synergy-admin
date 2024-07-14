import express from "express";
import * as ClientController from "../controllers/clientController";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

router.get("/", ClientController.getClients);

router.get("/:clientId", ClientController.getClient);

router.post("/", upload.single("imageUrl"), ClientController.createClient);

router.patch(
  "/:clientId",
  upload.single("imageUrl"),
  ClientController.updateClient
);

router.delete("/:clientId", ClientController.deleteClient);

export default router;
