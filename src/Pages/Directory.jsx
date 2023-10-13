import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const EmployeeDirectory = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = useState(50);
  const [inputText, setInputText] = useState('');
  const [predictionText, setPredictionText] = useState('');
  const [prediction, setPrediction] = useState('');
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 50);
  };

  const handleLogout = () => {
    localStorage.removeItem('directoryUser');
    navigate('/login');
  };

  const handlePredict = () => {
    console.log('Predicting salary for:', predictionText);
    setPrediction(predictionText);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <input
          type="text"
          value={predictionText}
          onChange={(e) => setPredictionText(e.target.value)}
          placeholder="Search by name"
        />
        <button onClick={handlePredict}>Salary Prediction</button>
      </div>
      <div>
        <p>{prediction ? formatter.format(prediction) : ''}</p>
      </div>
      <h2>Employee Directory</h2>
      <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Search by name"
        />
      <ul>
        {filteredUsers.slice(0, visibleUsers).map((employee, index) => (
          <li key={index}>
            <Link to={`/details?i=${users.indexOf(employee)}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
      {visibleUsers < filteredUsers.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default EmployeeDirectory;
