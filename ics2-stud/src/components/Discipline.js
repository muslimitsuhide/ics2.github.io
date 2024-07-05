import React from 'react';

function Discipline({ disciplineName }) {
  return (
    <div className="discipline">
      <button className="discipline-button">{disciplineName}</button>
    </div>
  );
}

export default Discipline;
