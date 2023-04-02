import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';


export function Header(){
    return(
      <Container fluid='true'>
          <Navbar>
            <Navbar.Brand>Daily Trivia Quiz</Navbar.Brand>
            <Nav>
                <LoginButton />
                <LogoutButton />
            </Nav>
          </Navbar>
      </Container>
    )
  }