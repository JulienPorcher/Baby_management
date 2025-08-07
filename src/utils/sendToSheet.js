export async function sendToGoogleSheet(data) {
  
  const url = localStorage.getItem("sheetPath");
  if (!url) throw new Error('Sheet URL non défini');
  //const fullUrl = `https://cors-anywhere.herokuapp.com/${url}?category=${encodeURIComponent(data.category)}`
  const params = new URLSearchParams();

  params.append("category", data.category);
  params.append("date", data.date || new Date().toISOString());
  if (data.type) params.append("type", data.type);
  if (data.amount) params.append("amount", data.amount);
  if (data.volume) params.append("volume", data.volume);
  if (data.poids) params.append("poids", data.poids);
  if (data.comments) params.append("comments", data.comments);

  const fullUrl = `${baseUrl}?${params.toString()}`;

  const response = await fetch(fullUrl); // GET request

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur Google Sheet (GET): ${text}`);
  }

  return response.text();
}
