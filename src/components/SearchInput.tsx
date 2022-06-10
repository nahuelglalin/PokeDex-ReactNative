import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDedounceSetValue } from '../hooks/useDedounceSetValue';
import { useEffect } from 'react';

//Cuando se llame al componente SearchInput, podemos pasarle el parametro
//styles
interface Props {
    style?: StyleProp<ViewStyle>;
    onDebounce: (value: string) => void;
}

export const SearchInput = ({style, onDebounce}: Props) => {

    //state para manejar lo que se escribe en el input
    const [textValue, setTextValue] = useState('');

    //uso mi hook para manejar el debouncer
    //debouncedValue -> valor que va a setearse pasados 500ms una vez que el usuario
    //haya dejado de escribir. Por que 500ms? pq lo setie asi en el useDedounceSetValue
    //si lo quiero cambiar, a mi hook le tengo que pasar un 2do parametro con los ms
    const debouncedValue = useDedounceSetValue(textValue);

    //cuando el usuario deja de escribir, llamo a mi hook para que me setee el debouncer
    //ejecuto la accion que este aca adentro, cada vez que cambie el debouncedValue
    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue]);


    return (
        <View style={{...styles.container, ...style as any}}>
            <View style={styles.textBackground}>

                <TextInput
                    placeholder='Search pokemon..'
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={ setTextValue }
                />

                <Icon
                    name='search-outline'
                    color='grey'
                    size={25}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    textBackground: {
        backgroundColor: '#f3f1f3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
})