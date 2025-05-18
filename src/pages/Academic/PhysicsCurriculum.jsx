import { useState } from "react";

import AcademicNavbar from "../../components/Academic/AcademicNavbar";
import YearSelector from "../../components/Academic/YearSelector";
import CourseAccordion from "../../components/Academic/CourseAccordion";

import curriculumData from "../../data/curriculum.json";

export default function PhysicsCurriculum() {
  const curriculum = curriculumData.curriculum; // access array inside your JSON
  const years = curriculum.map((y) => y.year); // ["1st Year", "2nd Year", ...]

  const [year, setYear] = useState(years[0]);

  // find the selected year's courses
  const selectedYearData = curriculum.find((y) => y.year === year);
  const courses = selectedYearData ? selectedYearData.courses : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <AcademicNavbar />

      <main className="flex-grow px-4 py-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Physics Curriculum</h1>

        <YearSelector
          years={years}
          selected={year}
          onSelect={setYear}
        />

        <CourseAccordion courses={courses} />
      </main>
    </div>
  );
}