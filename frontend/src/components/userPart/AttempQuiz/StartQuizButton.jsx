import React from 'react';

const StartQuizButton = ({ onClick }) => {
  return (
    <button className='createQuestionBtn' onClick={onClick}>
      Show Questions
    </button>
  );
};

export default StartQuizButton;
