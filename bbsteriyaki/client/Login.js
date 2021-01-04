import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, ScrollView, View, TextInput, Button, Modal, TouchableHighlight, Image, Alert } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

// STYLING TO-DOs:
  // MAKE BUTTONS LOOK BETTER - RED RECTANGLES WITH WHITE SUBMIT

function Login({ navigation }) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  // useEffect(() => {
  //   console.log('Password: ', typeof password)
  // });

  function handleChangeEmail(e) {
    const value = e;
    setState({
      ...state,
      email: value
    })
  }
  // THERE IS NO E.TARGET.VALUE in REACT NATIVE
  // ALSO YOU HAVE TO DO HANDLECHANGETEXT IN REACT NATIVE IT APPEARS
  function handleChangePassword(e) {
    const value = e;
    setState({
      ...state,
      password: value
    })
  }
  function handleSubmit() {
    Firebase.auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((user) => {
        console.log('user: ', user)
        navigation.navigate('Order')
      })
      .catch(error => {console.log('error: ', error)})
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../BB_S.png')}></Image>
      </View>
      <View style={styles.inputsAndButtons}>
        <View style={styles.input}>
          <Text style={styles.font}>Email: </Text>
          <TextInput style={styles.inputBoxEmail} keyboardType='email-address' type="text" name="email" onChangeText={(e) => handleChangeEmail(e)}></TextInput>
        </View>
        <View style={styles.input}>
          <Text style={styles.font}>Password: </Text>
          <TextInput style={styles.inputBoxPassword} secureTextEntry={true} type="text" name="password" onChangeText={(e) => handleChangePassword(e)}></TextInput>
        </View>
        <View style={styles.buttonMargin}>
          <Button title="Submit" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={handleSubmit}/>
          <Button title="Not Registered? Sign up" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={() => navigation.navigate('Signup')}/>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',

  },
  logoContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  inputsAndButtons: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  inputBoxEmail: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 185,
    height: 25
  },
  inputBoxPassword: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 155,
    height: 25
  },
  font: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
    fontSize: 16
  },
  logo: {
    height: 200,
    width: 200
  },
  buttonMargin: {
    marginTop: 10,
  }
});

export default Login;