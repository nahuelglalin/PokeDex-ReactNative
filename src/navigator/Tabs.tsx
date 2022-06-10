import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1 } from './Tab1';
import { SearchScreen } from '../screens/SearchScreen';
import { Tab2 } from './Tab2';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const  Tabs = () => {
  return (
    <Tab.Navigator 
        sceneContainerStyle={{
            backgroundColor: 'white',
        }}

        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#5856D5',
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.82)', 
                paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10, 
                borderWidth: 0,
                elevation: 0,
                height: 60,//( Platform.OS === 'ios') ? 70 : 80,
            }
        }}
    >
      <Tab.Screen 
        name="Tab1" 
        component={ Tab1 } 
        options={{
            tabBarLabel: 'List',
            tabBarLabelStyle: {
                fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
                <Icon 
                    color={color}
                    size={30}
                    name="list-outline"
                />
            )
        }}
      />
      <Tab.Screen 
        name="Tab2" 
        component={ Tab2 } 
        options={{
            tabBarLabel: 'Search',
            tabBarLabelStyle: {
                fontSize: 12,
            },
            tabBarIcon: ({ color }) => (
                <Icon 
                    color={color}
                    size={30}
                    name="search-outline"
                />
            )
        }}

      />
    </Tab.Navigator>
  );
}