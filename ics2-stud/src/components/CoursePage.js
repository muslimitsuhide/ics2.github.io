import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams } from 'react-router-dom';
import Semester from './Semester';

function CoursePage() {
  const { courseNumber } = useParams();
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

  return (
    <div className="course-page">
        <h2>{courseNumber} курс</h2> 
        <div className="course-info">
            {courseInfo ? (
            <h3>{courseInfo}</h3>
            ) : (
            <p>Загрузка информации о курсе...</p>
            )}
        </div>
      <h3>Выберите семестр:</h3>
      <div className='course-semester-list'>
        <ul>
            <li><Semester courseNumber={courseNumber} semesterNumber={1} /></li>
            <li><Semester courseNumber={courseNumber} semesterNumber={2} /></li>
        </ul>
      </div>
    </div>
  );
}

export default CoursePage;
