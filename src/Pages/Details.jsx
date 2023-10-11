//page that houses just the details of the individual employee that is selected from the array of employees

import React from 'react';

const EmployeeDetails = (Users) => {
    const index =  new URLSearchParams(window.location.search).get('i');
    return (
        <div>
            <h2>Employee Details</h2>
            <div>
                <h3>Name:</h3> {Users[index].name}
            </div>
            <div>
                <h3>Role:</h3> {Users[index].role}
            </div>
            <div>
                <h3>Phone Number:</h3> {Users[index].phone}
            </div>
            <div>
                <h3>Location:</h3> {Users[index].location}
            </div>
            <div>
                <h3>Email:</h3> {Users[index].email}
            </div>
            <div>
                <h3>Manager:</h3> {Users[index].manager}
            </div>
            <div>
                <h3>Salary:</h3> {Users[index].salary}
            </div>
        </div>
    );
};

export default EmployeeDetails;


