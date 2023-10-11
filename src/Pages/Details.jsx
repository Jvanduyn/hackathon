//page that houses just the details of the individual employee that is selected from the array of employees

import React from 'react';
import { Users } from '..';

const EmployeeDetails = (/* Users */) => {
    return (
        <div>
            <h2>Employee Details</h2>
            <div>
                <h3>Name:</h3> {Users[0].name}
            </div>
            <div>
                <h3>Role:</h3> {Users[0].role}
            </div>
            <div>
                <h3>Phone Number:</h3> {Users[0].phone}
            </div>
            <div>
                <h3>Location:</h3> {Users[0].location}
            </div>
            <div>
                <h3>Email:</h3> {Users[0].email}
            </div>
            <div>
                <h3>Manager:</h3> {Users[0].manager}
            </div>
            <div>
                <h3>Salary:</h3> {Users[0].salary}
            </div>
        </div>
    );
};

export default EmployeeDetails;


