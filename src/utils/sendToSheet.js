export async function sendToGoogleSheet(data) {
  
  const url = localStorage.getItem("sheetPath");
  if (!url) throw new Error('Sheet URL non défini');
  //const fullUrl = `https://cors-anywhere.herokuapp.com/${url}?category=${encodeURIComponent(data.category)}`
  const payload = JSON.stringify(data);

  const fullUrl = `${url}?category=${encodeURIComponent(data.category)}`;

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur Google Sheet: ${text}`);
  }

  return response.text();
}
