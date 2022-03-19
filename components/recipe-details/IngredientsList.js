import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';

const IngredientsList = ({ ingredients }) => {
    const [count, setCount] = useState(2);

    return (
        <View>
            <View style={styles.countContainer}>
                <View style={styles.textCountContainer}>
                    <Text style={styles.countTitle}>Ingredients</Text>
                    <Text style={styles.countSubtitle}>Nombre de personnes ?</Text>
                </View>
                <View style={styles.buttonCountContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            count > 1 ? setCount(count - 1) : null;
                        }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>{count}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            count <= 9 ? setCount(count + 1) : null;
                        }}
                        style={styles.buttonContent}
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {ingredients !== undefined
                ? ingredients.map((ingredient, index) => {
                      return (
                          <View key={index}>
                              <View style={styles.cardIngredientsContainer}>
                                  <View style={styles.containerItems}>
                                      <Image
                                          style={styles.cardImage}
                                          source={{
                                              uri: ingredient.attributes.image.data
                                                  .attributes.url,
                                          }}
                                      />
                                      <Text style={styles.cardIngredientName}>
                                          {ingredient.attributes.title}
                                      </Text>
                                  </View>
                                  <View style={styles.containerItems}>
                                      <Text style={styles.cardIngredientQuantity}>
                                          {ingredient.attributes.quantity > 0
                                              ? ingredient.attributes.quantity * count
                                              : null}{' '}
                                          {ingredient.attributes.mesure
                                              ? ingredient.attributes.mesure
                                              : null}
                                      </Text>
                                  </View>
                              </View>
                          </View>
                      );
                  })
                : null}
        </View>
    );
};
export default IngredientsList;

const styles = StyleSheet.create({
    cardIngredientsContainer: {
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30,
    },
    buttonCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 90,
        height: 40,
        borderRadius: 15,
        backgroundColor: Colors.secondaryGrayLight,
    },
    countTitle: {
        fontFamily: 'Orkney-bold',
        fontSize: 20,
        color: Colors.textPrimary,
    },
    countSubtitle: {
        fontFamily: 'Orkney-bold',
        fontSize: 12,
        color: Colors.secondaryGray,
    },
    buttonContent: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Orkney-bold',
        fontSize: 16,
    },
    containerItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 15,
        opacity: 0.7,
    },
    cardIngredientName: {
        marginLeft: 12,
        fontFamily: 'Orkney-bold',
        fontSize: 16,
        color: Colors.textPrimary,
    },
    cardIngredientQuantity: {
        fontFamily: 'Orkney-bold',
        fontSize: 16,
        color: Colors.secondaryGray,
    },
});
