import React, { useEffect, useState } from 'react';
import './IntroductoryPracticePage.css';

function IntroductoryPracticePage() {
  const [introductoryPracticeInfo, setIntroductoryPracticeInfo] = useState(null);
  const [usefulFiles, setUsefulFiles] = useState([]);
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    async function fetchIntroductoryPracticeInfo() {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/introductory_practice/README.md`);
        if (response.ok) {
          const data = await response.text();
          if (data.trim().length === 0) {
            setIntroductoryPracticeInfo('Информация о ознакомительной практике пока что отсутствует.');
          } else {
            setIntroductoryPracticeInfo(data);
          }
        } else {
          setIntroductoryPracticeInfo('Информация о ознакомительной практике пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch introductory practice information', error);
        setIntroductoryPracticeInfo('Ошибка загрузки информации о ознакомительной практике.');
      } finally {
        setInfoLoading(false);
      }
    }

    async function fetchUsefulFiles() {
      try {
        const response = await fetch('https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/introductory_practice');
        if (response.ok) {
          const data = await response.json();
          const files = data.filter(item => item.type === 'file' && item.name !== 'README.md'); // Исключаем README.md из списка файлов
          setUsefulFiles(files.map(file => file.name));
        } else {
          console.error('Failed to fetch useful files');
        }
      } catch (error) {
        console.error('Failed to fetch useful files', error);
      }
    }

    fetchIntroductoryPracticeInfo();
    fetchUsefulFiles();
  }, []);

  return (
    <div className="introductory-practice-page">
      <h2>Ознакомительная практика</h2>
      <div className="course-info">
        {infoLoading ? (
          <p>Загрузка информации о ознакомительной практике...</p>
        ) : introductoryPracticeInfo ? (
          <div>
            <h3>Информация об ознакомительной практике:</h3>
            <p>{introductoryPracticeInfo}</p>
          </div>
        ) : (
          <p>Информация об ознакомительной практике пока что отсутствует.</p>
        )}
      </div>
      <div className="enterprise-files">
        <h3>Полезные материалы:</h3>
        <ul>
          {usefulFiles.map(file => (
            <li key={file}>
              <a href={`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/introductory_practice/${file}`} download>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IntroductoryPracticePage;
