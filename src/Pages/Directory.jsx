import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeDirectory = ({ Users }) => {
    Users = !Users ? [] : Users;
    const fiftyEmployees = Users.slice(0, 50);

    // Sort the employees by name in alphabetical order
    fiftyEmployees.sort((a, b) => a.name.localeCompare(b.name));
    
    return (
        <div>
            <h2>Employee Directory</h2>
            <ul>
                {fiftyEmployees?.map((employee, index) => (
                    <li key={index}>
                        <Link to={`/details?i=${index}`}>{employee.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDirectory;