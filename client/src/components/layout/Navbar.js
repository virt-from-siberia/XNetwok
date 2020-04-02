import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link href='/dashboard'>
                    <i className='fas fa-user'></i>
                    <span className='hide-sm'> Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i>{" "}
                    <span className='hide-sm'> Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <a href='#!'>Developers</a>
            </li>
            <li>
                <Link href='/register'>Register</Link>
            </li>
            <li>
                <a href='/login'>Login</a>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <Link to='/'>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img src='anetwork.png' style={{ width: "100px" }} />
                    <h1>Network</h1>
                </div>
            </Link>
            {!loading && (
                <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
