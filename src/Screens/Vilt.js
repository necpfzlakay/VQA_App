import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text, View, ImageBackground, Image,
    TextInput, Dimensions, ActivityIndicator
} from 'react-native';

import ImageBg from '../Layouts/ImageBackground';
import { colors, consts } from '../Constants';
import Button from '../Components/Button';

// CHOSE FROM GALLERY
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useNavigation } from '@react-navigation/native';
import { imageAtom, base64sendAtom } from '../utils/Atoms';

const { width, height } = Dimensions.get('screen')
// let base64send = ""




function Buttons({ setimg, setAnswer, base64send, setbase64Send }) {
    const navigation = useNavigation()
    return (
        <View style={{
            flex: 1, justifyContent: 'space-evenly',
            marginHorizontal: 40,
        }}>
            <Button onPress={() => chooseImage({ setImage: setimg, setanswer: setAnswer, setbase64Send })} text={"Gallery"} />
            <Button onPress={() => navigation.navigate("camera", { isBase64: true, setimg, base64send, setbase64Send })} text={"Camera"} />
        </View>
    )
}

function MainScreen({ image, setimg, answer, setAnswer, base64send }) {
    const [question, setQuestion] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {

        console.log("base64send.length", base64send.length);
        if (base64send.length === 0) {
            setimg(null)
        }
    }, [loading])

    return (
        <>
            <KeyboardAwareScrollView>

                <View style={{ marginHorizontal: 20 }}>
                    <Text onPress={() => setimg(null)}
                        style={{
                            color: 'white', fontSize: 40, position: 'absolute',
                            right: 30, top: 30, zIndex: 99,
                        }}
                    > x </Text>
                    <Image
                        source={{ uri: image }}
                        style={{
                            alignSelf: 'center',
                            height: width - 50, width: width - 50, backgroundColor: 'red',
                            marginTop: 30, borderRadius: 20
                        }}
                    />
                    <View style={{ flexDirection: 'row', }}>

                        <TextInput placeholder='Ask your question to Huggingface Vilt'
                            placeholderTextColor={colors.text_color_light}
                            onChangeText={text => { setQuestion(text), console.log(text) }}
                            style={{
                                minWidth: '70%',
                                backgroundColor: colors.bg_color_light, textAlign: 'center',
                                height: 50, color: 'white', borderRadius: 15,
                                marginVertical: 30, marginRight: 15,
                            }}
                        />
                        <View style={{
                            height: 50, borderRadius: 15, backgroundColor: colors.bg_color_light,
                            justifyContent: 'center', marginVertical: 30,
                            // marginRight: 10,
                            // flex: 1
                        }}>
                            <Text
                                onPress={() => !loading &&
                                    submit(question, setAnswer, setLoading, setError, base64send)}
                                style={{
                                    // backgroundColor: colors.bg_color_dark,
                                    paddingHorizontal: 10, borderRadius: 10,
                                    color: colors.descriptionText, borderColor: 'white',
                                    width: 70, textAlign: 'center',
                                    fontSize: 17
                                }}>Ask</Text>
                        </View>
                    </View>
                    {
                        loading && <ActivityIndicator size={'large'} color={'white'} />
                        // <Text style={{ color: 'yellow', textAlign: 'center', fontSize: 26, }}>
                        //     Loading please wait
                        // </Text>
                    }
                    {
                        error &&
                        <Text style={{ color: 'red', textAlign: 'center', fontSize: 26, }}>
                            Error Occured
                        </Text>
                    }
                    {
                        (!loading && !error) &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                            <Text style={{
                                color: colors.text_color_light, fontSize: 26,
                            }}>
                                Answer:
                            </Text>
                            <Text
                                style={{

                                    flex: 1, textAlign: 'right',
                                    color: colors.orange_button, fontSize: 40,
                                }}>
                                {answer}
                            </Text>
                        </View>
                    }
                </View>
            </KeyboardAwareScrollView>

        </>
    )
}


async function chooseImage({ setImage, setanswer, setbase64Send }) {
    console.log("image");
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,

    }).then(async res => {
        setImage(res.uri)
        setbase64Send(res?.base64)
        // console.log(res);
        // console.log(base64send);
    })
}
let disable = false
function submit(question, setanswer, setLoading, setError, base64send) {
    if (!disable) {
        disable = true
        setLoading(true)
        // console.log("image", base64send)
        let payload = {
            "image": base64send,
            "question": question
        }
        console.log(consts.API_URL + "vilt");
        if (question && question !== "") {
            axios.post(consts.API_URL + "vilt", payload)
                .then(res => {
                    setanswer(res.data.answer)
                    console.log(res.data.answer)
                    setLoading(false)
                    disable = false
                })
                .catch((err) => {
                    console.log("ERROR VAR:", err);
                    setLoading(false)
                    setError(true)
                    disable = false
                })
        }
    }
}

export default function Vilt() {
    const [base64send, setbase64Send] = useAtom(base64sendAtom)
    const [image, setImage] = useAtom(imageAtom)
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState("")


    return (
        <View style={styles.container}>
            <ImageBg>
                <ImageBackground source={{ uri: consts.bg_image }}
                    resizeMode={'repeat'} style={{ width: '100%', height: '100%', }}>


                    {
                        image ?
                            <MainScreen
                                image={image} setimg={setImage}
                                answer={answer} setAnswer={setAnswer}
                                question={question} setQuestion={setQuestion}
                                base64send={base64send}
                            />
                            :
                            <Buttons setimg={setImage} setAnswer={setAnswer}
                                base64send={base64send}
                                setbase64Send={setbase64Send} />
                    }


                </ImageBackground>
            </ImageBg>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

