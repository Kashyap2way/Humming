import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guide Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Background color (dark)
  },
  text: {
    color: '#ffffff', // White text color
    fontSize: 20,
  },
});
