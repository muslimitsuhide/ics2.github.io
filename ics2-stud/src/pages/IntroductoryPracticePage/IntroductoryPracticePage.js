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
            setIntroductoryPracticeInfo('Информация об ознакомительной практике пока что отсутствует.');
          } else {
            setIntroductoryPracticeInfo(data);
          }
        } else {
          setIntroductoryPracticeInfo('Информация об ознакомительной практике пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch introductory practice information', error);
        setIntroductoryPracticeInfo('Ошибка загрузки информации об ознакомительной практике.');
      } finally {
        setInfoLoading(false);
      }
    }

    async function fetchUsefulFiles() {
      try {
        const response = await fetch('https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/introductory_practice');
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

    fetchIntroductoryPracticeInfo();
    fetchUsefulFiles();
  }, []);

  return (
    <div className="introductory-practice-page">
      <h2>Ознакомительная практика</h2>
      <div className="course-info">
        {infoLoading ? (
          <p>Загрузка информации об ознакомительной практике...</p>
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

export default IntroductoryPracticePage;
