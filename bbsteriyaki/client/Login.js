import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
    console.log("state: ", state)
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
        <TextInput style={styles.inputBox} type="text" name="email" onChange={handleChangeEmail}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Password: </Text>
        <TextInput style={styles.inputBox} secureTextEntry={true} type="text" name="password" onChange={handleChangePassword}></TextInput>
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