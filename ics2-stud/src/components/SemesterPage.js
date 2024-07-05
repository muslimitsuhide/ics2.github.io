import React from 'react';
import { useParams } from 'react-router-dom';
import SemesterList from './SemesterList';

function SemesterPage() {
  const { courseNumber, semesterNumber } = useParams();

  return (
    <div className="semester-page">
      <h2>Semester {semesterNumber} for Course {courseNumber}</h2>
      <SemesterList courseNumber={parseInt(courseNumber)} />
    </div>
  );
}

export default SemesterPage;
