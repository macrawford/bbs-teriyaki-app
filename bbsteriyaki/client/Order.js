import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, CheckBox, Pressable } from 'react-native';

function Order({ navigation }) {
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

  // useEffect(() => {
  //   console.log('state: ', whiteRice)
  // });

  function handlePress(item, stateFunction, max, counter, counterFunction) {
    // Could consolidate this further by introducing three more variables: max (in this case, 3), counter (in this case, baseCounter), and counterFunction (in this case, setBaseCounter) - that way we could re-use this function for all ingredient lists (base, protein, etc.)
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
    return (
      <View style={styles.container}>
        <View style={styles.choices} title="Base">
          <View style={styles.selectionHeader}>
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
        <Button style={styles.button} title="Return to Location" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Location')}/>
        <Button style={styles.button} title="Proceed to Cart" accessibilityLabel="Clicking this button will proceed to the order screen" color="blue" onPress={() => navigation.navigate('Cart')}/>
        <StatusBar style="auto" />
      </View>
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
  }
});

export default Order;