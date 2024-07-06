import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CoursePage from './pages/CoursePage/CoursePage';
import SemesterPage from './pages/SemesterPage/SemesterPage';
import HomePage from './pages/HomePage/HomePage';
import PracticePage from './pages/PracticePage/PracticePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
          <Route path="/ics2.github.io" element={<HomePage />} />
            <Route path="/ics2.github.io/practice" element={<PracticePage />} />
            <Route path="/ics2.github.io/course/:courseNumber/semester/:semesterNumber" element={<SemesterPage />} />
            <Route path="/ics2.github.io/course/:courseNumber" element={<CoursePage />} />
          </Routes>
        </main>
        <footer>
          <p>@muslimitsuhide</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
