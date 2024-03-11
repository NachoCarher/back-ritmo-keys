import z from 'zod';

const scoreSchema = z.object({
    palabras_acertadas: z.number().int().positive(),
    palabras_totales: z.number().int().positive(),
    tiempo_segundos: z.number().int().positive(),
    precision_porcentaje: z.number().positive().min(0).max(100)
});

export function validateScore(object) {
    return scoreSchema.safeParse(object);
}

export function validatePartialScore(object) {
    return scoreSchema.partial().safeParse(object);
}
