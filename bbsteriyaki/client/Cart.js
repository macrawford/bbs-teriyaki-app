import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidMount } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

// CART TO-DOs:
// Map over the stringified object and format the order nicely on the screen
// Allow editing of orders (currently you just go back to the previous screen)
// Allow adding of more orders (will need to reset the previous screen somehow - create )
// Set up security rules so people can only access the info in their cart
  // I think these items both need a database involved

function Cart({ route, navigation}) {
  // const { order } = route.params;
  // const orders = [];
  // orders.push(JSON.stringify(order))
  // console.log('ORDER: ', orders)
  const [state, setState] = React.useState({
    cartItems: ''
  });
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;
  var cart = Firebase.database().ref('users/' + userId + '/cart');
  useEffect(() => {
    cart.once('value').then((snapshot) => {
      var cartData = snapshot.val();
      console.log('cartdata: ', cartData);
      console.log('cartdata[beefBrisket]: ', cartData['beefBrisket'])
      setState({
        cartItems: cartData
      })
    })
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        {Object.keys(state.cartItems).map((item, itemIndex) => {
          if (state.cartItems[item] === true) return (
            <Text key={itemIndex}>{item}</Text>
          )
        })}
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