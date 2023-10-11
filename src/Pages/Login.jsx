import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // API call to check the credentials
        checkCreds(email, password)
            .then((res) => {
                console.log(res);
                // if (res.success) {
                //     setIsLoggedIn(true);
                //     // Save the credentials to localStorage
                //     localStorage.setItem('directoryUser', res.data.directoryUser);
                // } else {
                //     setIsLoggedIn(false);
                // }
                setIsLoggedIn(true); // for testing only!!!
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

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('directoryUser');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    <Navigate to="/directory" />
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