import React from 'react';
import './About.css';
import trackerImg from '../../assets/finacne.png'; // Replace with your image
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>About Financely</h1>
          <p>
            Financely is your personal finance tracker designed to help you manage
            your expenses, track your income, and achieve your financial goals.
            With a simple and intuitive interface, you can easily add, edit, and
            monitor your transactions in real-time.
          </p>
          <p>
            Stay on top of your budget, visualize your spending patterns, and make
            informed financial decisions. Financely is perfect for anyone looking
            to take control of their finances.
          </p>
          <p className="back-dashboard" onClick={goToDashboard}>
            &larr; Back to Dashboard
          </p>
        </div>
        <div className="about-image">
          <img src={trackerImg} alt="Finance Tracker Illustration" />
        </div>
      </div>
    </div>
  );
};

export default About;
