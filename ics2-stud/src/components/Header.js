import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import SemesterList from './SemesterList'; 

function Header() {
  const [activeCourse, setActiveCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setActiveCourse(index);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setActiveCourse(null);
    setIsOpen(false);
  };

  const handleCourseClick = (courseNumber) => {
    if (activeCourse === courseNumber && isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      navigate(`/course/${courseNumber}`);
      setActiveCourse(courseNumber);
    }
  };

  return (
    <header className="header">
      <h2>Student Information Platform</h2>
      <nav className="nav">
        <ul className="courses">
          {[1, 2, 3, 4, 5, 6].map((courseNumber) => (
            <li
              key={courseNumber}
              onMouseEnter={() => handleMouseEnter(courseNumber)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCourseClick(courseNumber)}
              className={activeCourse === courseNumber ? 'active' : ''}
            >
              {courseNumber} курс
              {activeCourse === courseNumber && isOpen && (
                <SemesterList courseNumber={courseNumber} />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
