//const fullUrl = `https://cors-anywhere.herokuapp.com/${url}?category=${encodeURIComponent(data.category)}`
export async function sendToGoogleSheet(data) {
  const sheetPath = localStorage.getItem("sheetPath"); // l’URL Apps Script que l’utilisateur a défini

  const payload = {
    ...data,
    sheetPath,
  };

  const response = await fetch('/.netlify/functions/sendData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur Netlify function: ${text}`);
  }

  return response.text();
}

