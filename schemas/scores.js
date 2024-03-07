const z = require('zod');

const scoreSchema = z.object({
    palabras_acertadas: z.number().int().positive(),
    palabras_totales: z.number().int().positive(),
    tiempo_segundos: z.number().int().positive(),
    precision_porcentaje: z.number().positive().min(0).max(100)
});

function validateScore(object) {
    return scoreSchema.safeParse(object);
}

module.exports = {
    validateScore
};