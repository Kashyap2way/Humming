import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
return (
    <View style={styles.container}>
    <Text style={styles.text}>Home Screen</Text>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Background color
},
text: {
    color: '#ffffff', // White text
    fontSize: 20,
},
});
