// Renders a numbered list of books
export default function RecommendedBooks({ books }) {
  return (
    <div>
      <h4 className="font-semibold mt-4">Books Recommended</h4>
      <ul className="list-decimal list-inside text-gray-300 space-y-1 mt-2">
        {books.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
