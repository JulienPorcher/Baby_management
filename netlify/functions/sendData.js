export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // On récupère l'URL Apps Script depuis les données envoyées
    const sheetPath = data.sheetPath;
    if (!sheetPath) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Paramètre sheetPath manquant' }),
      };
    }

    // On appelle directement ton script Google Sheets
    const response = await fetch(`${sheetPath}?category=${encodeURIComponent(data.category)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
