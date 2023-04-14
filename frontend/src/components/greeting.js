import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function Greeting() {
    const { user, isAuthenticated } = useAuth0();
    if(!isAuthenticated){
        return(<h1>Please Login!</h1>);
    }
    else{
        console.log(isAuthenticated);
        localStorage.setItem("user_email", user.email);
        localStorage.setItem("username", user.given_name);
        if(Date(localStorage.getItem("last_played"))<Date.now() || localStorage.getItem("last_played")==null){
            return(
                <>
                <h2>Greetings, {user.given_name}.<br/>You have not played today!</h2>
                <button onClick={()=>{
                    document.getElementById("game").classList.toggle("hidden");
                }}>
                    Begin</button>
                </>
            )
        }else{
            return(
                <>
                <h2>Greetings, {user.given_name}.<br/>You have already played today. Wait until tomorrow.</h2>
                </>
            )
        }
    }
}
