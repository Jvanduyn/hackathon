import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserTile = ({ employee, users }) => {

    return (
        <div  className='userTile'>
            <Link to={`/details?i=${users.indexOf(employee)}`}>{employee.name}</Link>
        </div>
    );
}

export default UserTile;