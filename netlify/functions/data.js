// Stores the latest sensor values received via POST requests. All values start
// at 0 so that clients requesting the data before any POST has been made
// receive zeros.
let latestData = {
  ph: 0,
  temperature: 0,
  turbidity: 0,
  oxygen: 0,
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
