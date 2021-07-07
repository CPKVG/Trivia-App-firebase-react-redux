import React from 'react';
import './styles.scss';
import Record from './../../components/Trivia/Record'


const Dashboard = props => {
  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <Record/>
    </div>
  );
};

export default Dashboard;