import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import ShareRecipe from './ShareRecipe';

const TopIcons = ({ recipe }) => {
    return (
        <View style={styles.topIconsContainer}>
            <View style={styles.iconContainer}>
                <FontAwesome5
                    name="hand-sparkles"
                    size={22}
                    color={Colors.secondaryYellow}
                />
                <Text style={styles.label}>{recipe.difficulty}</Text>
            </View>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name="timer"
                    size={22}
                    color={Colors.secondaryYellow}
                />
                <Text style={styles.label}>{recipe.time}</Text>
            </View>

            <ShareRecipe recipe={recipe} />
        </View>
    );
};

export default TopIcons;

const styles = StyleSheet.create({
    topIconsContainer: {
        marginHorizontal: 20,
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
    },
    label: {
        color: Colors.textPrimary,
        marginTop: 4,
        fontFamily: 'Orkney-bold',
    },
});
