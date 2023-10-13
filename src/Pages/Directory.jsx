import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserTile from '../Components/UserTile'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const EmployeeDirectory = ({ users }) => {
    const [visibleUsers, setVisibleUsers] = useState(50);
    const [inputText, setInputText] = useState('');

    // Load field values from localStorage on component mount
    useEffect(() => {
        const storedInputText = localStorage.getItem('inputText');

        if (storedInputText) {
            setInputText(storedInputText);
        }
    }, []);

    // Save field values to localStorage on input change
    useEffect(() => {
        localStorage.setItem('inputText', inputText);
    }, [inputText]);

    const handleLoadMore = () => {
        setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 50);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(inputText.toLowerCase())
    );

    return (
        <div className='directory-container'>
            <h2>Employee Directory</h2>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Search by name"
            />
            <ul>
                {filteredUsers.slice(0, visibleUsers).map((employee, index) => (
                    <UserTile key={index} employee={employee} users={users} />
                ))}
            </ul>
            {visibleUsers < filteredUsers.length && (
                <button onClick={handleLoadMore} className="load-more-button">Load More</button>
            )}
        </div>
    );
};

export default EmployeeDirectory;
