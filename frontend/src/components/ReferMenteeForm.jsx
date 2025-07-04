import React, { useState } from 'react';
import axios from 'axios';

const ReferMenteeForm = () => {
  const [formData, setFormData] = useState({
    menteeName: '',
    skills: '',
   menteeId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/mentee-referrals', formData);
      alert('Mentee referred successfully!');
    } catch (error) {
      console.error('Error referring mentee:', error);
      alert('Failed to refer mentee. Please try again.');
    }
  };

  return (
    <div className="refer-mentee-form container text mt-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl ml-5 font-bold mb-4">Refer a Mentee</h2>
      <form onSubmit={handleSubmit} className=" flex flex-col px-5 ">
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2">Mentee's Id:</label>
          <input
            type="text"
            name="menteeName"
            placeholder="Mentee's Name"
            value={formData.menteeId}
            onChange={handleChange}
            className="w-[50%] p-2 pl-10 text-sm text-gray-700  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2">Skills:</label>
          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-[50%] p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
          />
        </div>
      
        <button
          type="submit"
          className="py-2 w-[50%] px-4 bg-violet-500 hover:bg-violet-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReferMenteeForm;