const express = require('express');
const scores = require('./scores');
const crypto = require('crypto');
const cors = require('cors');
const z = require('zod');
const { validateScore, validatePartialScore } = require('./schemas/scores');

const app = express();

// Middleware para parsear el body de las peticiones
app.use(express.json());
app.use(cors());

// Deshabilitar la cabecera X-Powered-By para ocultar la tecnología que usamos
app.disable('x-powered-by');

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.get('/scores/:id_sesion', (req, res) => {
    const id = req.params.id_sesion;
    const score = scores.find(score => score.id_sesion === id);

    if (score) return res.json(score);

    res.status(404).send('Score not found');
});

app.post('/scores', (req, res) => {
    const result = validateScore(req.body);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newScore = {
        id_sesion: crypto.randomUUID(),
        ...result.data
    };

    scores.push(newScore);
    res.status(201).json(newScore);
});

app.patch('/scores/:id_sesion', (req, res) => {
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

// Manejar error para rutas no encontradas (404) (a nivel sintáctico es un middleware)
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})