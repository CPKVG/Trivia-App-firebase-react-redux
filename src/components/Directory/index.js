import React from 'react';
// import { Link } from 'react-router-dom';
import './styles.scss';
import Trivia from './../Trivia'

const Directory = props => {
  return (
    <div className="directory">
        <p>HOMEPAGE</p>
        <Trivia/>
    </div>
  );    
};

export default Directory;