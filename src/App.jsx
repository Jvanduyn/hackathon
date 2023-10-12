import Login from './Pages/Login'
import Directory from './Pages/Directory'
import Details from './Pages/Details'
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default () => {

    const [users, setUsers] = useState([]);

    // Load user data on mount
    useEffect(() => {
        fetch('http://localhost:3001/api/employees')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, []);

    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/directory" element={<Directory users={users}/>} />
                <Route path="/details" element={<Details users={users}/>} />
            </Routes>
        </div>
    );
}