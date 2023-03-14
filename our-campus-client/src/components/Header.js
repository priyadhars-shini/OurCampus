import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container} from "react-bootstrap";

import GoogleAuth from "./GoogleAuth";


const Header = ({setUser}) => {
  return (
    <header>
      <Navbar
        sticky='top'
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src='logo4.png'
                alt='Our Campus'
                width='45'
                height='30'
                className='d-inline-block align-top'
              />{" "}
              Our Campus
            </Navbar.Brand>
          </LinkContainer>
          <GoogleAuth setUser={setUser}/>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
