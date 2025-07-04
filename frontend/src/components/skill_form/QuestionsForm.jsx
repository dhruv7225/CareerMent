import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const preSavedQuestions = {
  React: ['What is JSX?', 'Explain React hooks.', 'What is virtual DOM?'],
  'Node.js': ['What is event loop in Node?', 'Explain middleware.', 'What is npm?'],
  CSS: ['What is flexbox?', 'Explain grid layout.', 'What are pseudo-classes?'],
  JavaScript: ['What are closures?', 'Explain promises.', 'What is hoisting?'],
  MongoDB: ['What is NoSQL?', 'Explain collections.', 'What is aggregation in MongoDB?'],
  Express: ['What is Express middleware?', 'Explain routing in Express.', 'What is CORS?'],
};

const QuestionsForm = () => {
  const location = useLocation();
  const { selectedSkills } = location.state || { selectedSkills: [] };
  const [answers, setAnswers] = useState({});
const navigate = useNavigate();
  const handleChange = (skill, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [skill]: {
        ...prev[skill],
        [question]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    navigate('/home/me')
    alert('Your answers have been submitted.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Answer Questions</h1>
      <form onSubmit={handleSubmit}>
        {selectedSkills.map((skill) => (
          <div key={skill} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{skill}</h2>
            {preSavedQuestions[skill].map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-1">{question}</label>
                <textarea
                  className="w-full border p-2 rounded"
                  rows="3"
                  required
                  onChange={(e) => handleChange(skill, question, e.target.value)}
                ></textarea>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-violet-500 text-white py-2 px-4 rounded mt-4 hover:bg-violet-600"
        >
          Submit
        </button>
      </form>
    </div>
    </div>

  );
};

export default QuestionsForm;
