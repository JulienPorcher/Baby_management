import { useEffect, useState } from 'react';

export default function useStats(scriptURL) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!scriptURL) return;

    setLoading(true);
    fetch(`${scriptURL}?action=getStats`)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [scriptURL]);

  return { stats, loading, error };
}
