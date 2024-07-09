import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CoursePage from './pages/CoursePage/CoursePage';
import SemesterPage from './pages/SemesterPage/SemesterPage';
import HomePage from './pages/HomePage/HomePage';
import PracticePage from './pages/PracticePage/PracticePage';
import EnterprisePage from './pages/EnterprisePage/EnterprisePage';
import IntroductoryPracticePage from './pages/IntroductoryPracticePage/IntroductoryPracticePage';
import DisciplinePage from './pages/DisciplinePage/DisciplinePage';
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
            <Route path="/" element={<HomePage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/introductory" element={<IntroductoryPracticePage />} />
            <Route path="/practice/:enterpriseName" element={<EnterprisePage />} />
            <Route path="/course/:courseNumber" element={<CoursePage />} />
            <Route path="/course/:courseNumber/semester/:semesterNumber" element={<SemesterPage />} />
            <Route path="/course/:courseNumber/semester/:semesterNumber/:disciplineName" element={<DisciplinePage />} />
          </Routes>
        </main>
        <footer>
            <p>
                Все персонажи, термины и события - вымышлены. <br />
                Любое совпадение - случайно. <br />
                Нашли баг? <a className="link" href="https://vk.com/ond1team">Пишите!</a>
            </p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
