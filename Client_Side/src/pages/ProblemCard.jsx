// src/pages/ProblemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ question }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "20px", marginBottom: "10px" }}>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <Link to={`/questions/${question._id}`}>View Details</Link>
    </div>
  );
};

export default ProblemCard;
