import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import '../utilities/end.css';
import Row from 'react-bootstrap/Row';

export function Greeting() {
    const { user, isAuthenticated } = useAuth0();
    const currentTime = new Date().getTime();
    const date = new Date(currentTime);
    if(!isAuthenticated){
        <Row className='greetingsRow'>
        return(<h1>Please Login!</h1>);
        </Row>
    }
    else{
        localStorage.setItem("username", user.nickname);
        if(localStorage.getItem("last_played")!=date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear() || localStorage.getItem("last_played")==null){
            return(
                <>
                <Row className = "greetingsRow"><h2>Greetings, {user.nickname}.<br/>You have not played today!</h2></Row>
                </>
            )
        }else{
            return(
                <>
                <Row className='greetingsRow'>
                <h2>Greetings, {user.given_name}.<br/>You have already played today. Wait until tomorrow.</h2>
                </Row>
                </>
            )
        }
    }
}