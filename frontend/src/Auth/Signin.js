import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function Signin(r){
    const { loginWithRedirect } = useAuth0();
    useEffect(()=>{
        loginWithRedirect();
    },[])
    return(
        <>
        </>
    )
}