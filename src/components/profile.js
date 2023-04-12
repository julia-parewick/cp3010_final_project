import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  // console.log(JSON.stringify(user));
  return (
    isAuthenticated &&(
    <div>
      <JSONPretty data={user} />
      {/* {JSON.stringify(user,null,2)} */}
    </div>
  )
  )
}
export default Profile;
