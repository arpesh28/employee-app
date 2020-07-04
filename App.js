import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const myoptions = {
  title: 'Employees',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#00b8ae',
    elevation: 0,
    shadowOpacity: 0,
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Home' options={myoptions} component={Home} />
        <Stack.Screen
          name='Create'
          options={{ ...myoptions, title: 'Create' }}
          component={CreateEmployee}
        />
        <Stack.Screen
          name='Profile'
          options={{ ...myoptions, title: 'Profile' }}
          component={Profile}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faf8',
    marginTop: Constants.statusBarHeight,
  },
});

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
