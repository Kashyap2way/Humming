import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Black background for the screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white', // White text color to contrast with black background
    fontSize: 20,
  },
});

export default HomeScreen;
