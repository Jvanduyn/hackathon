import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const Header = ({ }) => {

    const [predictionText, setPredictionText] = useState('');
    const [predictionLoading, setPredictionLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedPredictionText = localStorage.getItem('predictionText');
        const storedPredictionResult = localStorage.getItem('predictionResult');

        if (storedPredictionText) {
            setPredictionText(storedPredictionText);
        }

        if (storedPredictionResult) {
            setPredictionResult(storedPredictionResult);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('predictionText', predictionText);
        localStorage.setItem('predictionResult', predictionResult);
    }, [predictionText, predictionResult]);

    const handleLogout = () => {
        localStorage.removeItem('directoryUser');
        localStorage.removeItem('inputText');
        localStorage.removeItem('predictionText');
        localStorage.removeItem('predictionResult');
        navigate('/login');
    };

    const handlePredict = () => {
        if (!predictionText) {
            setPredictionResult('');
            return;
        }

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
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <button style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={handleLogout}>Logout</button>
            <div>
                <p style={{ textAlign: 'center', marginBottom: '10px' }}>Enter a role to get the predicted salary:</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <input
                        type="text"
                        value={predictionText}
                        onChange={(e) => setPredictionText(e.target.value)}
                        placeholder="Enter role"
                        style={{ marginRight: '10px' }}
                    />
                    <button onClick={handlePredict}>Predict Salary</button>
                </div>
                <div>
                    {predictionLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>{predictionResult}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;