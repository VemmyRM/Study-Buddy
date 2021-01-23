import React from 'react';
 
import { withAuthorization } from '../Session';


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

export const initializaSession = () => {
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
 session.on("streamCreated", function (event) {
     subscriber = session.subscribe(
         event.stream,
         "Subscriber",
         {
            insertMode: "append",
            width: "100%",
            height: "100%",
         },
         handleError
    );
 });

 // connect to the session
 session.connect(token, function (error) {
   // If the connection is successful, publish to the session
   if (error) {
       handleError(error);
   } else {
       session.publish(publisher, handleError);
   }
 });
 // do some action upon destroying the created stream
 session.on("streamDestroyed", function (event) {
     console.log("The Video chat has ended");
 });
}

const HomePage = () => {
  return(
    <div>
      <button onClick = {initializaSession}>Join call!</button>
      <button onClick = {() => {session.unpublish(publisher)}}>End call!</button>
      <div id = "videos">
        <div od="publisher"></div>
        <div id="subscribe"></div>
    </div>
    </div>
    
  )
};

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
