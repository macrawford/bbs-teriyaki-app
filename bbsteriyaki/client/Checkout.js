import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

// OUTSTANDING ISSUES
  // ADD A DATE/TIME PICKER TO CHOOSE A TIME FOR PICKUP
  // CART NOT BEING EMPTIED UPON ORDER SUBMISSION

function Checkout({ navigation, route }) {
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;

  console.log('route.params: ', route.params)
  const [ave, setAve] = React.useState(false);
  const [slu, setSlu] = React.useState(false);
  const [downtown, setDowntown] = React.useState(false);
  const [cc, setCc] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [secCode, setCode] = React.useState('');
  const [billingAddress, setBillingAdd] = React.useState('');
  const [rewardCount, setRewards] = React.useState(0);
  const [rewardsUsed, setRewardsUsed] = React.useState(0);

  var meals = route.params.subtotal;
  var gyoza = route.params.gyozaCount;
  var drinks = route.params.fountainDrink;
  var byo = route.params.byo
  var subtotal = ((meals + (gyoza * 2) + (drinks * 2)).toFixed(2)) - (rewardsUsed * 9);
  var tax = subtotal *  0.101;
  var rounded = tax.toFixed(2);
  var total = Number(subtotal) + Number(rounded);

  function handlePress(location, stateFunction) {
    stateFunction(!location)
  }

  var rewardPath = Firebase.database().ref('users/' + userId + '/rewardCount');
  useEffect(() => {
    rewardPath.once('value').then((snapshot) => {
      var rewards = snapshot.val();
      setRewards(rewards)
    })
  }, [])
  function useRewards() {
    // OKAY SO USE REWARDS IS KIND OF WORKING BUT THE SUBTOTAL ON THE SCREEN DOESN'T ACTUALLY GET UPDATED
    // THIS IS BECAUSE THE SUBTOTAL VARIABLE IS REFRESHED EVERYTIME A SETSTATE IS RUN
    subtotal -= 9;
    console.log('subtotal: ', subtotal)
    setRewardsUsed(rewardsUsed + 1)
    setRewards(rewardCount - 9)
  }
  function handleChangeCc(e) {
    const value = e;
    setCc(value);
    // stateFunction(value)
  };
  function handleChangeExp(e) {
    const value = e;
    setExp(value);
    // stateFunction(value)
  };
  function handleChangeCode(e) {
    const value = e;
    setCode(value);
    // stateFunction(value)
  };
  function handleChangeBillAdd(e) {
    const value = e;
    setBillingAdd(value);
    // stateFunction(value)
  };
  function handleSubmit() {
    Firebase.database().ref('users/' + userId).update({
      rewardCount: rewardCount + byo
    })
    // Firebase.database().ref('users/' + userId + '/cart/').remove();
    // ^Removing because it screws up the cart screen, I think because it is listening for changes to cart and when the cart gets removed it screws up the whole screen and throws error
    Firebase.database().ref('users/' + userId + '/fountainDrinks/').remove();
    Firebase.database().ref('users/' + userId + '/gyoza/').remove();

    // firebase.database()
    // .ref('users')
    // .child(userId)
    // .child('rewardCount')
    // .set(firebase.database.ServerValue.increment(1))
    navigation.navigate('Confirmation', {ave: ave, slu: slu, downtown: downtown, rewardCount: rewardCount, byo: byo})
  }
  return (
    // LOOK FOR REWARDS!!!
    <ScrollView>
      <View style={styles.input}>
        <View>
        </View>
        <View>
          <Text>Pick a Location:</Text>
          {slu || downtown ? <Text style={styles.grayedOut}>Location: 4221 University Way NE Seattle, WA 98112</Text> : <Text onPress={() => handlePress(ave, setAve)}>Location: 4221 University Way NE Seattle, WA 98112</Text>}
          {slu || ave ? <Text style={styles.grayedOut}>Location: 1111 3rd Ave Seattle, WA 98101</Text> : <Text onPress={() => handlePress(downtown, setDowntown)}>Location: 1111 3rd Ave Seattle, WA 98101</Text>}
          {downtown || ave ? <Text style={styles.grayedOut}>Location: 210 Westlake Ave N Seattle, WA 98109</Text> : <Text onPress={() => handlePress(slu, setSlu)}>Location: 210 Westlake Ave N Seattle, WA 98109</Text>}
        </View>
        <View>
          <Text>{`Subtotal: $${subtotal}`}</Text>
          <Text>{`Tax: $${rounded}`}</Text>
          <Text>{`Total: $${total}`}</Text>
        </View>
        <View>
          <TextInput type="text" name="creditCardNum" style={styles.inputBox} placeholder="Credit Card Number" onChangeText={(e) => handleChangeCc(e)}></TextInput>
          <TextInput type="text" name="expiration" style={styles.inputBox} placeholder="Expiration" onChangeText={(e) => handleChangeExp(e)}></TextInput>
          <TextInput type="text" name="securityCode" style={styles.inputBox} placeholder="Security Code" onChangeText={(e) => handleChangeCode(e)}></TextInput>
          <TextInput type="text" name="billingAddress" style={styles.billAdd} placeholder="Billing Address" onChangeText={(e) => handleChangeBillAdd(e)}></TextInput>
        </View>
      </View>
      <View>
        {rewardCount >= 10 ? <Text style={styles.rewards} onPress={useRewards}>Use Rewards??</Text> : null}
      <Button style={styles.button} title="Return to Cart" accessibilityLabel="Clicking this button will return to the cart screen" color="blue" onPress={() => navigation.navigate('Cart')}/>
      {(ave || downtown || slu) && (cc !== '') && (exp !== '') && (secCode !== '') && (billingAddress !== '') ? <Button style={styles.button} title="Submit Order" accessibilityLabel="Clicking this button will submit the order" color="blue" onPress={handleSubmit}/> : <Button style={styles.button} title="Submit Order" accessibilityLabel="Add a location before moving on!" color="gray"/>}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'column',
    flex: 1
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  },
  grayedOut: {
    color: 'gray'
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 250,
    height: 40
  },
  billAdd: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 250,
    height: 80
  },
  rewards: {
    fontSize: 24,
    color: 'green',
    margin: 30
  }
});

export default Checkout;