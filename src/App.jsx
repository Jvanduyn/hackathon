import Login from './Pages/Login'
import Directory from './Pages/Directory'
import Details from './Pages/Details'
import Header from './Components/Header'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default () => {

    const [users, setUsers] = useState([]);
    const location = useLocation();

    // Load user data on mount
    useEffect(() => {
        fetch('http://localhost:3001/api/employees')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.sort((a, b) => a.name.localeCompare(b.name)));
            });
    }, []);

    const isLoginPage = location.pathname === '/login';

    return (
        <div className="App">
            {!isLoginPage && <Header />}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/directory" element={<Directory users={users} />} />
                <Route path="/details" element={<Details users={users} />} />
            </Routes>
        </div>
    );
}