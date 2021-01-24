import React from 'react';
import {Jumbotron, Button} from "react-bootstrap";
 
const Landing = () => (
<Jumbotron id= "landingTron">
  <h1>Our Project</h1>
  <br></br>
  <p>
    A collaborative online learning experience to bring together students from all around the world.
  </p>
  <br></br>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
);
 
export default Landing;