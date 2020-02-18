import React, { useEffect } from 'react'
import { GoogleLogout } from 'react-google-login';
import { CLIENT_ID } from '../../../api';

function Home(props) {

    const logoutSuccess = () => {
        sessionStorage.removeItem('loggedIn');
        props.history.push('/');
    }

    return (
        <div>
            <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={logoutSuccess}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>logout</button>
                )}

            >
            </GoogleLogout>
        </div>
    );
}

export default Home;
