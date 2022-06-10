import { useEffect, useState } from "react"
import { pokemonApi } from "../api/pokemonApi"
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {

    //state para saber cuando termino de cargar
    const [isFetching, setIsFetching] = useState(true);

    //state que tiene un array de simplePokemon (es decir, 1 solo pokemon)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
 

    //hago la peticion http
    const loadPokemons = async () => {
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(`https://pokeapi.co/api/v2/pokemon?limit=1200`);
                
        //mapeo la data que viene
        //de la api a un array de simplePokemon
        mapPokemonListToSimplePokemon(resp.data.results);
    }


    const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {
        //mapeo la data que viene, para que se convierta en un array de simplePokemon
        const newPokemonList: SimplePokemon[] = pokemonList.map((pokemon) => {
            
            //extraigo el id de cada pokemon, desde su url
            const id = pokemon.url.split('/')[6];

            //obtengo la imagen de cada pokemon segun su id
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            //retorno cada pokemon mapeado de esta forma
            return {
                id: id,
                name: pokemon.name,
                picture: picture
            }
        });

        //a mi antiguo array de simplePokemonList, le agrego los nuevos pokemons
        setSimplePokemonList(newPokemonList);
        setIsFetching(false);
    }
    

    useEffect(() => {
   
        loadPokemons();

    }, []);

    return {
        simplePokemonList,
        isFetching
    }

}
