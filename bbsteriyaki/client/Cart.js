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
  // Probably necessitates route params that you pass on navigation
// Allow adding of more orders (will need to reset the previous screen somehow - create )
// Set up security rules so people can only access the info in their cart
  // I think these items both need a database involved

function Cart({ route, navigation}) {
  // const { order } = route.params;
  // const orders = [];
  // orders.push(JSON.stringify(order))
  // console.log('ORDER: ', orders)
  const [state, setState] = React.useState({
    cartItems: [{}]
  });
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;
  var cart = Firebase.database().ref('users/' + userId + '/cart');
  useEffect(() => {
    cart.once('value').then((snapshot) => {
      var cartData = snapshot.val();
      var arrayForm = [];
      arrayForm.push(cartData)
      console.log('arrayForm: ', arrayForm);
      console.log('cartdata[beefBrisket]: ', cartData['beefBrisket'])
      setState({
        cartItems: arrayForm
      })
    })
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        {/* Rearrange this map function now that cartItems is objects inside of arrays
        Give each item in the cart an index - that index will be used when editing the cart - take that state and send it in params to the edit screen */}
        {state.cartItems.map((order, orderIndex) => {
          console.log('orderIndex: ', orderIndex)
          return (
            <View key={orderIndex}>
            {Object.keys(order).map((item, itemIndex) => {
              // console.log('object.keys: ', Object.keys(order))
              // console.log('order first time thru: ', order)
              // console.log('item: ', item)
              // console.log('order at item (first time thru): ', order[item])
              // Figure out which variable is the push ID (MQ3a4L...)
              // Make that the index instead of item index
              // pass state at that order at 'order' in the navigation
              return (
                <View key={item}>
                  <Text>BYO: </Text>
                  {/* <Text>{order[item]['order']['beefBrisket']}</Text> */}
                  {Object.keys(order[item]['order']).map((indOrder, indOrderIndex) => {
                    // console.log('object.keys: ', Object.keys(order[item]))
                    // console.log('order: ', order[item]['order'])
                    // console.log('item: ', indOrder)
                    // console.log('order at item: ', order[item]['order'][indOrder])
                    // console.log('state.cartItems', state.cartItems)
                    var orderItems = order[item]['order'][indOrder];
                    if (orderItems === true) {
                      return (
                        <Text key={indOrderIndex}>{indOrder}</Text>
                      )
                    }
                  })}
                  <Button title="Edit this order" onPress={() => {
                    navigation.navigate('Order', { order: order[item]['order'], id: item })
                  }}></Button>
                </View>
              )
            })}
            </View>
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