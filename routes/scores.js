import { Router } from "express";
import { validateScore, validatePartialScore } from '../schemas/scores.js';
import { ScoreModel } from '../models/score.js';

export const scoresRouter = Router();

scoresRouter.get("/", async (req, res) => {
  const scores = await ScoreModel.getAll();

  return res.json(scores);
});

scoresRouter.get("/:id_sesion", async (req, res) => {
  const id = req.params.id_sesion;
  const score = await ScoreModel.getById({ id });

  if (score) return res.json(score);

  res.status(404).send("Score not found");
});

scoresRouter.post("/", async (req, res) => {
  const result = validateScore(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newScore = await ScoreModel.create({ input: result.data });

  res.status(201).json(newScore);
});

scoresRouter.patch("/:id_sesion", async (req, res) => {
    const id = req.params.id_sesion;
    const result = validatePartialScore(req.body);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedScore = await ScoreModel.update({ id, input: result.data });

    return res.json(updatedScore);
});

scoresRouter.delete("/:id_sesion", async (req, res) => {
  const id = req.params.id_sesion;
  const result = await ScoreModel.delete({ id });

  if (!result) return res.status(404).send("Score not found");
  
  return res.json({ message: "Score deleted" });
});
