export default function StatsRow({ stats }) {
  return (
    <div className="mt-2 text-sm text-gray-700 flex gap-4">
      {stats.map((item, idx) => (
        <span key={idx} className="bg-gray-100 px-2 py-1 rounded-lg">
          {item}
        </span>
      ))}
    </div>
  );
}
