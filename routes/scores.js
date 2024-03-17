import { Router } from "express";
import { ScoresController } from "../controllers/scores.js";

export const scoresRouter = Router();

scoresRouter.get("/", ScoresController.getAll);
scoresRouter.get("/:id_sesion", ScoresController.getById);
scoresRouter.post("/", ScoresController.create);
scoresRouter.patch("/:id_sesion", ScoresController.update);
scoresRouter.delete("/:id_sesion", ScoresController.delete);
