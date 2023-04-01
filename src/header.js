import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export function Header(){
    return(
      <Container fluid='true'>
          <Navbar>
            <Navbar.Brand>Daily Trivia Quiz</Navbar.Brand>
          </Navbar>
      </Container>
    )
  }