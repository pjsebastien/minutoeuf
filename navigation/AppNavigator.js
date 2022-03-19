import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

//Screens
import HomeScreen from '../screens/Home';
import RecipeDetailsScreen from '../screens/RecipeDetails';
import TimerEndScreen from '../screens/TimerEnd';
import TimerInstructionScreen from '../screens/TimerInstruction';
import SettingsScreen from '../screens/Settings';
import RecipesScreen from '../screens/Recipes';
import SearchedRecipeScreen from '../screens/SearchedRecipe';

//MainStackNavigator
const MainStackNavigatorComponent = createStackNavigator();

export const MainStackNavigator = () => {
    return (
        <MainStackNavigatorComponent.Navigator
            screenOptions={() => ({
                presentation: 'modal',
            })}
        >
            <MainStackNavigatorComponent.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <MainStackNavigatorComponent.Screen
                name="RecipeDetails"
                component={RecipeDetailsScreen}
                options={{ headerShown: false }}
            />
            <MainStackNavigatorComponent.Screen
                name="TimerInstruction"
                component={TimerInstructionScreen}
                options={{ headerShown: false }}
            />
            <MainStackNavigatorComponent.Screen
                name="TimerEnd"
                component={TimerEndScreen}
                options={{ headerShown: false }}
            />
            <MainStackNavigatorComponent.Screen
                name="SearchedRecipe"
                component={SearchedRecipeScreen}
                options={{ headerShown: false }}
            />
        </MainStackNavigatorComponent.Navigator>
    );
};

//TabNavigator
const TabNavigatorComponent = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <TabNavigatorComponent.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    size = 24;
                    if (route.name == 'TabHome') {
                        iconName = focused ? 'timer' : 'timer-outline';
                    } else if (route.name == 'TabRecipes') {
                        iconName = focused ? 'egg' : 'egg-outline';
                    } else if (route.name == 'TabSettings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={size}
                            color={Colors.secondaryYellow}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: Colors.secondaryYellow,
                inactiveTintColor: Colors.secondaryYellow,
                activeBackgroundColor: Colors.backGroundColorSecondary,
            }}
        >
            <TabNavigatorComponent.Screen
                name="TabHome"
                component={HomeScreen}
                options={{ title: `Minut'oeuf` }}
            />
            <TabNavigatorComponent.Screen
                name="TabRecipes"
                component={RecipesScreen}
                options={{ title: 'Les recettes' }}
            />
            <TabNavigatorComponent.Screen
                name="TabSettings"
                component={SettingsScreen}
                options={{ title: 'Réglages' }}
            />
        </TabNavigatorComponent.Navigator>
    );
};
