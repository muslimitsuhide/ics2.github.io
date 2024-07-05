import React from 'react';
import Subject from './Subject';

function Semester({ semesterNumber }) {
    return (
        <div className="semester">
        <h4>Семестр {semesterNumber}</h4>
        </div>
    );
}

export default Semester;
