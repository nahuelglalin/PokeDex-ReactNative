//Debouncer:
//cada x cantidad de tiempo, que empieza a correr cuando el usuario deja de 
//escribir en el input, se ejecuta una funcion. 
//vamos a usarlo en un input para que, cuando pasen 500ms de no escribir nada,
//se ejecute una peticion http que me traiga los pokemones que coincidan con el value escrito
import { useState, useEffect } from 'react';

//por params, recibo: 
//input: porque puede que la persona quiera inicializar el input con un valor ya cargado.
//delay: el tiempo que tarda en ejecutarse la funcion
export const useDedounceSetValue = ( input: string = '', delay: number = 500 ) => {

    //valor ya hecho con el debouncer
    const [debouncedValue, setDebouncedValue] = useState(input);

    //esto se va a volver a ejecutar cuando el input cambie (el input es el param recibido)
    useEffect(() => {

        //timeout -> va a guardar el valor ingresado, cuando pasen 500ms y el
        //usuario no haya vuelto a escribir
        const timeout = setTimeout( () => {
            setDebouncedValue(input);
        }, delay )

        //este return del useEffect es usado para una limpieza, esta limpieza lo que va a hacer
        //es mandar a llamar el clearTimeout() de nuestro timeout anterior
        return () => {
            clearTimeout(timeout);
        }

        //cada vez que el useEffect se dispara, vuelve a crear una nueva instancia de timeout
        //y la instancia anterior, la limpia

    }, [input]);

    return debouncedValue;
  
}
