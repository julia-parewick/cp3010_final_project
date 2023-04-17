import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import '../utilities/end.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return(
        !isAuthenticated && (  
        <div class = "MenuDiv">
        <button class="btn"  onClick={() => loginWithRedirect()}>
            Login
        </button>
        </div>
        )
    )
}

export default LoginButton;