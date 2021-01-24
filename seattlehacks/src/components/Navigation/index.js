import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Nav } from 'react-bootstrap'

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);


const NavigationAuth = ({ authUser }) => (
  <div>
  <Navbar bg="dark" variant="dark">
  <Nav.Link href="#home">Study Buddy</Nav.Link>  
    <Nav.Link href="#home"></Nav.Link>    
    <Nav className="mr-auto"> 
      {/* <Nav.Link href = {ROUTES.LANDING}>Landing</Nav.Link> */}
      <Nav.Link href ={ROUTES.HOME}>Home</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href ={ROUTES.ACCOUNT}>Account</Nav.Link> 
      <SignOutButton />
    </Nav>
  </Navbar>
  
  </div>
);

const NavigationNonAuth = () => (


  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">LOGO/COMPANY</Navbar.Brand>    
    <Nav className="mr-auto"> 
      {/* <Nav.Link href = {ROUTES.LANDING}>Landing</Nav.Link> */}

    </Nav>
    <Nav>
      <Nav.Link href ={ROUTES.SIGN_IN}>Sign In</Nav.Link>
      <Nav.Link href ={ROUTES.SIGN_UP}>Sign Up!</Nav.Link> 
    </Nav>
  </Navbar>
);

export default Navigation;