import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, CheckBox, Pressable } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

// OUTANDING ERRORS
  // YOU ARE ALLOWED TO SELECT NO SAUCE AND OTHER SAUCES - YOU SHOULD NOT BE ABLE TO DO THAT

function Order({ navigation, route }) {
  var database = Firebase.database();
  var id;
  if (route.params) {
    id = route.params.id;
  } else {
    id = 0;
  }
  // ^ This is used for the useEffect function

  const [whiteRice, setWhiteRice] = React.useState(false);
  const [brownRice, setBrownRice] = React.useState(false);
  const [yakisoba, setYakisoba] = React.useState(false);
  const [cabbageSalad, setCabbageSalad] = React.useState(false);
  const [veggieStirFry, setVeggieStirFry] = React.useState(false);
  const [broccoli, setBroccoli] = React.useState(false);
  const [mixedGreenSalad, setMixedGreenSalad] = React.useState(false);
  const [baseCounter, setBaseCounter] = React.useState(0);

  const [spicyChicken, setSpicyChicken] = React.useState(false);
  const [regChicken, setRegChicken] = React.useState(false);
  const [shreddedPork, setShreddedPork] = React.useState(false);
  const [beefBrisket, setBeefBrisket] = React.useState(false);
  const [tofu, setTofu] = React.useState(false);
  const [proteinCounter, setProteinCounter] = React.useState(0);

  const [regSauce, setRegSauce] = React.useState(false);
  const [spicySauce, setSpicySauce] = React.useState(false);
  const [noSauce, setNoSauce] = React.useState(false);
  const [sideRegSauce, setSideRegSauce] = React.useState(false);
  const [sideSpicySauce, setSideSpicySauce] = React.useState(false);
  const [saladDressing, setSaladDressing] = React.useState(false);
  const [sauceCounter, setSauceCounter] = React.useState(0);

  const [extraChicken, setExtraChicken] = React.useState(false);
  const [extraPork, setExtraPork] = React.useState(false);
  const [extraTofu, setExtraTofu] = React.useState(false);
  const [extraBeef, setExtraBeef] = React.useState(false);
  const [extraCounter, setExtraCounter] = React.useState(0);

  const [specialInstructions, setSpecialInstructions] = React.useState('');

  var order = {
    // Can also pass through as a straight object - not sure what will be easier to parse
    whiteRice: whiteRice,
    brownRice: brownRice,
    yakisoba: yakisoba,
    cabbageSalad: cabbageSalad,
    veggieStirFry: veggieStirFry,
    broccoli: broccoli,
    mixedGreenSalad: mixedGreenSalad,
    spicyChicken: spicyChicken,
    regChicken: regChicken,
    shreddedPork: shreddedPork,
    beefBrisket: beefBrisket,
    tofu: tofu,
    regSauce: regSauce,
    spicySauce: spicySauce,
    noSauce: noSauce,
    sideRegSauce: sideRegSauce,
    sideSpicySauce: sideSpicySauce,
    saladDressing: saladDressing,
    extraChicken: extraChicken,
    extraPork: extraPork,
    extraTofu: extraTofu,
    extraBeef: extraBeef,
    specialInstructions: specialInstructions
  }

  useEffect(() => {
    console.log('route params: ');
    if (route.params) {
      setWhiteRice(route.params.order['whiteRice'])
      setBrownRice(route.params.order['brownRice'])
      setYakisoba(route.params.order['yakisoba'])
      setCabbageSalad(route.params.order['cabbageSalad'])
      setVeggieStirFry(route.params.order['veggieStirFry'])
      setBroccoli(route.params.order['broccoli'])
      setMixedGreenSalad(route.params.order['mixedGreenSalad'])
      setSpicyChicken(route.params.order['spicyChicken'])
      setRegChicken(route.params.order['regChicken'])
      setShreddedPork(route.params.order['shreddedPork'])
      setBeefBrisket(route.params.order['beefBrisket'])
      setTofu(route.params.order['tofu'])
      setRegSauce(route.params.order['regSauce'])
      setSpicySauce(route.params.order['spicySauce'])
      setNoSauce(route.params.order['noSauce'])
      setSideRegSauce(route.params.order['sideRegSauce'])
      setSideSpicySauce(route.params.order['sideSpicySauce'])
      setSaladDressing(route.params.order['saladDressing'])
      setExtraChicken(route.params.order['extraChicken'])
      setExtraPork(route.params.order['extraPork'])
      setExtraTofu(route.params.order['extraTofu'])
      setExtraBeef(route.params.order['extraBeef'])
      setSpecialInstructions(route.params.order['specialInstructions'])
    }
  }, [id]);

  function handlePress(item, stateFunction, max, counter, counterFunction) {
    if (item) {
      stateFunction((!item));
      counterFunction(counter - 1)
    } else {
      if (counter >= max) {
        if (max === 1) {
          alert(`Only ${max} selection allowed`)
        } else {
          alert(`Only ${max} selections allowed`)
        }
      } else {
        stateFunction((!item));
        counterFunction(counter + 1)
      }
    }
  }
  function handleChange(e) {
    const value = e.target.value;
    setSpecialInstructions(value)
  }

  function reinitializeState() {
    setWhiteRice(false)
    setBrownRice(false)
    setYakisoba(false)
    setCabbageSalad(false)
    setVeggieStirFry(false)
    setBroccoli(false)
    setMixedGreenSalad(false)
    setSpicyChicken(false)
    setRegChicken(false)
    setShreddedPork(false)
    setBeefBrisket(false)
    setTofu(false)
    setRegSauce(false)
    setSpicySauce(false)
    setNoSauce(false)
    setSideRegSauce(false)
    setSideSpicySauce(false)
    setSaladDressing(false)
    setExtraChicken(false)
    setExtraPork(false)
    setExtraTofu(false)
    setExtraBeef(false)
    setSpecialInstructions('')
    setBaseCounter(0)
    setProteinCounter(0)
    setSauceCounter(0)
    setExtraCounter(0)
  }

  var userId = Firebase.auth().currentUser.uid

  function handleSubmit() {
    // WILL NEED A CONDITIONAL ABOUT IF ROUTE.PARAMS.ID EXISTS => GO TO THAT ROUTE AND UPDATE, NOT PUSH
    if (route.params) {
      Firebase.database().ref('users/' + userId + '/cart/' + route.params.id).update({
        order
      })
    } else {
      Firebase.database().ref('users/' + userId + '/cart').push({
        order
      })
    }
    navigation.navigate('Cart');
    reinitializeState();
  }
    return (
      <ScrollView>
        {/* Need to style it differently than container? */}
        <View style={styles.choices} title="Base">
          <View style={styles.selectionHeader}>
            <Text></Text>
            <Text>Step 1: Base (Choose Up To 3)</Text>
            <Text>Please choose 1 and up to 3</Text>
            <Text>
              {`${brownRice || whiteRice || yakisoba || cabbageSalad || veggieStirFry || broccoli || mixedGreenSalad ? 'Good to Go' : 'Required'} `}
              {/* CHANGE GOOD TO GO TO A CHECKMARK LOGO OR SOMETHING COOL?? */}
            </Text>
          </View>
          <Text style={ (whiteRice) ? styles.selected : styles.notSelected} onPress={() => handlePress(whiteRice, setWhiteRice, 3, baseCounter, setBaseCounter)}>
            {`White rice: ${whiteRice ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (brownRice) ? styles.selected : styles.notSelected} onPress={() => handlePress(brownRice, setBrownRice, 3, baseCounter, setBaseCounter)}>
            {`Brown rice: ${brownRice ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (yakisoba) ? styles.selected : styles.notSelected} onPress={() => handlePress(yakisoba, setYakisoba, 3, baseCounter, setBaseCounter)}>
            {`Yakisoba: ${yakisoba ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (cabbageSalad) ? styles.selected : styles.notSelected} onPress={() => handlePress(cabbageSalad, setCabbageSalad, 3, baseCounter, setBaseCounter)}>
            {`Cabbage Salad: ${cabbageSalad ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (veggieStirFry) ? styles.selected : styles.notSelected} onPress={() => handlePress(veggieStirFry, setVeggieStirFry, 3, baseCounter, setBaseCounter)}>
            {`Veggie Stir Fry: ${veggieStirFry ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (broccoli) ? styles.selected : styles.notSelected} onPress={() => handlePress(broccoli, setBroccoli, 3, baseCounter, setBaseCounter)}>
            {`Broccoli: ${broccoli ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (mixedGreenSalad) ? styles.selected : styles.notSelected} onPress={() => handlePress(mixedGreenSalad, setMixedGreenSalad, 3, baseCounter, setBaseCounter)}>
            {`Mixed Green Salad: ${mixedGreenSalad ? 'Selected' : 'Not Selected'}`}
          </Text>
        </View>
        <View style={styles.choices} title="Protein">
          <View style={styles.selectionHeader}>
            <Text>Step 2: Protein (Choose Up To 2)</Text>
            <Text>Please choose 1 and up to 2</Text>
            <Text>
              {`${spicyChicken || regChicken || shreddedPork || beefBrisket || tofu ? 'Good to Go' : 'Required'} `}
              {/* CHANGE GOOD TO GO TO A CHECKMARK LOGO OR SOMETHING COOL?? */}
            </Text>
          </View>
          <Text style={ (spicyChicken) ? styles.selected : styles.notSelected} onPress={() => handlePress(spicyChicken, setSpicyChicken, 2, proteinCounter, setProteinCounter)}>
            {`Spicy Chicken: ${spicyChicken ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (regChicken) ? styles.selected : styles.notSelected} onPress={() => handlePress(regChicken, setRegChicken, 2, proteinCounter, setProteinCounter)}>
            {`Regular Chicken: ${regChicken ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (shreddedPork) ? styles.selected : styles.notSelected} onPress={() => handlePress(shreddedPork, setShreddedPork, 2, proteinCounter, setProteinCounter)}>
            {`Shredded Pork: ${shreddedPork ? 'Selected (+$1.00)' : 'Not Selected (+$1.00)'}`}
          </Text>
          <Text style={ (beefBrisket) ? styles.selected : styles.notSelected} onPress={() => handlePress(beefBrisket, setBeefBrisket, 2, proteinCounter, setProteinCounter)}>
            {`Beef Brisket: ${beefBrisket ? 'Selected (+$3.00)' : 'Not Selected (+$3.00)'}`}
          </Text>
          <Text style={ (tofu) ? styles.selected : styles.notSelected} onPress={() => handlePress(tofu, setTofu, 2, proteinCounter, setProteinCounter)}>
            {`Tofu: ${tofu ? 'Selected' : 'Not Selected'}`}
          </Text>
        </View>
        <View style={styles.choices} title="Sauce">
          <View style={styles.selectionHeader}>
            <Text>Step 3: Sauce (Choose Up To 2)</Text>
            <Text>Please choose 1 and up to 2</Text>
            <Text>
              {`${regSauce || spicySauce || noSauce || sideRegSauce || sideSpicySauce || saladDressing ? 'Good to Go' : 'Required'} `}
              {/* CHANGE GOOD TO GO TO A CHECKMARK LOGO OR SOMETHING COOL?? */}
            </Text>
          </View>
          <Text style={ (regSauce) ? styles.selected : styles.notSelected} onPress={() => handlePress(regSauce, setRegSauce, 2, sauceCounter, setSauceCounter)}>
            {`Regular Sauce: ${regSauce ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (spicySauce) ? styles.selected : styles.notSelected} onPress={() => handlePress(spicySauce, setSpicySauce, 2, sauceCounter, setSauceCounter)}>
            {`Spicy Sauce: ${spicySauce ? 'Selected' : 'Not Selected '}`}
          </Text>
          <Text style={ (noSauce) ? styles.selected : styles.notSelected} onPress={() => handlePress(noSauce, setNoSauce, 2, sauceCounter, setSauceCounter)}>
            {`No Sauce: ${noSauce ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (sideRegSauce) ? styles.selected : styles.notSelected} onPress={() => handlePress(sideRegSauce, setSideRegSauce, 2, sauceCounter, setSauceCounter)}>
            {`Regular Sauce on Side: ${sideRegSauce ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (sideSpicySauce) ? styles.selected : styles.notSelected} onPress={() => handlePress(sideSpicySauce, setSideSpicySauce, 2, sauceCounter, setSauceCounter)}>
            {`Spicy Sauce on Side: ${sideSpicySauce ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (saladDressing) ? styles.selected : styles.notSelected} onPress={() => handlePress(saladDressing, setSaladDressing, 2, sauceCounter, setSauceCounter)}>
            {`Salad Dressing on Side: ${saladDressing ? 'Selected' : 'Not Selected'}`}
          </Text>
        </View>
        <View style={styles.choices} title="Extras">
          <View style={styles.selectionHeader}>
            <Text>Step 4: Extras</Text>
            <Text>Choose up to 1</Text>
          </View>
          <Text style={ (extraChicken) ? styles.selected : styles.notSelected} onPress={() => handlePress(extraChicken, setExtraChicken, 1, extraCounter, setExtraCounter)}>
            {`Extra Chicken: ${extraChicken ? 'Selected (+$3.00)' : 'Not Selected (+$3.00)'}`}
          </Text>
          <Text style={ (extraPork) ? styles.selected : styles.notSelected} onPress={() => handlePress(extraPork, setExtraPork, 1, extraCounter, setExtraCounter)}>
          { `Extra Pork: ${extraPork ? 'Selected (+$3.00)' : 'Not Selected (+$3.00)'}`}
          </Text>
          <Text style={ (extraTofu) ? styles.selected : styles.notSelected} onPress={() => handlePress(extraTofu, setExtraTofu, 1, extraCounter, setExtraCounter)}>
            {`Extra Tofu: ${extraTofu ? 'Selected (+$3.00)' : 'Not Selected (+$3.00)'}`}
          </Text>
          <Text style={ (extraBeef) ? styles.selected : styles.notSelected} onPress={() => handlePress(extraBeef, setExtraBeef, 1, extraCounter, setExtraCounter)}>
            {`Extra Beef: ${extraBeef ? 'Selected (+$3.00)' : 'Not Selected (+$3.00)'}`}
          </Text>
        </View>
        <View style={styles.choices} title="Special Instructions">
          <View style={styles.selectionHeader}>
            <Text>Special Instructions</Text>
            <Text>200 characters or less </Text>
          </View>
          <TextInput type="text" name="specialInstructions" style={styles.inputBox} onChange={handleChange}></TextInput>
        </View>
        <Button style={styles.button} title="Return to Location" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Location')}/>
        {((brownRice || whiteRice || yakisoba || cabbageSalad || veggieStirFry || broccoli || mixedGreenSalad) && (spicyChicken || regChicken || shreddedPork || beefBrisket || tofu) && (regSauce || spicySauce || noSauce || sideRegSauce || sideSpicySauce || saladDressing)) ? <Button style={styles.button} title="Add to Cart" accessibilityLabel="Clicking this button will proceed to the order screen" color="blue" onPress={handleSubmit}/> : <Button style={styles.keepAddingButton}title="Keep Adding!" onPress={() => alert(`Make sure you have added all the important stuff!`)}/>}
        <StatusBar style="auto" />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    color: 'red'
    // Views cannot handle text styling -- only Text can handle font styling
  },
  choices: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  selected: {
    fontFamily: 'Helvetica',
    color: 'green',
    fontSize: 18,
  },
  notSelected: {
    fontFamily: 'Helvetica-BoldOblique',
    color: 'red',
    fontSize: 18,
  },
  selectionHeader: {
    fontSize: 22,
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 250,
    height: 100
  },
  button: {
    color: 'blue'
  },
  keepAddingButton: {
    color: 'gray'
  }
});

export default Order;