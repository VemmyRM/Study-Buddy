import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Container, Form, Button } from 'react-bootstrap';
 
const PasswordForgetPage = () => (
  <Container>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Container>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address" />
        </Form.Group>
        <Button variant = "primary" disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
 
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}
 
const PasswordForgetLink = () => (
  <div>
    <p>
    Forgot your password?
    <Link className = "link" to={ROUTES.PASSWORD_FORGET}>Click here</Link>
    </p>
  </div>

);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };