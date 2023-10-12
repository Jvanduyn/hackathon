import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDirectory = ({ users }) => {
  const fiftyEmployees = users.slice(0, 50);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('directoryUser');
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Employee Directory</h2>
      <ul>
        {fiftyEmployees.map((employee, index) => (
          <li key={index}>
            {/* <Navigate to={`/details?i=${index}`} Users={users}>{employee.name} </Navigate> */}
            <Link to={`/details?i=${index}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDirectory;
