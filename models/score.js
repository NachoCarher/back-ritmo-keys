import { randomUUID } from "crypto";
import { readJSON } from "../utils.js";

const scores = readJSON("./scores.json");

export class ScoreModel {
    static async getAll () {
        return scores;
    }

    static async getById ({ id }) {
        const score = scores.find((score) => score.id_sesion === id);

        return score;
    }

    static async create ({input}) {
        const newScore = {
            id_sesion: randomUUID(),
            ...input,
        };

        scores.push(newScore);

        return newScore;
    }

    static async delete ({ id }) {
        const score = scores.find((score) => score.id_sesion === id);

        if (!score) return false;

        scores.splice(scores.indexOf(score), 1);

        return true;
    }

    static async update ({ id, input }) {
        const score = scores.find((score) => score.id_sesion === id);

        if (!score) return false;

        const updatedScore = {
            ...score,
            ...input
        };

        scores[scores.indexOf(score)] = updatedScore;

        return updatedScore;
    }
}