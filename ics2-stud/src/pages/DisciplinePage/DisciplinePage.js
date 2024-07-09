import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DisciplinePage.css';

function DisciplinePage() {
  const { courseNumber, semesterNumber, disciplineName } = useParams();
  const [disciplineInfo, setDisciplineInfo] = useState(null);
  const [usefulFiles, setUsefulFiles] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    async function fetchDisciplineInfo() {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/${courseNumber}_course/${semesterNumber}_semester/${disciplineName}/README.md`);
        if (response.ok) {
          const data = await response.text();
          if (data.trim().length === 0) {
            setDisciplineInfo('Информация о дисциплине пока что отсутствует.');
          } else {
            setDisciplineInfo(data);
          }
        } else {
          setDisciplineInfo('Информация о дисциплине пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch discipline information', error);
        setDisciplineInfo('Ошибка загрузки информации о дисциплине.');
      } finally {
        setInfoLoading(false);
      }
    }

    async function fetchUsefulFiles() {
      try {
        const response = await fetch(`https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/${courseNumber}_course/${semesterNumber}_semester/${disciplineName}`);
        if (response.ok) {
          const data = await response.json();
          const files = data.filter(item => item.type === 'file' && item.name !== 'README.md');
          setUsefulFiles(files);
        } else {
          console.error('Failed to fetch useful files');
        }
      } catch (error) {
        console.error('Failed to fetch useful files', error);
      }
    }

    fetchDisciplineInfo();
    fetchUsefulFiles();
  }, [courseNumber, semesterNumber, disciplineName]);

  return (
    <div className="discipline-page">
      <h2>{disciplineName}</h2>
      <div className="course-info">
        {infoLoading ? (
          <p>Загрузка информации о дисциплине...</p>
        ) : disciplineInfo ? (
          <div>
            <h3>Информация о дисциплине:</h3>
            <p>{disciplineInfo}</p>
          </div>
        ) : (
          <p>Информация о дисциплине пока что отсутствует.</p>
        )}
      </div>
      <div className="useful-files">
        <h3>Полезные материалы:</h3>
        {usefulFiles.length > 0 ? (
          <ul>
            {usefulFiles.map(file => (
              <a key={file.name} href={file.download_url} download>
                <li>
                  {file.name}
                </li>
              </a>
            ))}
          </ul>
        ) : (
          <p>Нет доступных файлов.</p>
        )}
      </div>
    </div>
  );
}

export default DisciplinePage;
