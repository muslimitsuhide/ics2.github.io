import React from 'react';
import Semester from '../Semester/Semester';

function Course({ courseNumber }) {
  return (
    <div className="course">
      <Semester startSemester={2 * (courseNumber - 1) + 1} />
      <Semester startSemester={2 * (courseNumber - 1) + 2} />
    </div>
  );
}

export default Course;
