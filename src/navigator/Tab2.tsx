//este es un stack navigator que va a ser mostrado cuando el usuario toque el
//search tab. 
//esto me sirve para realizar una navegacion interna dentro de el tab de search
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { SearchScreen } from '../screens/SearchScreen';

export type RootStackParams = {
  SearchScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon, color: string};//porque recibe un param de tipo SimplePokemon
}

const Stack = createStackNavigator<RootStackParams>();

export const Tab2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}