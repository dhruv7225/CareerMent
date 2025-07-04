import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModernMentorFeedbackForm = () => {
  const [formData, setFormData] = useState({
    mentorName: '',
    sessionDate: '',
    clarityRating: '',
    helpfulnessRating: '',
    skillsRating: '',
    comments: '',
    suggestions: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback Submitted:', formData);

    fetch('/api/v1/submit-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Feedback submitted successfully!');
        setFormData({
          mentorName: '',
          clarityRating: '',
          helpfulnessRating: '',
          skillsRating: '',
          comments: '',
          suggestions: '',
        });
      })
      .catch((err) => {
        console.error('Error submitting feedback:', err);
        alert('Failed to submit feedback.');
      });
  };

  return (
    <Container>
      <FormCard>
        <Title>Mentor Feedback</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Mentor Name</Label>
          <Input
            type="text"
            name="mentorName"
            value={formData.mentorName}
            onChange={handleChange}
            placeholder="Enter mentor's name"
            required
          />


          <Label>Clarity of Explanation</Label>
          <Select
            name="clarityRating"
            value={formData.clarityRating}
            onChange={handleChange}
            required
          >
            <option value="">Rate the clarity</option>
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </Select>

          <Label>Helpfulness</Label>
          <Select
            name="helpfulnessRating"
            value={formData.helpfulnessRating}
            onChange={handleChange}
            required
          >
            <option value="">Rate the helpfulness</option>
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </Select>

          <Label>Mentoring Skills</Label>
          <Select
            name="skillsRating"
            value={formData.skillsRating}
            onChange={handleChange}
            required
          >
            <option value="">Rate the skills</option>
            <option value="5">Excellent</option>
            <option value="4">Good</option>
            <option value="3">Average</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </Select>

          <Label>What did you like about the session?</Label>
          <Textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Share your thoughts"
            rows="4"
          />

          <Label>Suggestions for Improvement</Label>
          <Textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="How could the mentor improve?"
            rows="4"
          />

          <SubmitButton type="submit" onClick={() => navigate('/home/me')}>Submit Feedback</SubmitButton>
        </Form>
      </FormCard>
    </Container>
  );
};

export default ModernMentorFeedbackForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9fafc;
`;

const FormCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: #f8f9fa;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: #f8f9fa;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background: #f8f9fa;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

