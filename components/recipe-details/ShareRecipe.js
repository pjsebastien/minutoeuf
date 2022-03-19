import React from 'react';
import { Share, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ShareRecipe = ({ recipe }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: `Viens découvrir l'application Minutoeuf !`,
                message: `Salut télécharge l'application Minutoeuf sur le Play Store pour découvrir comme moi la délicieuse recette "${recipe.name}". Minutoeuf, c'est des dizaines de fabuleuses idées de préparation des oeufs, ainsi qu'un minuteur pour les oeufs dur, mollés, pochés, à la coque... afin de ne plus jamais rater la cuisson de son oeuf, A très vite !  `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <TouchableOpacity onPress={onShare}>
            <View style={styles.iconContainer}>
                <FontAwesome5 name="share" size={22} color={Colors.secondaryYellow} />
                <Text style={styles.label}>Partager</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ShareRecipe;

const styles = StyleSheet.create({
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
