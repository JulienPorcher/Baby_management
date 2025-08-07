exports.handler = async function(event, context) {
  // Définir l'origine autorisée
  const allowedOrigin = 'https://roaring-cassata-42a61c.netlify.app/'; // Remplacez par l'origine de votre application front-end

  // Configurer les en-têtes CORS
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Gérer les requêtes OPTIONS pour le preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Gérer les requêtes POST
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    // Traiter les données ici

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Données reçues avec succès', data }),
    };
  }

  // Retourner une erreur si la méthode HTTP n'est pas autorisée
  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Méthode non autorisée' }),
  };
};
