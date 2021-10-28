import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Minter from './Minter'
import { Navbar, Container, Nav} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
            <Container >
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Minter">Mint</Nav.Link>
                    <Nav.Link href="/team">Team</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
      <Routes>
        <Route path="Mint" element={<Minter />} />
        <Route path="Team" element={<Team />} />
      </Routes>
    </div>
  );
}
function Home() {
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
       
      </>
    );
  }
  
export default App;