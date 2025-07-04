import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SkillsForm = () => {
  const navigate = useNavigate();
  const skills = ['React', 'Node.js', 'CSS', 'JavaScript', 'MongoDB', 'Express'];
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [documents, setDocuments] = useState([]);

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddDocument = () => {
    setDocuments((prev) => [...prev, { name: '', link: '' }]);
  };

  const handleDocumentChange = (index, field, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index][field] = value;
    setDocuments(updatedDocs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill.');
      return;
    }
    if (documents.some((doc) => !doc.name || !doc.link)) {
      alert('Please fill in all document fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/skills', { selectedSkills, documents });
      navigate('/questions', { state: { selectedSkills } });
    } catch (error) {
      console.error('Error submitting skills and documents:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Select Your Skills & Add Documents</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          {skills.map((skill, index) => (
            <label key={index} className="block mb-2">
              <input
                type="checkbox"
                value={skill}
                className="mr-2"
                onChange={() => handleCheckboxChange(skill)}
              />
              {skill}
            </label>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Documents</h2>
          {documents.map((doc, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Document Name"
                className="border p-2 rounded w-full mb-2"
                value={doc.name}
                onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Document Link"
                className="border p-2 rounded w-full"
                value={doc.link}
                onChange={(e) => handleDocumentChange(index, 'link', e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDocument}
            className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
          >
            Add Document
          </button>
        </div>

        <button
          type="submit"
          className="bg-violet-500 text-white py-2 px-4 rounded mt-4 hover:bg-violet-600"
        >
          Next Page
        </button>
      </form>
    </div>
    </div>
  );
};

export default SkillsForm;
