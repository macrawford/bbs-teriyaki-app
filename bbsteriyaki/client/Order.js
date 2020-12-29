import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, CheckBox, Pressable } from 'react-native';

function Order({ navigation }) {
  const [pressed, setState] = React.useState(false)
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Pressable style={styles.container} center onPress={() => setState((!pressed))}>
            {/* Can make text pressable (no need for Pressable) */}
            <Text style={ (pressed) ? styles.text : styles.text2}>
            {`Current status: ${pressed ? 'Selected' : 'Not Selected'}`}
            </Text>
          </Pressable>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
    // Views cannot handle text styling -- only Text can handle font styling
  },
  input: {
    flexDirection: 'row',
  },
  inputBox: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 125,
  },
  text: {
    fontFamily: 'Helvetica',
    color: 'green'
  },
  text2: {
    fontFamily: 'Helvetica-BoldOblique',
    color: 'red'
  }
});

export default Order;