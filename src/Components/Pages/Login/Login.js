import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { CLIENT_ID, SCOPES } from '../../../Config';
import { Jumbotron, Button } from 'react-bootstrap';

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
        <div>
            <Jumbotron style={{ backgroundColor: "light" }}>
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">Welcome to my demo Google Calendar Apllication.</p>
                <p>This app was made for a React Engineer assigment @ Ars Futura, in February 2020.</p>
                <p className="lead">
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
                </p>
            </Jumbotron>
        </div>
    )
}