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
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">LOGO/COMPANY</Navbar.Brand>    
    <Nav className="mr-auto"> 
      {/* <Nav.Link href = {ROUTES.LANDING}>Landing</Nav.Link> */}
      <Nav.Link href ={ROUTES.HOME}>Home</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href ={ROUTES.ACCOUNT}>Account</Nav.Link> 
      <SignOutButton />
    </Nav>
  </Navbar>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;