import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDirectory = () => {
  const [users, setUsers] = useState([]);
  const fiftyEmployees = users.slice(0, 50);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('directoryUser');
    navigate('/login');
  };

  // Load user data on mount
  useEffect(() => {
    fetch('http://localhost:3001/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Employee Directory</h2>
      <ul>
        {fiftyEmployees.map((employee, index) => (
          <li key={index}>
            <Link to={`/details?i=${index}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDirectory;
