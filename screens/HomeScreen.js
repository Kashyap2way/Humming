import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WifiManager from 'react-native-wifi-reborn'; // For scanning WiFi networks

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Function to request location permission (necessary for WiFi scanning on Android)
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location to scan WiFi networks',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          setPermissionGranted(true);
        } else {
          console.log('Location permission denied');
          Alert.alert('Permission Denied', 'Location permission is required to scan for WiFi networks.');
        }
      } else {
        // For iOS or other platforms, assume permission is granted
        setPermissionGranted(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Function to scan for available WiFi networks
  const scanWifi = async () => {
    try {
      if (permissionGranted) {
        const wifiNetworks = await WifiManager.loadWifiList();
        setWifiList(JSON.parse(wifiNetworks));
      } else {
        Alert.alert('Permission Required', 'You need to grant location permission to scan for WiFi networks.');
      }
    } catch (error) {
      console.error('Error scanning WiFi networks:', error);
    }
  };

  // Ask for location permission on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Trigger WiFi scan when the modal is opened
  useEffect(() => {
    if (modalVisible && permissionGranted) {
      scanWifi();
    }
  }, [modalVisible, permissionGranted]);

  return (
    <View style={styles.container}>
      {/* WiFi Icon */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="wifi" size={100} color="white" style={styles.icon} />
      </TouchableOpacity>

      {/* "Connect" Description */}
      <Text style={styles.text}>Connect</Text>

      {/* Modal Overlay for WiFi List */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Available WiFi Networks</Text>

            {/* Scrollable List of WiFi */}
            <FlatList
              data={wifiList}
              keyExtractor={(item) => item.BSSID}
              renderItem={({ item }) => (
                <View style={styles.wifiItem}>
                  <Text style={styles.wifiName}>{item.SSID}</Text>
                </View>
              )}
            />

            {/* Close Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
  },
  modalBox: {
    width: '80%', // Portrait-shaped box
    height: '60%', // Adjust height to make it scrollable
    backgroundColor: 'grey',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'white', // Glowing white border
    shadowColor: 'white', // Add glowing effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  wifiItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  wifiName: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
