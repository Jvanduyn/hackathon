//page that houses just the details of the individual employee that is selected from the array of employees

import React from 'react';
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const EmployeeDetails = ({ users }) => {
    const index = new URLSearchParams(window.location.search).get('i');
    const userInfo = users[index];
    const myObj = JSON.parse(localStorage.getItem('directoryUser'));
    const canSee = (myObj.role === 'HR') ||
        (myObj.email === userInfo.manager) ||
        (myObj.email === userInfo.email);

    const genders = ['men', 'women'];
    const randomID = Math.floor(index % 100);
    const randomGender = genders[randomID % 2 === 0 ? 0 : 1];

    const myPhoto = `https://randomuser.me/api/portraits/${randomGender}/${randomID}.jpg`;
    
    return (
        <div className='details-container'>
            <h2 style={{ textAlign: 'center' }} >Employee Details</h2>
            <img src={myPhoto} alt="User" style={{ width: '150px', height: '150px', display: 'block', margin: 'auto', marginBottom: '10px' }} />

            <div>
                <h3>Name:</h3> {userInfo.name}
            </div>
            <div>
                <h3>Role:</h3> {userInfo.role}
            </div>
            <div>
                <h3>Phone Number:</h3> {userInfo.phone}
            </div>
            <div>
                <h3>Location:</h3> {userInfo.location}
            </div>
            <div>
                <h3>Email:</h3> {userInfo.email}
            </div>
            <div>
                <h3>Manager:</h3> {userInfo.manager}
            </div>
            {canSee ? (
                <div>
                    <h3>Salary:</h3> {formatter.format(userInfo.salary)}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default EmployeeDetails;


