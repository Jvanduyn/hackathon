import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Jake S:
        //HR:
        // "Henderson67@yahoo.com"
        // "r6toOP7OQPs7mKy"

        //Manager:
        // "Tierra6@yahoo.com"
        // "Im8JeAMzvvXZVO1"

        // Jake V:
        //HR:
        // "Henderson67@yahoo.com"
        // "r6toOP7OQPs7mKy"

        //Manager:
        // "Tierra6@yahoo.com"
        // "Im8JeAMzvvXZVO1"

        // API call to check the credentials
        checkCreds(email, password)
            .then((res) => res.json())
            .then((data) => {
                console.log('Data: ', data);
                if (data) {
                    setIsLoggedIn(true);
                    // Save the credentials to localStorage
                    localStorage.setItem('directoryUser', JSON.stringify(data));
                    console.log(JSON.parse(localStorage.getItem('directoryUser')));
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
                    <Navigate to="/directory"/>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
}