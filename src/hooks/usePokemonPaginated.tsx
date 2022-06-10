import { useEffect, useRef, useState } from "react"
import { pokemonApi } from "../api/pokemonApi"
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

    //state para saber cuando termino de cargar
    const [isLoading, setIsLoading] = useState(true);

    //state que tiene un array de simplePokemon (es decir, 1 solo pokemon)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
 
    //no dispara una re renderizacion de los componentes
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');


    //hago la peticion http
    const loadPokemons = async () => {
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        
        //seteo la url de la proxima pagina
        //(esto es para hacer la paginacion)
        nextPageUrl.current = resp.data.next;
        
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
        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList]);
        setIsLoading(false);
    }
    

    useEffect(() => {
   
        loadPokemons();

    }, []);

    return {
        simplePokemonList,
        isLoading,
        loadPokemons
    }

}
