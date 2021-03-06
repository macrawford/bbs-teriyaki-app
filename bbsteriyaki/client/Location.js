import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { api_key } from '../mapsapikey.js';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

function Location({ navigation }) {
  var database = Firebase.database();
  // var userId = Firebase.auth().currentUser.uid;
  // ^This shows the current user's userId and will be how we access the user's info going forward!!!

  // Webview won't work when inside of another component it seems (inside of View currently)
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.font}>THIS IS THE LOCATIONz PAGE</Text>
      </View>

      {/* <WebView
        originWhitelist={['*']}
        source={{ html: `<iframe height='600' width='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?key=${api_key}&q=bbs+teriyaki+grill+seattle' allowfullscreen><iframe/>`}}
      /> */}
      <Button style={styles.button} title="Return to Login" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Login')}/>
      <Button style={styles.button} title="Proceed to Order" accessibilityLabel="Clicking this button will proceed to the order screen" color="blue" onPress={() => navigation.navigate('Order')}/>
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
    flexDirection: 'column',
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 125,
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  },
  embedMap: {
    width: 450,
    height: 250,
    flex: 1,
  }
});

export default Location;