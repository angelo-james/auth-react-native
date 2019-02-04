import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  //on press helper function uses firebase to authenticate the user if no user tries to create user if user exist shows authentication failure message
  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ 
      error: '',
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }

  //toggle loading spinner and error message if failed login attempt
  onLoginFail() {
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    })
  }
  //toggle loading spinner and clears state if login success
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }
  //renders the button to show and hide when clicked
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
      >
      Log In
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder='user@email.com'
            label='Email'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input 
            secureTextEntry
            placeholder='password'
            label='Password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;