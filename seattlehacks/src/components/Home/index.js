import './index.css';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { withAuthorization, AuthUserContext } from '../Session';
import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {  withRouter } from 'react-router-dom';

const INITIAL_STATE = {
  username: '',
  course: '',
  error: null,
};

const HomePage = () => (
  <div>
      <h1>Home</h1>
    <HomePageForm />

    <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>UID: {authUser.uid}</h1>
          </div>
        )}
         </AuthUserContext.Consumer>
  
  </div>
);

// const HomePage = () => {
//   return(
//     <div id = "homepage">
//      <div>I am studying <DropdownButton id="dropdown-basic-button" title="Course">
//   <Dropdown.Item >Math</Dropdown.Item>
//   <Dropdown.Item >Physics</Dropdown.Item>
//   <Dropdown.Item>Chemistry</Dropdown.Item>
//   <Dropdown.Item>English</Dropdown.Item>
//   <Dropdown.Item>CS</Dropdown.Item>
// </DropdownButton></div>


// <br />
// <br />
// {/* <CallPage /> */}
//     </div>
//   )
// };

class HomePageFormBase extends Component{
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, course } = this.state;

    this.props.firebase.
    createQueue (username, course)
    .then(authUser =>
      {
        return 
        this.props.firebase
    //     .database().ref('Matches/' + authUser.user.uid)
    //     .user(authUser.user.uid)
    //     .set({
    //   username,
    //  course,
    // })
    .user(authUser.user.uid)
          .set({
            username,
            course,
          });
        // );
    // )}
    // </AuthUserContext.Consumer>
  })

    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(username, course )
    //   .then(authUser => {
    //     // Create a user in your Firebase realtime database
        // return this.props.firebase
        //   .user(authUser.user.uid)
        //   .set({
        //     username,
        //     course,
        //   });
      // })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CALL);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
      username,
      course,
      error,
    } = this.state;

    return (
  
  <form onSubmit={this.onSubmit}>
           <div>I am studying <DropdownButton id="dropdown-basic-button" title="Course">
  <Dropdown.Item >Math</Dropdown.Item>
  <Dropdown.Item >Physics</Dropdown.Item>
  <Dropdown.Item>Chemistry</Dropdown.Item>
  <Dropdown.Item>English</Dropdown.Item>
  <Dropdown.Item>CS</Dropdown.Item>
</DropdownButton></div>
        <input
          name="course"
          value={course}
          onChange={this.onChange}
          type="text"
          placeholder="Preferred Course"
        />
        <button type="submit">Submit request!</button>
        {error && <p>{error.message}</p>}
      </form>
     
    );
  }
}

const HomePageForm = compose(
  withRouter,
  withFirebase,
)(HomePageFormBase);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
