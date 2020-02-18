import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { CLIENT_ID } from '../../../api';

export default function Login(props) {

    useEffect(() => {
        if (sessionStorage.getItem('loggedIn')) {
            props.history.push('/home');
        }
    });

    const responseSuccess = async (response) => {
        console.log(response);
        sessionStorage.setItem('loggedIn', true);
        props.history.push('/home');
    }

    const responseFailure = async (response) => {
        console.log(response);
    }

    return (
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>login</button>
                )}
                onSuccess={responseSuccess}
                onFailure={responseFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}