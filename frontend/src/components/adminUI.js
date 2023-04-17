import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import '../utilities/end.css';

export function AdminView(){

    const resetQuestions = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        try{
            let response = fetch("/api/adminreset",requestOptions);
            if(response.status==200){
                console.log("Reset!")
            }
        }
        catch (e) {
            console.log('error', e)
        }

        setTimeout(()=>{
            window.location.reload();
        },1000)

        
        window.alert("Questions reloaded! Refresh the page.");
    }

    return(
        <>
        <Row className = 'styleRow'>
            <div>
            <button class = "btnMenu" onClick={()=>{
            resetQuestions()
            }}>Reset Questions</button>
            <div id="message"></div>
            </div>
        </Row>
        </>
    )
}
