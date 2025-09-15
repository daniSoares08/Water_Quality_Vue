// netlify/functions/data.js
let latest = { ph: 0, temperature: 0, turbidity: 0, oxygen: 0 };

exports.handler = async (event) => {
  // Libera CORS para testes fora da Netlify
  const cors = { 'Access-Control-Allow-Origin': '*' };

  // ── POST: grava valores ────────────────────────────────
  if (event.httpMethod === 'POST') {
    latest = JSON.parse(event.body || '{}');
    return { statusCode: 204, headers: cors }; // 204 = sem corpo
  }

  // ── GET: devolve o último valor gravado ────────────────
  return {
    statusCode: 200,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify(latest),
  };
};
