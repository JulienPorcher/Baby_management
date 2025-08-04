import { useEffect, useState } from 'react';

function getElapsedTime(since) {
  const now = new Date();
  const diff = now - new Date(since);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
}

export default function Timer({ lastEntryTime }) {
  const [elapsed, setElapsed] = useState(getElapsedTime(lastEntryTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedTime(lastEntryTime));
    }, 60000);
    return () => clearInterval(interval);
  }, [lastEntryTime]);

  return <p className="text-sm text-gray-600">⏱ Dernier : il y a {elapsed}</p>;
}
