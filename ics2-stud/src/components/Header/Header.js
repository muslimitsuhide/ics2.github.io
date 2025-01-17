import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleCourseClick = (courseNumber) => {
    navigate(`/course/${courseNumber}`);
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <div className="name">
        <span>OND ICS Platform</span>
      </div>
      <nav className="nav">
        <ul className="nav-buttons">
          <li onClick={() => handleNavClick('/')}>Главная</li>
        </ul>
        <ul className="courses">
          {[1, 2, 3, 4, 5, 6].map((courseNumber) => (
            <li
              key={courseNumber}
              onClick={() => handleCourseClick(courseNumber)}
            >
              {courseNumber} курс
            </li>
          ))}
        </ul>
        <ul className="nav-buttons">
          <li onClick={() => handleNavClick('/practice')}>Практика</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
