import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../utilities/end.css';
import { Button } from 'bootstrap';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return(
        isAuthenticated && (
        <div class = "MenuDiv">
        <button class='btn' onClick={() => {
        logout();
        localStorage.clear()}}>
        Logout
        </button>
        </div>

)
    )
}

export default LogoutButton;