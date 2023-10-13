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
    const [predictionLoading, setPredictionLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState('');
    const navigate = useNavigate();

    const handleLoadMore = () => {
        setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 50);
    };

    const handleLogout = () => {
        localStorage.removeItem('directoryUser');
        navigate('/login');
    };

    const handlePredict = () => {
        if (!predictionText) {
            setPredictionResult('');
            return
        }

        //console.log('Predicting salary for:', predictionText);

        // Set loading state to true
        setPredictionLoading(true);

        fetch(`http://localhost:3001/api/getPrediction?role=${predictionText.charAt(0).toUpperCase() + predictionText.slice(1)}`)
            .then((response) => {
                if (response.status === 500) {
                    return null;
                }
                return response.json();
            })
            .then((data) => {
                setPredictionResult(formatter.format(data.prediction));
            })
            .catch(() => {
                setPredictionResult('No data on role');
            })
            .finally(() => {
                // Set loading state to false when the request is complete
                setPredictionLoading(false);
            });
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
                    placeholder="Enter role"
                />
                <button onClick={handlePredict}>Salary Prediction</button>
            </div>
            <div>
                {predictionLoading ? (
                    <p>Loading...</p> 
                ) : (
                    <p>{predictionResult}</p> 
                )}
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
