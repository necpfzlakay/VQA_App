import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, consts } from "../Constants";



const Button = ({ text = "Button", onPress }) => {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={styles.container}>
                <Text style={{ fontSize: 17, color: 'white' }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, backgroundColor: colors.bg_color_light, borderColor: colors.bg_color_dark,
        height: 100, borderRadius: 15, marginVertical: 30, marginHorizontal: 30,
        alignSelf: 'center', width: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    }
})