import React, { useEffect, useState } from 'react';
import './PracticePage.css';
import { useNavigate } from 'react-router-dom';

function PracticePage() {
  const navigate = useNavigate();
  const [practiceInfo, setPracticeInfo] = useState(null);
  const [enterprises, setEnterprises] = useState([]);

  useEffect(() => {
    async function fetchPracticeInfo() {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/muslimitsuhide/ics2_bmstu/main/practice/README.md`);
        if (response.ok) {
          const data = await response.text();
          setPracticeInfo(data);
        } else {
          setPracticeInfo('Информация о практике пока что отсутствует.');
        }
      } catch (error) {
        console.error('Failed to fetch practice information', error);
        setPracticeInfo('Ошибка загрузки информации о практике.');
      }
    }

    async function fetchEnterprises() {
      try {
        const response = await fetch('https://api.github.com/repos/muslimitsuhide/ics2_bmstu/contents/practice');
        if (response.ok) {
          const data = await response.json();
          const folders = data.filter(item => item.type === 'dir');
          setEnterprises(folders.map(folder => folder.name));
        } else {
          console.error('Failed to fetch enterprises');
        }
      } catch (error) {
        console.error('Failed to fetch enterprises', error);
      }
    }

    fetchPracticeInfo();
    fetchEnterprises();
  }, []);

  const handleEnterpriseClick = (enterpriseName) => {
    navigate(`/practice/${enterpriseName}`);
  };

  const handleIntroductoryPracticeClick = () => {
    navigate(`/practice/introductory`);
  };

  return (
    <div className="practice-page">
      <h2>Практика</h2>
      <div className="course-info">
        {practiceInfo ? (
          <div>
            <h3>Информация о практике:</h3>
            <p>{practiceInfo}</p>
          </div>
        ) : (
          <p>Загрузка информации о практике...</p>
        )}
      </div>
      <div className='enterprise-list'>
        <ul>
          <li onClick={handleIntroductoryPracticeClick}>Ознакомительная практика</li>
        </ul>
      </div>
      <h3>Выберите предприятие:</h3>
      <div className='enterprise-list'>
        <ul>
          {enterprises.map(enterprise => (
            <li key={enterprise} onClick={() => handleEnterpriseClick(enterprise)}>{enterprise}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PracticePage;
