import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { AdminView } from './adminUI';
import '../utilities/end.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Greeting(props) {
    const { user, isAuthenticated } = useAuth0();
    document.body.style = 'background: #e3e3e3;';
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
        return(<div className = "styleRow">
            <h1>Please Login!</h1></div>);
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
                <div className = "styleRow">
                    <h1>Greetings, Admin.</h1>
                    <p>Admin Tools:</p>
                    <AdminView/>
                </div>
                </>
            )
        }
        else{
            if(localStorage.getItem("last_played")!=date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear() || localStorage.getItem("last_played")==null){
                return(
                    <>
                    <div className = "styleRow">
                    <h2>Greetings, {user.nickname}.<br/>You have not played today!</h2>
                    </div>
                    </>
                )
            }else{
                return(
                    <>
                    <div className = "styleRow">
                    <h2>Greetings, {user.nickname}.<br/>You have already played today. Wait until tomorrow.</h2>
                    </div>
                    </>
                )
            }
        }
    }
}