import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/edit-profile' className='btn btn-success'>
                <i className='fas fa-user-circle text-light'></i> Edit Profile
            </Link>
            <Link to='/add-experience' className='btn btn-white'>
                <i className='fab fa-black-tie text-primary'></i> Add Experience
            </Link>
            <Link to='add-education' className='btn btn-white'>
                <i className='fas fa-graduation-cap text-primary'></i> Add
                Education
            </Link>
        </div>
    );
};

export default DashboardActions;
