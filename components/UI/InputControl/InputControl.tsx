import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TextInputProps } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface InputControlProps extends TextInputProps {
    label: string,
    value: string,
    onValueChange: (newValue: string, isValid: boolean) => void,
    isValid: boolean,
    error: string,
    required?: boolean,
    email?: boolean,
    minNumberValue?: number,
    maxNumberValue?: number,
    minLength?: number,
    submitted?: boolean
}

const InputControl = (props: InputControlProps) => {

    const [focused, setFocused] = useState(false);
    const [blurred, setBlurred] = useState(false);

    const toggleFocus = (focused: boolean) => {
        setFocused(focused);
        setBlurred(!focused);
    };

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
    };

    const getInputColor = () => {
        if (focused) {
            return props.isValid ? COLORS.primary : COLORS.danger;
        }

        if (blurred || props.submitted) {
            return props.isValid ? COLORS.common : COLORS.danger;
        }
    };

    return (
        <View style={ styles.inputControl }>
            <Text style={ styles.label }>{ props.label }</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: getInputColor() }}
                       { ...props }
                       value={ props.value }
                       onFocus={ () => toggleFocus(true) }
                       onBlur={ () => toggleFocus(false) }
                       onChangeText={ textChangedHandler }
            />
            {
                !props.isValid && ( blurred || props.submitted) && (
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
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    error: {
        fontFamily: 'open-sans',
        fontSize: 13,
        color: COLORS.danger
    }
});

export default InputControl;
