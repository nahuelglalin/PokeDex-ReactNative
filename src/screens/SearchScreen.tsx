import React from 'react';
import { View, Platform, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../theme/appTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, simplePokemonList } = usePokemonSearch();

    //state de pokemones que se muestran en la busqueda
    //el tipo de dato del state es SimplePokemon[] 
    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

    //termino de busqueda
    const [term, setTerm] = useState('');

    useEffect(() => {

        if (term.length === 0){
            return setPokemonFiltered([]);
        }

        //entro a este if si el termino NO es un numero. Lo casteo a numero y luego
        //evaluo con un isnan (is not a number)
        if ( isNaN(Number(term)) ){
            
            //filtro la lista de pokemon para mostrar solo los que busque el usuario
            setPokemonFiltered(simplePokemonList.filter(pokemon => (
                pokemon.name.toLowerCase().includes(term.toLowerCase())
            )));
        } else {
            //el find me devuelve el primer elemento que cumpla la condicion
            const pokemonById = simplePokemonList.find(pokemon => pokemon.id == term);
            //si el pokemonById no es undefined, lo agrego a la lista de pokemones a mostrar
            setPokemonFiltered(
                (pokemonById) ? [pokemonById] : []
            )
        }

        
    }, [term]);


    if (isFetching) {
        return (
           <Loading />
        )
    }

    return (
        <View style={{
            flex: 1,
            marginHorizontal: 20
        }}>
            {/* El <SearchInput /> me esta retornando un valor
            Para ver como lo retorna, tengo que mirar el 
            comportamiento interno del componente */}
            <SearchInput 
                onDebounce={(value) => setTerm(value)}
                style={{
                    position: 'absolute',
                    zIndex: 999,
                    width: screenWidth - 40,
                    top: (Platform.OS === 'ios') ? top : top + 20,
                }}
            />


            <FlatList
                data={pokemonFiltered}
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
                        paddingBottom: 10,
                        marginTop: top
                    }}
                >
                    {term}
                </Text>)
                }

                //ocultar la barrita de scroll
                showsVerticalScrollIndicator={false}

            />


        </View>
    )
}

