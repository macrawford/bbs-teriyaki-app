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
  var database = Firebase.database();
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    console.log('Email: ', state.email)
    console.log('firstName: ', state.firstName)
    console.log('lastName: ', state.lastName)
  });
  // const [modalVisible, setModalVisible] = useState(false)
  // LEFT OFF HERE ADDING MODAL- FOLLOW REACT DOCS SHOULDN'T BE TOO HARD- BOOKMARKED UNDER MODAL - REACT-NATIVE
  function handleChangeFirstName(e) {
    const value = e;
    setState({
      ...state,
      firstName: value
    });
  };
  function handleChangeLastName(e) {
    const value = e;
    setState({
      ...state,
      lastName: value
    });
  };
  function handleChangeEmail(e) {
    const value = e;
    setState({
      ...state,
      email: value
    });
  };
  // THERE IS NO E.TARGET.VALUE in REACT NATIVE
  // ALSO YOU HAVE TO DO HANDLECHANGETEXT IN REACT NATIVE IT APPEARS
  function handleChangePassword(e) {
    const value = e;
    setState({
      ...state,
      password: value
    });
  };

  function handleSignup() {
    Firebase.auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      // MOST IMPT MIGHT HAVE BEEN CALLING IT STATE.EMAIL
      .then((user) => {
        console.log('user: ', user);
        Firebase.database().ref('users/' + user.user.uid).set({
          firstName: state.firstName,
          lastName: state.lastName,
          email: user.user.email,
          cart: {},
          pastOrders: {},
          rewardCount: 0
        })
        // It appears cart and pastOrders won't actually be added since they are undefined at this point
        navigation.navigate('Location')
      })
      .catch(error => {
        console.log('error: ', error)
        alert(error)
        // ^Can probably do something cleaner than this- the alert isn't very specific at this point
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.font}>First Name: </Text>
        <TextInput style={styles.inputBox} type="text" name="firstName" onChangeText={(e) => handleChangeFirstName(e)}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Last Name: </Text>
        <TextInput style={styles.inputBox} type="text" name="lastName" onChangeText={(e) => handleChangeLastName(e)}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Email: </Text>
        <TextInput style={styles.inputBox} type="text" name="email" onChangeText={(e) => handleChangeEmail(e)}></TextInput>
      </View>
      <View style={styles.input}>
        <Text style={styles.font}>Password: </Text>
        <TextInput style={styles.inputBox} secureTextEntry={true} type="text" name="password" onChangeText={(e) => handleChangePassword(e)}></TextInput>
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