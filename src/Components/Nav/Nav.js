import React, { useEffect } from 'react'
import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../../Config';
import { Button, Navbar } from 'react-bootstrap';
import { Route, withRouter } from 'react-router';

function Nav(props) {

    const logoutSuccess = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('accessToken');
        props.history.push('/');
    }

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand> Google Calendar Application</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(Nav);
