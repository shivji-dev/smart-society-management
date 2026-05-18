function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h1
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h1>

    </div>
  );
}

export default StatsCard;