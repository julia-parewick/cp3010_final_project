import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import '../end.css';


export function Header(){
    return(
      <div>
        <div id="menu" class="flex-center flex-column">
            <h1>Menu</h1>
            <a href="/stats" class="btn">Stats</a>
            <LoginButton />
            <LogoutButton />
        </div>
      </div>
    )
  }