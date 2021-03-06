import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidMount } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

function Cart({ route, navigation}) {
  const [cartItems, setCart] = React.useState([{}]);
  const [gyozaCount, setGyoza] = React.useState(0);
  const [fountainDrink, setDrink] = React.useState(0);
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;
  var cart = Firebase.database().ref('users/' + userId + '/cart');
  var subtotal = 0;
  var byo = 0;

  useEffect(() => {
    cart.on('value', (snapshot) => {
      var cartData = snapshot.val();
      var arrayForm = [];
      arrayForm.push(cartData)
      setCart(arrayForm)
    });

    Firebase.database().ref('users/' + userId + '/gyoza').on('value', (snapshot) => {
      var gyozaData = snapshot.val();
      if (gyozaData !== null) {
        setGyoza(gyozaData['gyozaCount'])
      }
    });
    Firebase.database().ref('users/' + userId + '/fountainDrinks').on('value', (snapshot) => {
      var fountainData = snapshot.val();
      if (fountainData !== null) {
        setDrink(fountainData['fountainDrink'])
      }
    });
  }, []);

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
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartHeader}>
        <Ionicons name="cart-outline" size={48} color="black" />
      </View>
      <View style={styles.input}>
        {cartItems.map((order, orderIndex) => {
          return (
            <View style={styles.orderContainer} key={orderIndex}>
            {Object.keys(order).map((item, itemIndex) => {
              subtotal += 9;
              byo += 1;
              return (
                <View style={styles.orderMargin} key={item}>
                  <View style={styles.byoDiv}>
                    <Text style={styles.byoText}>BYO: $9</Text>
                  </View>
                  <View style={styles.ingredientsDiv}>
                  {Object.keys(order[item]['order']).map((indOrder, indOrderIndex) => {
                    var orderItems = order[item]['order'][indOrder];
                    if (orderItems === true) {
                      if (indOrder === 'shreddedPork') {
                        subtotal += 1;
                      }
                      if (indOrder === 'beefBrisket' || indOrder === 'extraBeef' || indOrder === 'extraTofu' || indOrder === 'extraChicken' || indOrder === 'extraPork') {
                        subtotal += 3;
                      }
                      return (
                        <Text style={styles.indIngredient} key={indOrderIndex}>{conversion[indOrder]}</Text>
                      )
                    }
                    if (indOrder === 'specialInstructions' && orderItems !== '') {
                      return (
                        <Text style={styles.specialInstructions} key={indOrderIndex}>Special Instructions: {orderItems}</Text>
                      )
                    }
                  })}
                  </View>
                  <View style={styles.editDelete}>
                    <AntDesign name="delete" size={32} color="red" onPress={() => handleDelete(item)}/>
                    <FontAwesome style={styles.editIcon} name="edit" size={32} color="black" onPress={() => {
                      navigation.navigate('Order', { order: order[item]['order'], id: item })
                    }}/>
                  </View>
                </View>
              )
            })}
            </View>
          )
        })}
        <View style={styles.orderMargin}>
          <View style={styles.byoDiv}>
            <Text style={styles.gyozaText}>{`Gyoza x ${gyozaCount}: $${gyozaCount * 2}`}</Text>
            <View style={styles.editDelete}>
              <AntDesign style={styles.add} name="pluscircleo" size={28} color="black" title="+1" accessibilityLabel="Adds Gyoza" onPress={() => changeGyoza(1)}/>
              {gyozaCount > 0 ? <AntDesign style={styles.subtract} name="minuscircleo" size={28} color="black" title="-1" accessibilityLabel="Subtracts Gyoza" onPress={() => changeGyoza(-1)}/> : null}
            </View>
          </View>
          <View style={styles.byoDiv}>
            <Text style={styles.gyozaText}>{`Fountain drink x ${fountainDrink}: $${fountainDrink * 2}`}</Text>
            <View style={styles.editDelete}>
            <AntDesign style={styles.add} name="pluscircleo" size={28} color="black" title="+1" accessibilityLabel="Adds Drink" onPress={() => changeDrink(1)}/>
              {fountainDrink > 0 ? <AntDesign style={styles.subtract} name="minuscircleo" size={28} color="black" title="-1" accessibilityLabel="Subtracts drink" onPress={() => changeDrink(-1)}/> : null}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.orderMargin}>
        <View style={styles.byoDiv}>
          <Text style={styles.subtotalText}>{`Subtotal: $${subtotal + (gyozaCount * 2) + (fountainDrink * 2)}`}</Text>
        </View>
      </View>
      <Button style={styles.button} title="Add Another Order" accessibilityLabel="Clicking this button will add another order" color="red" onPress={() => navigation.navigate('Order', {
        order: {
          beefBrisket: false,
          broccoli: false,
          brownRice: false,
          cabbageSalad: false,
          extraBeef: false,
          extraChicken: false,
          extraPork: false,
          extraTofu: false,
          mixedGreenSalad: false,
          noSauce: false,
          regChicken: false,
          regSauce: false,
          saladDressing: false,
          shreddedPork: false,
          sideRegSauce: false,
          sideSpicySauce: false,
          specialInstructions: "",
          spicyChicken: false,
          spicySauce: false,
          tofu: false,
          veggieStirFry: false,
          whiteRice: false,
          yakisoba: false,
          baseCounter: 0,
          sauceCounter: 0,
          proteinCounter: 0,
          extraCounter: 0
        },
        id: 'new'
        })}/>
      <Button style={styles.button} title="Proceed to Checkout" accessibilityLabel="Clicking this button will proceed to the checkout screen" color="red" onPress={() => navigation.navigate('Checkout', { subtotal, gyozaCount, fountainDrink, byo })}/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  byoText: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    fontWeight: '600'
  },
  gyozaText: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    fontWeight: '500'
  },
  subtotalText: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    fontWeight: '400'
  },
  byoDiv : {
    paddingBottom: 8
  },
  cartHeader: {
    flexDirection: 'column',
    backgroundColor: 'gainsboro',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
  },
  cartText: {
    fontSize: 32,
  },
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  editIcon: {
    paddingTop: 2,
    paddingLeft: 15
  },
  add: {
    paddingTop: 8,
    paddingLeft: 30
  },
  subtract: {
    paddingTop: 8,
    paddingLeft: 15
  },
  indIngredient: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '300'
  },
  ingredientsDiv: {
    paddingBottom: 10
  },
  specialInstructions: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '500',
    color: 'orange'
  },
  editDelete: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  },
  orderContainer: {
  },
  orderMargin: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    width: '100%'
  },
});

export default Cart;