export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);

    const appScriptUrl = "https://script.google.com/macros/s/AKfycbx_4KgHr4xQvDhbO03P4AHBg1j2Qi9luQG3KWsQ6fpFUuijQc7OWMP2-HwtroGF_9Y2/exec?category=" + encodeURIComponent(data.category);

    const response = await fetch(appScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.text();

    return {
      statusCode: 200,
      body: result,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
