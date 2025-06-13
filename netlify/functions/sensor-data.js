let sensorData = {
  temperature: Array(24).fill(25),
  ph: Array(24).fill(7),
  turbidity: Array(24).fill(3),
  oxygen: Array(24).fill(6),
};

exports.handler = async function(event) {
  if (event.httpMethod === 'POST') {
    try {
      const incoming = JSON.parse(event.body || '{}');
      sensorData = {
        temperature: incoming.temperature || sensorData.temperature,
        ph: incoming.ph || sensorData.ph,
        turbidity: incoming.turbidity || sensorData.turbidity,
        oxygen: incoming.oxygen || sensorData.oxygen,
      };
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };
    } catch (err) {
      return { statusCode: 400, body: 'Invalid JSON' };
    }
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData),
    };
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
