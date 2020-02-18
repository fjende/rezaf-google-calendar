import React, { useEffect } from 'react'
import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../../../api';
import { Button, Navbar } from 'react-bootstrap';

function Home(props) {

    useEffect(() => {
        if (sessionStorage.getItem('loggedIn') == null) {
            props.history.push('/');
        }
    });

    const logoutSuccess = () => {
        sessionStorage.removeItem('loggedIn');
        props.history.push('/');
    }

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand> Google Calendar Apllication</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={logoutSuccess}
                        render={renderProps => (
                            <Button color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</Button>
                        )}

                    >
                    </GoogleLogout>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Home;
