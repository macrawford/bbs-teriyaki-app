import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidMount } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

// OUTANDING ERRORS
  // GYOZA COUNT RESETS TO 0 WHENEVER YOU GO BACK AND EDIT AN ORDER

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
  const [cartItems, setCart] = React.useState([{}]);
  const [gyozaCount, setGyoza] = React.useState(0);
  const [fountainDrink, setDrink] = React.useState(0);
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;
  var cart = Firebase.database().ref('users/' + userId + '/cart');
  // var addOns = 0;
  var subtotal = 0;
  // useEffect(() => {
  //   cart.once('value').then((snapshot) => {
  //     var cartData = snapshot.val();
  //     var arrayForm = [];
  //     arrayForm.push(cartData)
  //     console.log('arrayForm: ', arrayForm);
  //     console.log('cartdata[beefBrisket]: ', cartData['beefBrisket'])
  //     setState({
  //       cartItems: arrayForm
  //     })
  //   })
  // }, []);
  useEffect(() => {
    cart.on('value', (snapshot) => {
      var cartData = snapshot.val();
      var arrayForm = [];
      arrayForm.push(cartData)
      console.log('arrayForm: ', arrayForm);
      console.log('cartdata[beefBrisket]: ', cartData['beefBrisket'])
      setCart(arrayForm)
    });
    // if (Firebase.database().ref('users/' + userId + '/gyoza')) {
    //   console.log('Exists!')
    // }
    // if (Firebase.database().ref('users/' + userId + '/fountainDrinks')) {
    //   console.log('Exists!')
    // }
    Firebase.database().ref('users/' + userId + '/gyoza').on('value', (snapshot) => {
      var gyozaData = snapshot.val();
      if (gyozaData !== null) {
        console.log('gyozaData: ', gyozaData['gyozaCount'])
        setGyoza(gyozaData['gyozaCount'])
      }
    });
    Firebase.database().ref('users/' + userId + '/fountainDrinks').on('value', (snapshot) => {
      var fountainData = snapshot.val();
      if (fountainData !== null) {
        console.log('fountainData: ', fountainData['fountainDrink'])
        setDrink(fountainData['fountainDrink'])
      }
    });
  }, []);
  // useEffect(() => {
  //   Firebase.database().ref('users/' + userId + '/gyoza').update({
  //     gyozaCount
  //   })
  // }, [gyozaCount])
  // useEffect(() => {
  //   Firebase.database().ref('users/' + userId + '/fountainDrinks').update({
  //     fountainDrink
  //   })
  // }, [fountainDrink])
  function handleDelete(item) {
    Firebase.database().ref('users/' + userId + '/cart/' + item).remove();
  }
  function changeGyoza(change) {
    var newCount = gyozaCount + change
    Firebase.database().ref('users/' + userId + '/gyoza').update({
      gyozaCount: newCount
    });
    setGyoza(gyozaCount + change);
  }
  function changeDrink(change) {
    var newCount = fountainDrink + change
    Firebase.database().ref('users/' + userId + '/fountainDrinks').update({
      fountainDrink: newCount
    });
    setDrink(fountainDrink + change);
  }
  var conversion = {
    whiteRice: 'White Rice',
    brownRice: 'Brown Rice',
    yakisoba: 'Yakisoba',
    cabbageSalad: 'Cabbage Salad',
    veggieStirFry: 'Veggie Stir Fry',
    broccoli: 'Broccoli',
    mixedGreenSalad: 'Mixed Green Salad',
    spicyChicken: 'Spicy Chicken',
    regChicken: 'Regular Chicken',
    shreddedPork: 'Shredded Pork (+$1.00)',
    beefBrisket: 'Beef Brisket (+$3.00)',
    tofu: 'Tofu',
    regSauce: 'Regular Sauce',
    spicySauce: 'Spicy Sauce',
    noSauce: 'No Sauce',
    sideRegSauce: 'Side Regular Sauce',
    sideSpicySauce: 'Side Spicy Sauce',
    saladDressing: 'Salad Dressing',
    extraChicken: 'Extra Chicken (+$3.00)',
    extraPork: 'Extra Pork (+$3.00)',
    extraTofu: 'Extra Tofu (+$3.00)',
    extraBeef: 'Extra Beef (+$3.00)',
    // specialInstructions: specialInstructions
  }
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        {/* Rearrange this map function now that cartItems is objects inside of arrays
        Give each item in the cart an index - that index will be used when editing the cart - take that state and send it in params to the edit screen */}
        {cartItems.map((order, orderIndex) => {
          console.log('orderIndex: ', orderIndex)
          return (
            <View key={orderIndex}>
            {Object.keys(order).map((item, itemIndex) => {
              subtotal += 9;
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
                      if (indOrder === 'shreddedPork') {
                        subtotal += 1;
                      }
                      if (indOrder === 'beefBrisket' || indOrder === 'extraBeef' || indOrder === 'extraTofu' || indOrder === 'extraChicken' || indOrder === 'extraPork') {
                        subtotal += 3;
                      }
                      return (
                        <Text key={indOrderIndex}>{conversion[indOrder]}</Text>
                      )
                      // if (indOrder === 'whiteRice') {
                      //   return (
                      //     <Text key={indOrderIndex}>{converted[indOrder]}</Text>
                      //   )
                      // } else {
                      //   return (
                      //     <Text key={indOrderIndex}>{indOrder}</Text>
                      //   )
                      // }
                    }
                    if (indOrder === 'specialInstructions' && orderItems !== '') {
                      return (
                        <Text key={indOrderIndex}>Special Instructions: {orderItems}</Text>
                      )
                    }
                  })}
                  <View style={styles.editDelete}>
                  <Button title="Edit this order" onPress={() => {
                    navigation.navigate('Order', { order: order[item]['order'], id: item })
                  }}></Button>
                  <Button title="Delete this order" onPress={() => handleDelete(item)}></Button>
                  </View>
                </View>
              )
            })}
            </View>
          )
        })}
        <Text>{`Gyoza x ${gyozaCount} $${gyozaCount * 2}`}</Text>
        <Button title="+1" accessibilityLabel="Adds Gyoza" color="blue" onPress={() => changeGyoza(1)}></Button>
        {gyozaCount > 0 ? <Button title="-1" accessibilityLabel="Subtracts Gyoza" color="blue" onPress={() => changeGyoza(-1)}></Button> : null}
        <Text>{`Fountain drink x ${fountainDrink} $${fountainDrink * 2}`}</Text>
        <Button title="+1" accessibilityLabel="Adds Drink" color="blue" onPress={() => changeDrink(1)}></Button>
        {fountainDrink > 0 ? <Button title="-1" accessibilityLabel="Subtracts Drink" color="blue" onPress={() => changeDrink(-1)}></Button> : null}
      </View>
      <Text>{`Subtotal: $${subtotal + (gyozaCount * 2) + (fountainDrink * 2)}`}</Text>
      {/* <Button style={styles.button} title="Add Gyoza +$2.00" accessibilityLabel="Adds Gyoza" color="blue" onPress={() => changeGyoza(1)}/>
      <Button style={styles.button} title="Add Fountain Drink +$2.00" accessibilityLabel="Adds Fountain Drink" color="blue" onPress={() => changeDrink(1)}/> */}
      <Button style={styles.button} title="Add Another Order" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Order')}/>
      <Button style={styles.button} title="Proceed to Checkout" accessibilityLabel="Clicking this button will proceed to the checkout screen" color="blue" onPress={() => navigation.navigate('Checkout', { subtotal, gyozaCount, fountainDrink })}/>
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
  editDelete: {
  }
});

export default Cart;