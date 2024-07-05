import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams, useNavigate } from 'react-router-dom';
import Semester from './Semester';

function CoursePage() {
  const { courseNumber } = useParams();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    async function fetchCourseInfo() {
      try {
        const readmeResponse = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/${courseNumber}_course/README.md`);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.text();
          setCourseInfo(readmeData);
        } else {
          setCourseInfo('Информация об этом курсе пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch course information', error);
        setCourseInfo('Ошибка загрузки информации о курсе.');
      }
    }

    fetchCourseInfo();
  }, [courseNumber]);

  const calculateSemesterNumbers = (courseNumber) => {
    const startSemester = (parseInt(courseNumber) - 1) * 2 + 1;
    return [startSemester, startSemester + 1];
  };

  const [semester1, semester2] = calculateSemesterNumbers(courseNumber);

  const handleSemesterClick = (semesterNumber) => {
    navigate(`/course/${courseNumber}/semester/${semesterNumber}`);
  };

  return (
    <div className="course-page">
      <h2>{courseNumber} курс</h2> 
      <div className="course-info">
        {courseInfo ? (
          <div>
            <h3>Информация о курсе:</h3>
            <p>{courseInfo}</p>
          </div>
        ) : (
          <p>Загрузка информации о курсе...</p>
        )}
      </div>
      <h3>Выберите семестр:</h3>
      <div className='course-semester-list'>
        <ul>
          <li onClick={() => handleSemesterClick(semester1)}><Semester courseNumber={courseNumber} semesterNumber={semester1} /></li>
          <li onClick={() => handleSemesterClick(semester2)}><Semester courseNumber={courseNumber} semesterNumber={semester2} /></li>
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
