import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import Button from 'react-bootstrap/Button';
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
            <div class = "MenuDiv">
            <a href='/' class="btn">Home</a>
            </div>
            <div class = "MenuDiv">
            <a href="/stats" class="btn">Stats</a>
            </div>
              <LoginButton />
              <LogoutButton />
        </div>
        </Row>
      </div>
    )
  }