import React from "react";
import { ImageBackground, View } from "react-native";



const ImageBg = ({ children }) => {
    return (
        <>
            <View style={{ flex: 1, }}>
                <ImageBackground source={require('../../assets/images/BG.png')}
                    resizeMode={'cover'} style={{ width: '100%', height: '100%', }}>


                    {children}

                </ImageBackground>
            </View>


        </>
    )
}

export default ImageBg