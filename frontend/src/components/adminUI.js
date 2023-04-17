import React from 'react';
import Button from 'react-bootstrap/Button';

export function AdminView(){

    const resetQuestions = async () => {
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
            let response = await fetch("/api/adminreset",requestOptions);
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
        <Button onClick={()=>{
            resetQuestions()
        }}>Reset Questions</Button>
        <div id="message"></div>
        </>
    )
}