import React from 'react';
import './SemesterList.css';
import Semester from './Semester';
import { useNavigate } from 'react-router-dom';

function SemesterList({ courseNumber }) {
  const navigate = useNavigate();

  const calculateSemesterNumbers = (courseNumber) => {
    const startSemester = (courseNumber - 1) * 2 + 1;
    return [startSemester, startSemester + 1];
  };

  const handleSemesterClick = (semesterNumber) => {
    navigate(`/course/${courseNumber}/semester/${semesterNumber}`);
  };

  const [semester1, semester2] = calculateSemesterNumbers(courseNumber);

  return (
    <div className="semester-list"> 
      <h3>Выберите семестр:</h3>
      <ul>
        <li onClick={() => handleSemesterClick(semester1)}>
          <Semester courseNumber={courseNumber} semesterNumber={semester1} />
        </li>
        <li onClick={() => handleSemesterClick(semester2)}>
          <Semester courseNumber={courseNumber} semesterNumber={semester2} />
        </li>
      </ul>
    </div>
  );
}

export default SemesterList;
