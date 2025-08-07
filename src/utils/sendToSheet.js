//const fullUrl = `https://cors-anywhere.herokuapp.com/${url}?category=${encodeURIComponent(data.category)}`
export async function sendToGoogleSheet(data) {
  const response = await fetch('/.netlify/functions/sendData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur côté fonction : ${text}`);
  }

  return response.text();
}
