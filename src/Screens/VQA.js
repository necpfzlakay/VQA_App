import React, { useEffect } from "react";
import { Image, ImageBackground, Text, TextInput, View, scroll, Dimensions } from "react-native";
import SpeedDial from "../Components/SpeedDial";
import ImageBg from "../Layouts/ImageBackground";
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Button } from "react-native-elements";
import { pickImage } from "../Hooks/PickImage";
import { colors, consts } from "../Constants";
import { KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const shadow = {
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: .2,
    elevation: 5,
}
// let api_url = 'http://127.0.0.1:5000/image?%C4%B0MAGE=42887D4730FF-BDF9-4E62-A026-556EDDB8099B.jpg'

const { width, height } = Dimensions.get('screen')

const VQA = () => {
    const [image, setImage] = React.useState(consts.bg_image)

    function handlePickImage(params) {
        pickImage(setImage)
    }
    useEffect(() => {
        console.log("İMAGE", image);
    }, [image])
    return (
        <>


            <ImageBg >
                <KeyboardAwareScrollView bounces={false}

                    style={{}}>
                    <Image
                        style={{ height: height / 3, }}
                        source={{ uri: image }}
                    />
                    <View style={{
                        height: height / 1.5,
                        backgroundColor: colors.bg_color_dark, alignItems: 'center',
                        borderTopLeftRadius: 35, borderTopRightRadius: 35,
                    }}>

                        <View style={{
                            backgroundColor: '#3E3958', borderRadius: 100,
                            height: 50, marginTop: -25, width: '50%', flexDirection: 'row',
                            alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
                            ...shadow
                        }}>
                            <Ionicon color={'white'}
                                name="search" size={25} style={{}} />

                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }} > Ask Anything...  {'\n'}
                                <Text style={{ fontSize: 8 }}> (What do you want to learn?)</Text>
                            </Text>

                        </View>

                        <TextInput placeholder="(type your question.)" placeholderTextColor={'#6D6980'}
                            style={{
                                ...shadow,
                                backgroundColor: 'red', minHeight: 100, textAlign: 'center',
                                color: '#6D6980', backgroundColor: '#3A3553',
                                borderRadius: 15, width: '85%', padding: 20,
                                marginVertical: 20,
                            }}

                        // inline
                        />

                        <Button title={'Submit'} onPress={() => console.log("button")}
                            containerStyle={{
                                borderRadius: 100, width: 100,
                            }}
                            buttonStyle={{ backgroundColor: '#3E3958', ...shadow }}
                            disabledStyle={{ backgroundColor: '#3E3958', ...shadow }}

                        />

                        <View style={{
                            height: 100,
                            color: '#6D6980', backgroundColor: '#3A3553', justifyContent: 'center',
                            width: '85%', ...shadow,
                            marginVertical: 20, borderRadius: 15,
                        }}>

                            <Text style={{
                                textAlign: 'center', margin: 10,
                                color: '#6D6980',

                            }}>
                                (your answer will be here.)
                            </Text>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </ImageBg>
            <SpeedDial chose_photo={handlePickImage} />


        </>
    )
}

export default VQA