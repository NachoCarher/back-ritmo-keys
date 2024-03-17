import { ScoreModel } from "../models/score.js";
import { validateScore, validatePartialScore } from "../schemas/scores.js";

export class ScoresController {
  static async getAll(req, res) {
    const scores = await ScoreModel.getAll();
    return res.json(scores);
  }

  static async getById(req, res) {
    const id = req.params.id_sesion;
    const score = await ScoreModel.getById({ id });

    if (score) return res.json(score);

    res.status(404).send("Score not found");
  }

  static async create(req, res) {
    const result = validateScore(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newScore = await ScoreModel.create({ input: result.data });

    res.status(201).json(newScore);
  }

  static async update(req, res) {
    const id = req.params.id_sesion;
    const result = validatePartialScore(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedScore = await ScoreModel.update({ id, input: result.data });

    return res.json(updatedScore);
  }

  static async delete(req, res) {
    const id = req.params.id_sesion;
    const result = await ScoreModel.delete({ id });

    if (!result) return res.status(404).send("Score not found");

    return res.json({ message: "Score deleted" });
  }
}
