import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './AppNavigator';

function AppNavigator() {
    return (
        <NavigationContainer>
            <MainStackNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;
