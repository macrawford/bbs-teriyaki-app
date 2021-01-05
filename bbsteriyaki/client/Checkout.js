import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.ccHeader}>
        <AntDesign name="creditcard" size={48} color="black" />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.input}>
          <View style={styles.locationAndTotal}>
            <View>
              <View style={styles.locationLine}>
                <Text style={styles.chooseLocationText}>Click a Location </Text>
                <Entypo name="location-pin" size={32} color="black" />
              </View>
              <View style={styles.indLocation}>
                {slu || downtown ? <Text style={styles.grayedOut}>4221 University Way NE Seattle, WA 98112</Text> : <Text style={styles.nonGray} onPress={() => handlePress(ave, setAve)}>4221 University Way NE Seattle, WA 98112</Text>}
              </View>
              <View style={styles.indLocation}>
                {slu || ave ? <Text style={styles.grayedOut}>1111 3rd Ave Seattle, WA 98101</Text> : <Text style={styles.nonGray} onPress={() => handlePress(downtown, setDowntown)}>1111 3rd Ave Seattle, WA 98101</Text>}
              </View>
              <View style={styles.indLocationLast}>
                {downtown || ave ? <Text style={styles.grayedOut}>210 Westlake Ave N Seattle, WA 98109</Text> : <Text style={styles.nonGray} onPress={() => handlePress(slu, setSlu)}>210 Westlake Ave N Seattle, WA 98109</Text>}
              </View>
            </View>
            <View style={styles.rewardsDiv}>
              {rewardCount >= 10 ? <Text style={styles.rewards} onPress={useRewards}>Use Rewards</Text> : null}
            </View>
            <View style={styles.totalsDiv}>
              <View style={styles.indTotalDiv}>
                <Text style={styles.totalsFont}>Subtotal: </Text>
                <Text style={styles.totalsNum}>{`$${subtotal}`}</Text>
              </View>
              <View style={styles.indTotalDiv}>
                <Text style={styles.totalsFont}>Tax: </Text>
                <Text style={styles.totalsNum}>{`$${rounded}`}</Text>
              </View>
              <View style={styles.indTotalDiv}>
                <Text style={styles.totalsFont}>Total: </Text>
                <Text style={styles.totalsNum}>{`$${total}`}</Text>
              </View>
            </View>
          </View>
          <View>
            <TextInput type="text" name="creditCardNum" style={styles.inputBox} placeholder="Credit Card Number" onChangeText={(e) => handleChangeCc(e)}></TextInput>
            <TextInput type="text" name="expiration" style={styles.inputBox} placeholder="Expiration" onChangeText={(e) => handleChangeExp(e)}></TextInput>
            <TextInput type="text" name="securityCode" style={styles.inputBox} placeholder="Security Code" onChangeText={(e) => handleChangeCode(e)}></TextInput>
            <TextInput type="text" name="billingAddress" style={styles.billAdd} placeholder="Billing Address" onChangeText={(e) => handleChangeBillAdd(e)}></TextInput>
          </View>
        </View>
        <View>
          <Button style={styles.button} title="Return to Cart" accessibilityLabel="Clicking this button will return to the cart screen" color="red" onPress={() => navigation.navigate('Cart')}/>
          {(ave || downtown || slu) && (cc !== '') && (exp !== '') && (secCode !== '') && (billingAddress !== '') ? <Button style={styles.button} title="Submit Order" accessibilityLabel="Clicking this button will submit the order" color="red" onPress={handleSubmit}/> : <Button style={styles.button} title="Submit Order" accessibilityLabel="Add a location before moving on!" color="gray"/>}
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  ccHeader: {
    flexDirection: 'column',
    backgroundColor: 'gainsboro',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 16,
  },
  indLocation: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'silver'
  },
  indLocationLast: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  locationAndTotal: {
    paddingTop: 25
  },
  locationLine: {
    flexDirection: 'row',
    paddingBottom: 15
  },
  totalsDiv: {
    paddingBottom: 20
  },
  indTotalDiv: {
    flexDirection: 'row',
    paddingBottom: 6
  },
  totalsFont: {
    fontFamily: 'Helvetica',
    fontWeight: '600',
    fontSize: 20
  },
  totalsNum: {
    fontFamily: 'Helvetica',
    fontSize: 20
  },
  subContainer: {
    marginLeft: 20,
    marginRight: 20
  },
  chooseLocationText: {
    fontFamily: 'Helvetica',
    fontSize: 28,
    fontWeight: '400'
  },
  input: {
    flexDirection: 'column',
    flex: 1
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  },
  grayedOut: {
    color: 'silver',
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '300'
  },
  nonGray: {
    color: 'black',
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: '400'
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 250,
    height: 40,
    marginBottom: 5
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
    fontWeight: '500',
    fontFamily: 'Helvetica'
  },
  rewardsDiv: {
    paddingBottom: 15,
    paddingTop: 5,
    alignItems: 'center'
  }
});

export default Checkout;