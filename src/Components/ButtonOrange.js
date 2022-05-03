import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors, consts } from "../Constants";



const ButtonOrange = ({ title = "Button", onPress, isLoading = false }) => {
    const styles = getStyles()


    return (
        <>
            <TouchableOpacity
                style={styles.container} onPress={!isLoading && onPress}>
                {isLoading ?
                    <ActivityIndicator size={"large"} color={"white"} />
                    :
                    <Text style={styles.text}>
                        {title}
                    </Text>
                }
            </TouchableOpacity>
        </>
    )
}

export default ButtonOrange;

const getStyles = () => StyleSheet.create({
    container: {
        backgroundColor: colors.orange_button,
        marginVertical: 15, borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        // fontSize: 55, 
        color: 'white'

    }
})