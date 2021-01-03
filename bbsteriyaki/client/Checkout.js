import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

function Checkout({ navigation, route }) {
  console.log('route.params: ', route.params)
  const [ave, setAve] = React.useState(false);
  const [slu, setSlu] = React.useState(false);
  const [downtown, setDowntown] = React.useState(false)

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
  return (
    // LOOK FOR REWARDS!!!
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.font}>THIS IS THE CHECKOUT PAGE</Text>
        <View>
        <Text>Pick a Location:</Text>
        {slu || downtown ? <Text style={styles.grayedOut}>Location: 4221 University Way NE Seattle, WA 98112</Text> : <Text onPress={() => handlePress(ave, setAve)}>Location: 4221 University Way NE Seattle, WA 98112</Text>}
        {slu || ave ? <Text style={styles.grayedOut}>Location: 1111 3rd Ave Seattle, WA 98101</Text> : <Text onPress={() => handlePress(downtown, setDowntown)}>Location: 1111 3rd Ave Seattle, WA 98101</Text>}
        {downtown || ave ? <Text style={styles.grayedOut}>Location: 210 Westlake Ave N Seattle, WA 98109</Text> : <Text onPress={() => handlePress(slu, setSlu)}>Location: 210 Westlake Ave N Seattle, WA 98109</Text>}
        </View>
        <Text>{`Subtotal: $${subtotal}`}</Text>
        <Text>{`Tax: $${rounded}`}</Text>
        <Text>{`Total: $${total}`}</Text>
      </View>
      <Button style={styles.button} title="Return to Cart" accessibilityLabel="Clicking this button will return to the cart screen" color="blue" onPress={() => navigation.navigate('Cart')}/>
      <Button style={styles.button} title="Submit Order" accessibilityLabel="Clicking this button will submit the order" color="blue" onPress={() => navigation.navigate('Login')}/>
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
  grayedOut: {
    color: 'gray'
  }
});

export default Checkout;