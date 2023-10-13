import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import '../App.css';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // API call to check the credentials
        checkCreds(email, password)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setIsLoggedIn(true);
                    // Save the credentials to localStorage
                    localStorage.setItem('directoryUser', JSON.stringify(data));
                } else {
                    setIsLoggedIn(false);
                }
                // setIsLoggedIn(true); // for testing only!!!
            })
            .catch((error) => {
                console.error('API Error:', error);
                setIsLoggedIn(false);
            });
    };

    useEffect(() => {
        // Check if credentials exist in localStorage when the component mounts
        const storedDirectoryUser = localStorage.getItem('directoryUser');

        if (storedDirectoryUser) {
            setEmail(storedDirectoryUser.email);
            setPassword(storedDirectoryUser.password);
            setIsLoggedIn(true);
        }
    }, []);

    const checkCreds = (email, password) => {
        // Call API and check if email and password exist in db      
        // returns a promise  
        return fetch(`http://localhost:3001/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <Navigate to="/directory" />
                </div>
            ) : (
                <div className="login-container">
                    <form onSubmit={handleLogin} className="login-form">
                        <h1>Login</h1>
                        <div className="input-field">
                            <label>Email:  </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-field">
                            <label>Password:  </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}