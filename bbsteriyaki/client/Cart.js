import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

// CART TO-DOs:
// Map over the stringified object and format the order nicely on the screen
// Allow editing of orders (currently you just go back to the previous screen)
// Allow adding of more orders (will need to reset the previous screen somehow - create )
  // I think these items both need a database involved

function Cart({ route, navigation}) {
  const { order } = route.params;
  const orders = [];
  orders.push(JSON.stringify(order))
  console.log('ORDER: ', orders)
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text>order: {JSON.stringify(order)}</Text>
        <Text style={styles.font}>THIS IS THE CART PAGE</Text>
      </View>
      <Button style={styles.button} title="Return to Order" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Order')}/>
      <Button style={styles.button} title="Proceed to Checkout" accessibilityLabel="Clicking this button will proceed to the order screen" color="blue" onPress={() => navigation.navigate('Checkout')}/>
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
  }
});

export default Cart;