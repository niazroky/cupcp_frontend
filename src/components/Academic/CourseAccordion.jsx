import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

export default function CourseAccordion({ courses }) {
  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <CoursePanel key={course.code} course={course} />
      ))}
    </div>
  );
}

function CoursePanel({ course }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
      >
        <span className="font-semibold text-xl">
          {course.code}: {course.title}
        </span>
        {open ? <ChevronDown className="w-6 h-6 text-gray-200" /> : <ChevronRight className="w-6 h-6 text-gray-200" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-8">
          {course.groups?.map((g, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <h3 className="text-lg font-medium text-blue-300">{g.name}</h3>
                {g.lectures && (
                  <span className="text-sm text-gray-400">{g.lectures} Lectures</span>
                )}
              </div>
              <ol className="list-decimal list-outside pl-8 text-gray-200 space-y-2 mt-2 marker:mr-2 marker:text-gray-400 marker:font-bold">
                {(g.topics || g.items).map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {course.description && (
            <p className="text-gray-300 italic px-6 pr-6 leading-relaxed">{course.description}</p>
          )}

          {course.recommendedBooks && (
            <div className="pt-4 border-t border-gray-700 px-6 pr-6">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">Books Recommended</h4>
              </div>
              <ol className="list-decimal list-outside pl-8 text-gray-200 space-y-1 marker:mr-2 marker:text-gray-400">
                {course.recommendedBooks.map((book, i) => (
                  <li key={i} className="leading-snug">
                    {book}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
