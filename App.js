import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import GuideScreen from './screens/GuideScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Activity') {
              iconName = 'local-activity';
            } else if (route.name === 'Guide') {
              iconName = 'book';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#808080',
          tabBarStyle: {
            backgroundColor: '#333333', // Dark grey color
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Guide" component={GuideScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
