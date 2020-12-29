import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, CheckBox } from 'react-native';

function Order({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <CheckBox
        // MAY BE DEPRECATED
        style={styles.container}
          center
          title='Click Here'
        />
      </View>
      <Button style={styles.button} title="Return to Location" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Location')}/>
      <Button style={styles.button} title="Proceed to Cart" accessibilityLabel="Clicking this button will proceed to the order screen" color="blue" onPress={() => navigation.navigate('Cart')}/>
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

export default Order;