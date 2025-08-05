import { useState } from 'react';

export default function StatsRow({ stats }) {
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  const toggleDescription = (key) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {stats.map((stat, index) => {
        const key = `${stat.stat}-${index}`;
        const isDescriptionShown = visibleDescriptions[key];

        return (
          <div
            key={key}
            onClick={() => toggleDescription(key)}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-lg shadow transition"
          >
            {isDescriptionShown ? stat.description : `${stat.stat} : ${stat.valeur}`}
          </div>
        );
      })}
    </div>
  );
}
