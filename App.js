import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA6lBre_CWlzTTo3nCXRbUsxV8mfgM4UUY",
      authDomain: "auth-606fb.firebaseapp.com",
      databaseURL: "https://auth-606fb.firebaseio.com",
      projectId: "auth-606fb",
      storageBucket: "auth-606fb.appspot.com",
      messagingSenderId: "1036554078324"
    })
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;