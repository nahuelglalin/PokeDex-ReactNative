import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Tab1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import Icon from 'react-native-vector-icons/Ionicons';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ navigation, route }: Props) => {

  const { simplePokemon, color } = route.params;
  const { top } = useSafeAreaInsets();
  const { pokemon: pokemonResponse, isLoading } = usePokemon(simplePokemon.id);


  return (
    <View style={{flex: 1}}>

      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>
        {/* Flecha volver */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 10,
          }}
        >
          <Icon
            name="arrow-back-outline"
            color="white"
            size={35}
          />
        </TouchableOpacity>

        {/* Nombre Pokemon */}
        <Text style={{
          ...styles.pokemonName,
          top: top + 40,
        }}>
          {simplePokemon.name + '\n'} #{simplePokemon.id}
        </Text>

        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        {/* Pokemon */}
        <FadeInImage
          uri={simplePokemon.picture}
          style={styles.pokemonImage}

        />


      </View>

      {/* Detalles y Loading */}
      {
        isLoading ? (
          <View style={{
            ...styles.activityIndicator
          }}>
            <ActivityIndicator
              color={simplePokemon.color}
              size={50}
            />
          </View>
        ) : (
          <PokemonDetails pokemon={pokemonResponse} />
        )

      }
      

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.3
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})