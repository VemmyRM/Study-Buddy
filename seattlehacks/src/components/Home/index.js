import React from 'react';
// import './index.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { withAuthorization } from '../Session';
import axios from 'axios';
import {Container, Button, FormControl, Form} from "react-bootstrap";
import * as ROUTES from '../../constants/routes';

const OT = require('@opentok/client');

var apiKey = '45828062';
var sessionId = '1_MX40NTgyODA2Mn5-MTYxMTQyNjY4NDAyMH5BbjVtTHVVbjVJSGQ5MWN1ZGJ3YU5DL2l-UH4';
var token = 'T1==cGFydG5lcl9pZD00NTgyODA2MiZzaWc9ZTNiOTgzNzkzM2EzYWVmMTQxNmQyZjRjMDFjNDg4OGM1M2I2MGNhMTpzZXNzaW9uX2lkPTFfTVg0ME5UZ3lPREEyTW41LU1UWXhNVFF5TmpZNE5EQXlNSDVCYmpWdFRIVlZialZKU0dRNU1XTjFaR0ozWVU1REwybC1VSDQmY3JlYXRlX3RpbWU9MTYxMTQyNzQyMiZub25jZT0wLjY1MTY2MDkxMTYwMzAyODcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTYxMTUxMzgyMg==';

let session, publisher, subscriber;

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

const joinCall = () => {
  var SERVER_BASE_URL = 'https://studybuddytech.herokuapp.com';


  fetch(SERVER_BASE_URL + '/session').then(function(res) {
    return res.json()
  }).then(function(res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;
    initializeSession();
  }).catch(handleError);


  // fetch(SERVER_BASE_URL + '/session').then(function(res) {
  //   return res.json()
  // }) 
  // .then(function(res) {
  //   apiKey = res.apiKey;
  //   sessionId = res.sessionId;
  //   token = res.token;
  //   initializeSession();
  // })
  // .catch(handleError);
}

export const initializeSession = () => {

    session = OT.initSession(apiKey, sessionId);
    // create a publisher
    publisher = OT.initPublisher(
       "publisher",
       {
          insertMode: "append",  
          width: "100%",
          height: "100%"
       },
       handleError
    );
    // subscribe to newly created stream


 // connect to the session
 session.connect(token, function (error) {
   // If the connection is successful, publish to the session
   if (error) {
       handleError(error);
   } else {
       session.publish(publisher, handleError);
   }
 });

 session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
         insertMode: "append",
         width: "100%",
         height: "100%",
      },
      handleError
 );
});

console.log(session);

 // do some action upon destroying the created stream
 session.on("streamDestroyed", function (event) {
   console.log("Stream Destroyed!");
   console.log(session);
 });

 session.on("sessionDisconnected", (event) =>{
    console.log("You have been disconnected!");
    if (event.reason === "networkDisconnected"){
      alert("Your network was disconnected");
    }
 })

}

const endCall = () => {
  session.disconnect();
}

const HomePage = () => {
  return(
    <Container id = "landingTron">
      <h1 className= "homeText"> Welcome to Study Buddy! </h1>
      <br></br>
      <p className = "homeWords">Tell us what you're studying, and we'll match you with a study buddy working on the same thing!</p>
      <br></br>
       <h3 className = "studying">I'm studying...</h3>
       <br></br>
       <br></br>
       <Form>
       <Form.Group>
         <Form.Control as="select" size = "lg">
           <option>Math</option>
           <option>Physics</option>
           <option>Chemistry</option>
           <option>English</option>
           <option>CS</option>
         </Form.Control>
       </Form.Group>
       <Button  href ={ROUTES.CALL} variant = "outline-light" type = "submit">Find my Study Buddy! </Button>
       </Form>
    </Container>
  )
};

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
