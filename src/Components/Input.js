import React from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { shadow } from "../Constants";

const { width, height } = Dimensions.get('screen')


const Input = ({ placeholder = "Placeholder", onChangeText = null, secured,

}) => {
    const styles = getStyles()



    return (
        <>
            <View style={styles.view} >

                <TextInput
                    secureTextEntry={secured}
                    placeholder={placeholder}
                    onChangeText={text => onChangeText && onChangeText(text)}
                    style={styles.container}
                />
            </View>

        </>
    )
}

const getStyles = () => StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'white',
        ...shadow
    },
    view: {
        marginVertical: width / 35, ...shadow
    }
})

export default Input