import Timer from './Timer';
import StatsRow from './StatsRow';
import LastEntrySummary from './LastEntrySummary';


export default function CategoryCard({ title, onAddClick, lastEntryTime, lastEntry, stats }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onAddClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
        >
          ➕ Ajouter
        </button>
      </div>
      <LastEntrySummary category={title} entry={lastEntry} />
      <Timer lastEntryTime={lastEntryTime} />
      <StatsRow stats={stats} />
    </div>
  );
}
