import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Landing = ({ isAuthenticated }) => {
    //NOTE/: If Authenticated redirect to dashboard

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <img
                        src='anetwork.png'
                        style={{
                            width: "300px"
                        }}
                    />
                    <h1 className='x-large'>SOCIAL NETWORK </h1>
                    <p className='lead'>
                        The first aggregator of social networks
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
