import {
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    View,
    Dimensions,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const TypeOfEggCard = ({ props, typeOffEggs }) => {
    const navigation = useNavigation();
    return (
        <FlatList
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            data={typeOffEggs}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    style={{
                        ...styles.card,
                        backgroundColor:
                            item.id % 2
                                ? Colors.secondaryYellowLight
                                : Colors.backGroundColorSecondary,
                    }}
                    onPress={() =>
                        navigation.navigate('TimerInstruction', {
                            selectedTypeOffEgg: item,
                        })
                    }
                >
                    <Image
                        source={{
                            uri: item.image,
                        }}
                        style={styles.imageCard}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Dimensions.get('window').height * 0.12,
                        }}
                    >
                        <Text
                            style={{
                                ...styles.cardText,
                                color:
                                    item.id % 2
                                        ? Colors.textPrimaryLight
                                        : Colors.textPrimary,
                            }}
                        >
                            {item.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons
                                name="timer"
                                size={30}
                                color={
                                    item.id % 2
                                        ? Colors.textPrimaryLight
                                        : Colors.textPrimary
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default TypeOfEggCard;

const styles = StyleSheet.create({
    card: {
        width: 190,
        height: Dimensions.get('window').height * 0.55,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 15,
        marginRight: 25,
    },
    imageCard: {
        height: Dimensions.get('window').height * 0.43,
        width: 190,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover',
    },
    cardText: {
        fontSize: 18,
        marginTop: 2,
        letterSpacing: 0.5,
        fontFamily: 'Orkney-bold',
    },
});
