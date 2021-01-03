import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidMount } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import Firebase from '../firebase.js';
import 'firebase/auth';
import 'firebase/database';

function Confirmation ({ navigation, route }) {
  var database = Firebase.database();
  var userId = Firebase.auth().currentUser.uid;
  const [firstName, setName] = React.useState('')

  var firstNameRoute = Firebase.database().ref('users/' + userId + '/firstName');

  useEffect(() => {
    firstNameRoute.once('value').then((snapshot) => {
      var name = snapshot.val();
      setName(name)
    })
  }, [])

  var params = route.params;
  var rewardsAdded = route.params.byo;
  var rewardsCount = route.params.rewardCount + rewardsAdded;

  console.log('params: ', params);
  console.log('rewardsCount: ', rewardsCount);
  return (
    <View>
      {params.ave ? <Text>{`${firstName}, thank you for your order. It will be ready in 15 minutes at 4221 University Way NE Seattle, WA 98112.`}</Text> : null}
      {params.slu ? <Text>{`${firstName}, thank you for your order. It will be ready in 15 minutes at 210 Westlake Ave N Seattle, WA 98109.`}</Text> : null}
      {params.downtown ? <Text>{`${firstName}, thank you for your order. It will be ready in 15 minutes at 1111 3rd Ave Seattle, WA 98101.`}</Text> : null}
      {rewardsCount < 9 ? <Text>{`You earned ${rewardsAdded} reward points today for a total of ${rewardsCount} reward points. Keep earning and when you hit 10 points you'll be eligible for a free meal!`}</Text> : <Text>{`You earned ${rewardsAdded} reward points today for a total of ${rewardsCount} reward points. Redeem those points next time for a free meal!`}</Text>}
      <Button title="Return to Login Screen" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Login')}></Button>
    </View>
  )
}

export default Confirmation;