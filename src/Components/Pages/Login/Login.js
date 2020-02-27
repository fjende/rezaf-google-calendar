import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { CLIENT_ID, SCOPES } from '../../../Config';
import Button from '@material-ui/core/Button';

export default function Login(props) {

    useEffect(() => {
        if (sessionStorage.getItem('loggedIn')) {
            props.history.push('/home');
        }
    });

    const responseSuccess = async (response) => {
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('accessToken', response.accessToken)
        props.history.push('/home');
    }

    const responseFailure = async (response) => {
        console.log(response);
    }

    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                render={renderProps => (
                    <Button color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with your Google account</Button>
                )}
                onSuccess={responseSuccess}
                onFailure={responseFailure}
                scope={SCOPES}
                cookiePolicy={'single_host_origin'}

            />
        </div>
    )
}