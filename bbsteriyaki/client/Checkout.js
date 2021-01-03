import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';

// OUTSTANDING ISSUES
  // ADD A DATE/TIME PICKER TO CHOOSE A TIME FOR PICKUP

function Checkout({ navigation, route }) {
  console.log('route.params: ', route.params)
  const [ave, setAve] = React.useState(false);
  const [slu, setSlu] = React.useState(false);
  const [downtown, setDowntown] = React.useState(false);
  const [cc, setCc] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [secCode, setCode] = React.useState('');
  const [billingAddress, setBillingAdd] = React.useState('');

  var meals = route.params.subtotal;
  var gyoza = route.params.gyozaCount;
  var drinks = route.params.fountainDrink;
  var subtotal = (meals + (gyoza * 2) + (drinks * 2)).toFixed(2);
  var tax = subtotal *  0.101;
  var rounded = tax.toFixed(2);
  var total = Number(subtotal) + Number(rounded);
  function handlePress(location, stateFunction) {
    stateFunction(!location)
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
  return (
    // LOOK FOR REWARDS!!!
    <ScrollView>
      <View style={styles.input}>
        <View>
          <Text style={styles.font}>THIS IS THE CHECKOUT PAGE</Text>
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
          <TextInput type="text" name="creditCardNum" style={styles.input} placeholder="Credit Card Number" onChangeText={(e) => handleChangeCc(e)}></TextInput>
          <TextInput type="text" name="expiration" style={styles.input} placeholder="Expiration" onChangeText={(e) => handleChangeExp(e)}></TextInput>
          <TextInput type="text" name="securityCode" style={styles.input} placeholder="Security Code" onChangeText={(e) => handleChangeCode(e)}></TextInput>
          <TextInput type="text" name="billingAddress" style={styles.billAdd} placeholder="Billing Address" onChangeText={(e) => handleChangeBillAdd(e)}></TextInput>
        </View>
      </View>
      <View>
      <Button style={styles.button} title="Return to Cart" accessibilityLabel="Clicking this button will return to the cart screen" color="blue" onPress={() => navigation.navigate('Cart')}/>
      {(ave || downtown || slu) && (cc !== '') && (exp !== '') && (secCode !== '') && (billingAddress !== '') ? <Button style={styles.button} title="Submit Order" accessibilityLabel="Clicking this button will submit the order" color="blue" onPress={() => navigation.navigate('Confirmation', {ave: ave, slu: slu, downtown: downtown})}/> : <Button style={styles.button} title="Submit Order" accessibilityLabel="Add a location before moving on!" color="gray"/>}
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
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 125,
  },
  font: {
    fontFamily: 'Helvetica-BoldOblique',
  },
  grayedOut: {
    color: 'gray'
  },
  input: {
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
});

export default Checkout;