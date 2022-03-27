import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as firebase from 'firebase';
// import { initializeApp  } from 'firebase/app';
// import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBboNdYAcCq5IqZuudl8PGZDXUOhUdV400',
  authDomain: 'bookhub-ab3d7.firebaseapp.com',
  databaseURL: 'https://bookhub-ab3d7.firebaseio.com',
  projectId: 'bookhub-ab3d7',
  storageBucket: 'bookhub-ab3d7.appspot.com',
  // messagingSenderId: 'sender-id',
  appId: '1:835109344321:android:aa592209ff55c36da5a2c0',
  // measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  React.useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user)
      {
        console.log("logged inb")
      }
      else
      {
        console.log("un authorized")
      }
    })

},[])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
