// src/components/Academic/YearSelector.jsx

export default function YearSelector({ years, selected, onSelect }) {
  return (
    <div className="flex-nowrap overflow-x-auto whitespace-nowrap px-2 mb-6">
      {years.map((y) => (
        <button
          key={y}
          type="button"
          onClick={() => onSelect(y)}
          className={`
            inline-block px-4 py-2 mr-2 rounded-full text-sm font-medium
            focus:outline-none
            ${y === selected
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"}
          `}
        >
          {y}
        </button>
      ))}
    </div>
  );
}