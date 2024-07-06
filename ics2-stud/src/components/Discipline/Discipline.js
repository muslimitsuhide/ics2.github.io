import React from 'react';
import  './Discipline.css'

function Discipline({ disciplineName }) {
  return (
    <div className="discipline">
      <button className="discipline-button">{disciplineName}</button>
    </div>
  );
}

export default Discipline;
