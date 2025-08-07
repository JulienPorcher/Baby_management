// netlify/functions/proxy.js

export async function handler(event) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL; // à configurer

  const method = event.httpMethod;
  const category = event.queryStringParameters.category || '';
  const url = `${scriptUrl}?category=${encodeURIComponent(category)}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? event.body : undefined,
    });

    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      },
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
