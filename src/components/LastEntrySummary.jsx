export default function LastEntrySummary({ category, entry }) {
  if (!entry) return null;

  const time = new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (category === 'Repas') {
    return (
      <p className="text-sm text-gray-800 mb-1">
        🍼 <strong>Dernier :</strong> {entry.type}, {entry.amount} ml, {time}
      </p>
    );
  }

  if (category === 'Couche') {
    return (
      <p className="text-sm text-gray-800 mb-1">
        💩 <strong>Dernier :</strong> {entry.type}, {entry.consistency}, {time}
      </p>
    );
  }

  return null;
}
