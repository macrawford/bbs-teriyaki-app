import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
          <Text style={ (whiteRice) ? styles.selected : styles.notSelected} onPress={() => setWhiteRice((!whiteRice))}>
          {`White rice: ${whiteRice ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (brownRice) ? styles.selected : styles.notSelected} onPress={() => setBrownRice((!brownRice))}>
          {`Brown rice: ${brownRice ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (yakisoba) ? styles.selected : styles.notSelected} onPress={() => setYakisoba((!yakisoba))}>
          {`Yakisoba: ${yakisoba ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (cabbageSalad) ? styles.selected : styles.notSelected} onPress={() => setCabbageSalad((!cabbageSalad))}>
          {`Cabbage Salad: ${cabbageSalad ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (veggieStirFry) ? styles.selected : styles.notSelected} onPress={() => setVeggieStirFry((!veggieStirFry))}>
          {`Veggie Stir Fry: ${veggieStirFry ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (broccoli) ? styles.selected : styles.notSelected} onPress={() => setBroccoli((!broccoli))}>
          {`Broccoli: ${broccoli ? 'Selected' : 'Not Selected'}`}
          </Text>
          <Text style={ (mixedGreenSalad) ? styles.selected : styles.notSelected} onPress={() => setMixedGreenSalad((!mixedGreenSalad))}>
          {`Mixed Green Salad: ${mixedGreenSalad ? 'Selected' : 'Not Selected'}`}
          </Text>
        </View>
        <View style={styles.input} title="Protein">

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