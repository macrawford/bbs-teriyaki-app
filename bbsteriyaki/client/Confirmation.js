import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, componentDidMount } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={require('../BB_S.png')}></Image>
      </View>
      <View style={styles.subContainer}>
        {params.ave ? <Text style={styles.font}>{`Thank you for your order, ${firstName}. It will be ready in 15 minutes at 4221 University Way NE Seattle, WA 98112.`}</Text> : null}
        {params.slu ? <Text style={styles.font}>{`Thank you for your order, ${firstName}. It will be ready in 15 minutes at 210 Westlake Ave N Seattle, WA 98109.`}</Text> : null}
        {params.downtown ? <Text style={styles.font}>{`Thank you for your order, ${firstName}. It will be ready in 15 minutes at 1111 3rd Ave Seattle, WA 98101.`}</Text> : null}
        <View style={styles.border}></View>
        <View style={styles.rewards}>
          {rewardsCount < 9 ? <Text style={styles.font}>{`You earned ${rewardsAdded} reward points today for a total of ${rewardsCount} reward points. Keep earning and when you hit 9 points you'll be eligible for a free meal!`}</Text> : <Text style={styles.font}>{`You earned ${rewardsAdded} reward points today for a total of ${rewardsCount} reward points. Redeem those points next time for a free meal!`}</Text>}
        </View>
        <Button title="Return to Login Screen" accessibilityLabel="Clicking this button will return to the login screen" color="blue" onPress={() => navigation.navigate('Login')}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    // Views cannot handle text styling -- only Text can handle font styling
  },
  subContainer: {
    marginLeft: 20,
    marginRight: 20,
    flex: 2,
  },
  image: {
    width: 200,
    height: 200,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    paddingTop: 25,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontFamily: "Helvetica",
    fontSize: 22,
    fontWeight: '300'
  },
  rewards: {
    paddingTop: 25,
    paddingBottom: 30
  }
})

export default Confirmation;