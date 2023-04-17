import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { AdminView } from './adminUI';
import '../utilities/end.css';
import Row from 'react-bootstrap/Row';

export function Greeting(props) {
    const { user, isAuthenticated } = useAuth0();

    // const [ userData, setUser ] = useState([]);

    // useEffect(() => {
    //     fetch('/api/getuser')
    //     .then(res => res.json())
    //     .then(setUser)
    //     .catch(e=>console.log(e.message));
    // }, []);



    const addNewUser = async (email) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          };
          try{
            let response = await fetch("/api/adduser",requestOptions);
            if(response.status==200){
                props.users.forEach(u=>{
            
                    if(u.email==user.email){
                        // console.log(u);
                        localStorage.setItem("id",u._id);
                        localStorage.setItem("email",u.email);
                        localStorage.setItem("streak",u.currentStreak);
                        localStorage.setItem("record",u.recordStreak);
                        localStorage.setItem("perfect",u.perfectScores);
                        localStorage.setItem("last_played",u.lastPlayed);
                    }
                });
            }
          }
          catch (e) {
            console.log('error', e)
          }
    }


    const currentTime = new Date().getTime();
    const date = new Date(currentTime);
    if(!isAuthenticated){
        <Row className='greetingsRow'>
        return(<h1>Please Login!</h1>);
        </Row>
    }
    else{
        localStorage.clear();
        
        props.users.forEach(u=>{
            
            if(u.email==user.email){
                console.log(u);
                localStorage.setItem("id",u._id);
                localStorage.setItem("email",u.email);
                localStorage.setItem("streak",u.currentStreak);
                localStorage.setItem("record",u.recordStreak);
                localStorage.setItem("perfect",u.perfectScores);
                localStorage.setItem("last_played",u.lastPlayed);
            }
        });
        if(localStorage.email==null){
            addNewUser(user.email);
        }
        else if(localStorage.email=="admin@cp3010.com"){
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