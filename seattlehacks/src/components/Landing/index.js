import React from 'react';
import {Jumbotron, Button, Container} from "react-bootstrap";
import * as ROUTES from '../../constants/routes';

//import "./index.css";
 
const Landing = () => (
  <Container id= "landingTron">
    <h1 className = "text">Study Buddy</h1>
    <br></br>
    <p className = "words">
      A collaborative online studying experience.  
    </p>
    <br></br>
    <br></br>
    <Button variant = "outline-light" href = {ROUTES.SIGN_IN}>Sign In</Button>
  </Container>
);
 
export default Landing;