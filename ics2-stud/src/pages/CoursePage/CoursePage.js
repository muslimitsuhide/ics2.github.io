import React, { useEffect, useState } from 'react';
import './CoursePage.css';
import { useParams, useNavigate } from 'react-router-dom';
import Semester from '../../components/Semester/Semester';

function CoursePage() {
  const { courseNumber } = useParams();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState(null);
  const [coursePlanUrls, setCoursePlanUrls] = useState([]);

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

    async function fetchCoursePlans() {
      try {
        const coursePlansResponse = await fetch(`https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/${courseNumber}_course`);
        if (coursePlansResponse.ok) {
          const coursePlansData = await coursePlansResponse.json();
          const planUrls = coursePlansData
            .filter(file => file.name.startsWith('plan'))
            .map(file => file.download_url);
          setCoursePlanUrls(planUrls);
        } else {
          console.error('Failed to fetch course plans', coursePlansResponse.status);
          setCoursePlanUrls([]);
        }
      } catch (error) {
        console.error('Failed to fetch course plans', error);
        setCoursePlanUrls([]);
      }
    }

    fetchCourseInfo();
    fetchCoursePlans();
  }, [courseNumber]);

  const calculateSemesterNumbers = (courseNumber) => {
    const startSemester = (parseInt(courseNumber) - 1) * 2 + 1;
    return [startSemester, startSemester + 1];
  };

  const [semester1, semester2] = calculateSemesterNumbers(courseNumber);

  const handleSemesterClick = (semesterNumber) => {
    navigate(`/course/${courseNumber}/semester/${semesterNumber}`);
  };

  const handlePlanDownload = (planUrl) => {
    window.open(planUrl, '_blank');
  };

  const getPlanButtonLabel = (index) => {
    if (parseInt(courseNumber) <= 2) {
      return `Скачать общий учебный план`;
    } else {
      return `Скачать учебный план группы №${index + 1}`;
    }
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
      <h3>Учебный план:</h3>
      <div className='course-plan'>
        {coursePlanUrls.length > 0 ? (
          <ul>
            {coursePlanUrls.map((planUrl, index) => (
              <li key={index}>
                <button onClick={() => handlePlanDownload(planUrl)}>
                  <h4>{getPlanButtonLabel(index)}</h4>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Учебного плана пока что нет.</p>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
