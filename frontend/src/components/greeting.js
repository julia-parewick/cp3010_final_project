import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';

export function Greeting() {
    const { user, isAuthenticated } = useAuth0();
    const currentTime = new Date().getTime();
    const date = new Date(currentTime);
    if(!isAuthenticated){
        return(<h1>Please Login!</h1>);
    }
    else{
        localStorage.setItem("username", user.nickname);
        if(localStorage.getItem("last_played")!=date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear() || localStorage.getItem("last_played")==null){
            return(
                <>
                <h2>Greetings, {user.nickname}.<br/>You have not played today!</h2>
                {/* <Button id="displayGame" onClick={()=>{
                    document.getElementById("game").classList.remove("hidden");
                    document.getElementById("displayGame").classList.add("hidden");
                    
                }}>
                    Begin</Button> */}
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