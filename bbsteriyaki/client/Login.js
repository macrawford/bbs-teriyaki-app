import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableHighlight } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

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
        navigation.navigate('Location')
      })
      .catch(error => console.log('error: ', error))
  }
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.font}>Email: </Text>
        <TextInput style={styles.inputBox} type="text" name="email" onChangeText={(e) => handleChangeEmail(e)}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Password: </Text>
        <TextInput style={styles.inputBox} secureTextEntry={true} type="text" name="password" onChangeText={(e) => handleChangePassword(e)}></TextInput>
      </View>
      <Button style={styles.button} title="Submit" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={handleSubmit}/>
      <Button style={styles.button} title="Not Registered? Sign up" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={() => navigation.navigate('Signup')}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 125,
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  }
});

export default Login;