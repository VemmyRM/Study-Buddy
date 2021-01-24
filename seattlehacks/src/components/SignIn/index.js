import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Form, Container, Button} from 'react-bootstrap';

 
const SignInPage = () => (
  <Container>
    <h1>Sign In</h1>
    <br></br>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Container>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (

        <Form onSubmit={this.onSubmit}>
        <Form.Group controlID="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address" />
        </Form.Group>
        
        <Form.Group controlId = "formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control  name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
 
        {error && <p>{error.message}</p>}
      </Form>
      
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };