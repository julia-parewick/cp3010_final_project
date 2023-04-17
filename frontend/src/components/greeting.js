import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

export function Greeting() {
    const { user, isAuthenticated } = useAuth0();

    const [ userData, setUser ] = useState([]);

    useEffect(() => {
        fetch('/api/getuser')
        .then(res => res.json())
        .then(setUser)
        .catch(e=>console.log(e.message));
    }, []);

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
                userData.forEach(u=>{
            
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
            }
          }
          catch (e) {
            console.log('error', e)
          }
    }


    const currentTime = new Date().getTime();
    const date = new Date(currentTime);
    if(!isAuthenticated){
        return(<h1>Please Login!</h1>);
    }
    else{
        localStorage.clear();
        userData.forEach(u=>{
            
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
                <h2>Greetings, {user.nickname}.<br/>You have already played today. Wait until tomorrow.</h2>
                </>
            )
        }
    }
}