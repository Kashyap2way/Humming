import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WifiManager from 'react-native-wifi-reborn';

export default function HomeScreen() {
  const [wifiList, setWifiList] = useState([]);

  const searchWifi = async () => {
    try {
      const networks = await WifiManager.loadWifiList();
      setWifiList(networks);
      Alert.alert(
        'Nearby Wi-Fi Networks',
        networks.map(network => network.SSID).join('\n') || 'No networks found'
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to load Wi-Fi networks. Make sure location services are enabled.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={searchWifi} style={styles.iconContainer}>
        <Icon name="wifi" size={100} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Dark background color
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333', // Dark grey background for icon container
    padding: 20,
    borderRadius: 50,
  },
});
