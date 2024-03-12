import { Router } from "express";
import { readJSON } from "./utils.js";
import { randomUUID } from "crypto";
import { validateScore, validatePartialScore } from './schemas/scores.js';

const scores = readJSON("./scores.json");
export const scoresRouter = Router();

scoresRouter.get("/", (req, res) => {
  res.json(scores);
});

scoresRouter.get("/:id_sesion", (req, res) => {
  const id = req.params.id_sesion;
  const score = scores.find((score) => score.id_sesion === id);

  if (score) return res.json(score);

  res.status(404).send("Score not found");
});

scoresRouter.post("/", (req, res) => {
  const result = validateScore(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newScore = {
    id_sesion: randomUUID(),
    ...result.data,
  };

  scores.push(newScore);
  res.status(201).json(newScore);
});

scoresRouter.patch("/:id_sesion", (req, res) => {
    const id = req.params.id_sesion;
    const score = scores.find(score => score.id_sesion === id);

    if (!score) return res.status(404).send('Score not  found');

    const result = validatePartialScore(req.body);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedScore = {
        ...score,
        ...result.data
    };

    scores[scores.indexOf(score)] = updatedScore;
    return res.json(updatedScore);
});
