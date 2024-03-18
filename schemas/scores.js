import z from "zod";

const scoreSchema = z.object({
    palabras_acertadas: z.number().int().min(0),
    palabras_totales: z.number().int().positive(),
    tiempo_segundos: z.number().positive(),
    precision_porcentaje: z.number().min(0).max(100),
});

export function validateScore(object) {
    return scoreSchema.safeParse(object);
}

export function validatePartialScore(object) {
    return scoreSchema.partial().safeParse(object);
}
