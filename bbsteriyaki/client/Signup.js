import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableHighlight } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

function Signup({ navigation }) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  useEffect(() => {
    console.log('Email: ', state.email)
  });
  const [modalVisible, setModalVisible] = useState(false)
  // LEFT OFF HERE ADDING MODAL- FOLLOW REACT DOCS SHOULDN'T BE TOO HARD- BOOKMARKED UNDER MODAL - REACT-NATIVE
  function handleChangeEmail(e) {
    const value = e.target.value;
    setState({
      ...state,
      email: value
    });
  }
  function handleChangePassword(e) {
    const value = e.target.value;
    setState({
      ...state,
      password: value
    });
  }
  function handleSignup() {
    Firebase.auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      // MOST IMPT MIGHT HAVE BEEN CALLING IT STATE.EMAIL
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
        <TextInput style={styles.inputBox} type="text" name="email" onChange={handleChangeEmail}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Password: </Text>
        <TextInput style={styles.inputBox} secureTextEntry={true} type="text" name="password" onChange={handleChangePassword}></TextInput>
      </View>
      <Button style={styles.button} title="Submit" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={handleSignup}/>
      <Button style={styles.button} title="Back to Login" accessibilityLabel="Clicking this button submits your email and password" color="red" onPress={() => navigation.navigate('Login')}/>
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

export default Signup;