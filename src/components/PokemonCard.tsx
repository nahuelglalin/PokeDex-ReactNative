import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const navigation = useNavigation<any>();

    const [bgColor, setBgColor] = useState('grey');

    const isMounted = useRef(true);

    useEffect(() => {
        //obtener el color del pokemon
        ImageColors.getColors(pokemon.picture, {fallback: 'grey'})
            .then(colors => {

                //protege un error que ocurre cuando el componente esta
                //desmontado
                if (!isMounted.current) {
                    return;
                }

                switch (colors.platform){
                    case 'android':
                        setBgColor(colors.dominant || 'grey');
                        break;
                    case 'ios':
                        setBgColor(colors.background || 'grey');
                        break;
                    default:
                        setBgColor('grey');
                        break;
                }
            })

        //el useEffect retorna una funcion
        return () => {
            isMounted.current = false;
        }
        
    }, [])


    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon, color: bgColor
                })
            }}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del Pokemon y ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>


                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImg}

                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        backgroundColor: 'grey',
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.4,
        overflow: 'hidden'
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -20,
        right: -20,
    },
    pokemonImg: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -8,
    }

})
