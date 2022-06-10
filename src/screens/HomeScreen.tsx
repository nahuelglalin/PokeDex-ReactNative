import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  //console.log(JSON.stringify(simplePokemonList, null, 2));

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}//que se muestren 2 columnas en horizontal
          renderItem={({ item }) => <PokemonCard pokemon={item} />}

          //header
          ListHeaderComponent={() =>
          (<Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 10
            }}
          >
            Pokedex
          </Text>)
          }

          //ocultar la barrita de scroll
          showsVerticalScrollIndicator={false}

          //infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}

          ListFooterComponent={
            <ActivityIndicator
              style={{ height: 100 }}
              color={'grey'}
              size={20}
            />}
        />
      </View>
    </>
  )
}
