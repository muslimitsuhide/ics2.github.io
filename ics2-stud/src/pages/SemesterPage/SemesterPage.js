import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SemesterPage.css';
import Discipline from '../../components/Discipline/Discipline';

function SemesterPage() {
  const { courseNumber, semesterNumber } = useParams();
  const navigate = useNavigate();
  const [semesterInfo, setSemesterInfo] = useState(null);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    async function fetchSemesterInfo() {
      try {
        const response = await fetch(`https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/${courseNumber}_course/${semesterNumber}_semester`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const disciplineNames = data.filter(item => item.type === 'dir').map(item => item.name);
          const disciplineLinks = disciplineNames.map(name =>
            `https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/${courseNumber}_course/${semesterNumber}_semester/${name}/file.pdf`
          );
          setDisciplines(disciplineNames.map((name, index) => ({ name, link: disciplineLinks[index] })));
          await fetchSemesterReadme();
        } else {
          setSemesterInfo('Информация о семестре пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch semester information', error);
        setSemesterInfo('Ошибка загрузки информации о семестре.');
      }
    }

    async function fetchSemesterReadme() {
      try {
        const readmeResponse = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/${courseNumber}_course/${semesterNumber}_semester/README.md`);
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.text();
          setSemesterInfo(readmeData);
        } else {
          setSemesterInfo('Информация о семестре пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch semester README', error);
        setSemesterInfo('Ошибка загрузки информации о семестре.');
      }
    }

    fetchSemesterInfo();
  }, [courseNumber, semesterNumber]);

  const handleDisciplineClick = (discipline) => {
    navigate(`/course/${courseNumber}/semester/${semesterNumber}/${discipline}`);
  };

  return (
    <div className="semester-page">
      <h2>{semesterNumber} семестр ({courseNumber} курс)</h2>
      <div className="course-info">
        {semesterInfo ? (
          <div>
            <h3>Информация о семестре:</h3>
            <p>{semesterInfo}</p>
          </div>
        ) : (
          <p>Загрузка информации о семестре...</p>
        )}
      </div>
      <h3>Выберите дисциплину:</h3>
      <div className='semester-discipline-list'>
        <ul>
          {disciplines.map((discipline, index) => (
            <li key={index} onClick={() => handleDisciplineClick(discipline.name)}>
              <Discipline disciplineName={discipline.name} downloadLink={discipline.link} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SemesterPage;
