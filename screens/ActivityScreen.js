import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Activity Screen</Text>
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
    color: 'white', // White text color
    fontSize: 20,
  },
});

export default ActivityScreen;
