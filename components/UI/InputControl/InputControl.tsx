import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

interface InputControlProps extends TextInputProps {
    label: string,
    value: string,
    isValid: boolean,
    error: string,
    onValueChange: (newValue: string, isValid: boolean) => void,
    required?: boolean,
    email?: boolean,
    minNumberValue?: number,
    maxNumberValue?: number,
    minLength?: number,

}

const InputControl = (props: InputControlProps) => {

    const [touched, setTouched] = useState(false);

    const textChangedHandler = (text: string) => {
        const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid: boolean = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.minNumberValue != null && +text < props.minNumberValue) {
            isValid = false;
        }
        if (props.maxNumberValue != null && +text > props.maxNumberValue) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        props.onValueChange(text, isValid);
    }

    return (
        <View style={ styles.inputControl }>
            <Text style={ styles.label }>{ props.label }</Text>
            <TextInput style={ styles.input }
                       { ...props }
                       value={ props.value }
                       onBlur={ () => setTouched(true) }
                       onChangeText={ textChangedHandler }
            />
            {
                !props.isValid && touched && (
                    <View style={ styles.errorContainer }>
                        <Text style={ styles.error }>{ props.error }</Text>
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    inputControl: {
        width: '100%',
        marginBottom: 30
    },
    label: {
        fontFamily: 'open-sans-bold'
    },
    input: {
        padding: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    error: {
        fontFamily: 'open-sans',
        fontSize: 13,
        color: 'red'
    }
});

export default InputControl;