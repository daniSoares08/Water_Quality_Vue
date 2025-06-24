// backend/server.js
import fs from 'node:fs/promises';
import express from 'express';
import cors from 'cors';

const app  = express();
const FILE = './backend/history.json';   // agora guarda um ARRAY
const MAX  = 20;                         // qtos pontos você quer manter

app.use(cors());
app.use(express.json());

/* ---------- POST: empilha leitura ---------- */
app.post('/api/measurements', async (req, res) => {
  const { ph, temperature, turbidity, oxygen } = req.body ?? {};
  if ([ph, temperature, turbidity, oxygen].some(v => v === undefined)) {
    return res.status(400).json({ error: 'JSON incompleto' });
  }

  /* lê o arquivo (ou cria lista vazia) */
  let list = [];
  try { list = JSON.parse(await fs.readFile(FILE, 'utf8')); } catch {}

  /* empilha leitura atual com carimbo de data/hora */
  list.push({ ts: Date.now(), ph, temperature, turbidity, oxygen });

  /* mantém só os últimos MAX registros */
  if (list.length > MAX) list = list.slice(-MAX);

  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
  res.sendStatus(204);
});

/* ---------- GET: devolve o histórico ---------- */
app.get('/api/measurements/latest', async (_req, res) => {
  try {
    const json = await fs.readFile(FILE, 'utf8');
    return res.json(JSON.parse(json));   // devolve ARRAY
  } catch {
    return res.json([]);                 // ainda não tem nada
  }
});

app.listen(4000, () => console.log('API em http://localhost:4000'));
