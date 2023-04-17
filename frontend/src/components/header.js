import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import '../utilities/end.css';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header(){
  document.body.style = 'background: #9e9e9e;';
    return(
      <div className = "divMenu">
        <Row className = "menuRow">
        <div id="menu" class="flex-center flex-column" background-color='#b8eaff'>
            <h1>Trivia App CP3010</h1>
            <a href='/' class="btn">Home</a>
            <a href="/stats" class="btn">Stats</a>
            <LoginButton />
            <LogoutButton />
        </div>
        </Row>
      </div>
    )
  }