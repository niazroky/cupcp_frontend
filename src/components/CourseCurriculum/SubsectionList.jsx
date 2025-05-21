// Renders each group (e.g. Group A or B) with its list of topics
export default function SubsectionList({ groups }) {
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.name}>
          <h3 className="font-medium underline text-lg">{g.name}</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
            {g.topics
              ? g.topics.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              : g.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
          </ul>
          {g.lectures && (
            <p className="mt-1 text-sm text-gray-400">
              ({g.lectures} Lectures)
            </p>
          )}
        </div>
      ))}
    </div>
  );
}