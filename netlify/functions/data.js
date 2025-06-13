let latestData = {
  ph: 7.2,
  temperature: 25.5,
  turbidity: 3.1,
  oxygen: 5.8,
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body || '{}');
      latestData = { ...latestData, ...data };
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: latestData }),
      };
    } catch (err) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON' }),
      };
    }
  }

  // Default GET
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(latestData),
  };
};
