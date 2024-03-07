const express = require('express');
const scores = require('./scores');
const crypto = require('crypto');

const app = express();

// Middleware para parsear el body de las peticiones
app.use(express.json());

// Deshabilitar la cabecera X-Powered-By para ocultar la tecnología que usamos
app.disable('x-powered-by');

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.get('/scores/:id_sesion', (req, res) => {
    const id = req.params.id_sesion;
    const score = scores.find(score => score.id_sesion === id);

    if (score) return res.json(score);

    res.status(404).send('Score no encontrado');
});

app.post('/scores', (req, res) => {
    const {
        id_sesion,
        palabras_acertadas,
        palabras_totales,
        tiempo_segundos,
        precision_porcentaje
    } = req.body;

    const newScore = {
        id_sesion: crypto.randomUUID(),
        palabras_acertadas,
        palabras_totales,
        tiempo_segundos,
        precision_porcentaje
    };

    scores.push(newScore);

    res.status(201).json(newScore);
});


// Manejar error para rutas no encontradas (404) (a nivel sintáctico es un middleware)
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

app.listen(8080, () => {
    console.log("Server is running on port http://localhost:8080/")
})