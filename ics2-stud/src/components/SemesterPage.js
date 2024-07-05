import React from 'react';
import { useParams } from 'react-router-dom';

function SemesterPage() {
  const { courseNumber, semesterNumber } = useParams();

  return (
    <div className="semester-page">
      <h2>{semesterNumber} семестр ({courseNumber} курс)</h2>
    </div>
  );
}

export default SemesterPage;
