import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDirectory = ({ users }) => {
    const fiftyEmployees = users.slice(0, 50);
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('directoryUser');
        navigate('/login');
    };
    const handlePredict = () => {
        // Use the 'inputText' value in your prediction function
        console.log('Predicting salary for:', inputText);
        // Call your prediction function with 'inputText'
        // predictionFunction(inputText);
        setPrediction(inputText);
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <div>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter a role"
                />
                <button onClick={handlePredict}>Salary Prediction</button>
            </div>
            <div>
                <p>{prediction ? '$' + prediction : ''}</p>
            </div>
            <h2>Employee Directory</h2>
            <ul>
                {fiftyEmployees.map((employee, index) => (
                    <li key={index}>
                        <Link to={`/details?i=${index}`}>{employee.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDirectory;
