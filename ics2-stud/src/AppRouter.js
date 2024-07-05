import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CoursePage from './components/CoursePage';
import SemesterPage from './components/SemesterPage';
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
            <Route path="/course/:courseNumber/semester/:semesterNumber" element={<SemesterPage />} />
            <Route path="/course/:courseNumber" element={<CoursePage />} />
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
