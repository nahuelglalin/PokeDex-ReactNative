import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
        style={{
            ...StyleSheet.absoluteFillObject
        }}
    >
        {/* Types y Peso */}
        <View style={{
            ...styles.container,
            marginTop: 370
        }}>
            <Text style={ styles.title }>Types</Text>

            <View style={{flexDirection: 'row'}}>
                {
                    pokemon.types.map( (item) => (
                        <Text 
                            key={item.type.name}
                            style={{ ...styles.regularText, marginRight: 10 }}
                        >
                            {item.type.name}
                        </Text>
                    ))
                }

            </View>

            <Text style={ styles.title }>Weight</Text>
            <Text style={ styles.regularText }>{pokemon.weight} kg</Text>
        </View>

        {/* Sprites */}
        <View style={{
            ...styles.container
        }}>
            <Text style={ styles.title }>Sprites</Text>
        </View>

        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <FadeInImage 
                uri={pokemon.sprites.front_default}
                style={styles.basicSprite}
            />
             <FadeInImage 
                uri={pokemon.sprites.back_default}
                style={styles.basicSprite}
            />
             <FadeInImage 
                uri={pokemon.sprites.front_shiny}
                style={styles.basicSprite}
            />
            <FadeInImage 
                uri={pokemon.sprites.back_shiny}
                style={styles.basicSprite}
            />
        </ScrollView>

        {/* Habilidades */}
        <View style={{
            ...styles.container
        }}>
            <Text style={ styles.title }>Base skills</Text>
            <View style={{flexDirection: 'row'}}>
                {
                    pokemon.abilities.map( (item) => (
                        <Text 
                            key={item.ability.name}
                            style={{ ...styles.regularText, marginRight: 10 }}
                        >
                            {item.ability.name}
                        </Text>
                    ))
                }

            </View>
        </View>

         {/* Movements */}
         <View style={{
            ...styles.container
        }}>
            <Text style={ styles.title }>Movements</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                    pokemon.moves.map( (item) => (
                        <Text 
                            key={item.move.name}
                            style={{ ...styles.regularText, marginRight: 10 }}
                        >
                            {item.move.name}
                        </Text>
                    ))
                }

            </View>
        </View>

        {/* Habilidades */}
        <View style={{
            ...styles.container
        }}>
            <Text style={ styles.title }>Stats</Text>
            <View>
                {
                    pokemon.stats.map( (item, index) => (

                        <View 
                            key={item.stat.name + index}
                            style={{flexDirection: 'row'}}
                        >
                            <Text 
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10,
                                    width: 150 
                                }}
                            >
                                {item.stat.name}
                            </Text>

                            <Text 
                                style={{ ...styles.regularText, fontWeight: 'bold'}}
                            >
                                {item.base_stat}
                            </Text>
                        </View>

                    ))
                }

            </View>


            <View style={{
                marginBottom: 80,
                alignItems: 'center'
            }}>
                <FadeInImage 
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
            </View>
        

        

        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 17,
    },
    basicSprite: {
        width: 100,
        height: 100
    }
})
