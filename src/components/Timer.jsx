import { useEffect, useState } from 'react';

const dayBasedCategories = ['Bain', 'Pesée']; // ← ajoute ici toutes les catégories à afficher en jours

function getElapsedTime(since, category) {
  const now = new Date();
  const from = new Date(since);
  const diff = now - from;

  if (dayBasedCategories.includes(category)) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} jour${days > 1 ? 's' : ''}`;
  }

  // Pour les autres
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
}

export default function Timer({ lastEntryTime, category}) {
  const [elapsed, setElapsed] = useState(getElapsedTime(lastEntryTime, category));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedTime(lastEntryTime, category));
    }, 60000);
    return () => clearInterval(interval);
  }, [lastEntryTime, category]);

  return <p className="text-sm text-gray-600">⏱ Il y a {elapsed}</p>;
}
