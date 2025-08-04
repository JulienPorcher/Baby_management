export async function fetchLastEntries() {
  const url = localStorage.getItem("sheetPath");
  if (!url) throw new Error('Sheet path non défini.');

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erreur lors du fetch');

  return response.json();
}
