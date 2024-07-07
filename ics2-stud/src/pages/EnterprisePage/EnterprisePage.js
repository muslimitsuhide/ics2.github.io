import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EnterprisePage.css';

function EnterprisePage() {
  const { enterpriseName } = useParams();
  const [enterpriseInfo, setEnterpriseInfo] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchEnterpriseInfo() {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/practice/${enterpriseName}/README.md`);
        if (response.ok) {
          const data = await response.text();
          if (data.trim().length === 0) {
            setEnterpriseInfo('Информация о предприятии пока что отсутствует.');
          } else {
            setEnterpriseInfo(data);
          }
        } else {
          setEnterpriseInfo('Информация о предприятии пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch enterprise information', error);
        setEnterpriseInfo('Ошибка загрузки информации о предприятии.');
      }
    }

    async function fetchFiles() {
      try {
        const response = await fetch(`https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/practice/${enterpriseName}`);
        if (response.ok) {
          const data = await response.json();
          const files = data.filter(item => item.type === 'file' && item.name !== 'README.md');
          setFiles(files);
        } else {
          console.error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Failed to fetch files', error);
      }
    }

    fetchEnterpriseInfo();
    fetchFiles();
  }, [enterpriseName]);

  return (
    <div className="enterprise-page">
      <h2>{enterpriseName}</h2>
      <div className="course-info">
        {enterpriseInfo ? (
          <div>
            <h3>Информация о предприятии:</h3>
            <p>{enterpriseInfo}</p>
          </div>
        ) : (
          <p>Загрузка информации о предприятии...</p>
        )}
      </div>
      <div className='enterprise-files'>
        <h3>Полезные материалы:</h3>
        {files.length > 0 ? (
          <ul>
            {files.map(file => (
              <li key={file.name}>
                <a href={file.download_url} download>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет доступных файлов.</p>
        )}
      </div>
    </div>
  );
}

export default EnterprisePage;
