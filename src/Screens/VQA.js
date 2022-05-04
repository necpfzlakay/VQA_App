import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TextInput, View, scroll, Dimensions, ActivityIndicator } from "react-native";
import SpeedDial from "../Components/SpeedDial";
import ImageBg from "../Layouts/ImageBackground";
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Button } from "react-native-elements";
import { pickImage } from "../Hooks/PickImage";
import { colors, consts } from "../Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { imageVQAatom, userAuth } from "../utils/Atoms";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import { AskQuestionVQA } from "../utils/Request";

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
    const [image, setImage] = useAtom(imageVQAatom)
    const [user, setUser] = useAtom(userAuth)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    function handlePickImage(params) {
        pickImage(setImage)
    }
    useEffect(() => {
        console.log("İMAGE", image);
    }, [image])

    let username = user[0]

    const { data, mutate, isLoading, isError } = useMutation("ASK_QUESTION", () => {
        let img = image.split("=")[image.split("?").length - 1]
        let prm = "username=" + username
            + "&question=" + question
            + "&photoName=" + img
        console.log(prm);
        return AskQuestionVQA(prm).then(res => {
            console.log("RESPONSEEE ---", res);
            setAnswer(res)
            return res
        })
    },
        {
            onSettled: () => setQuestion("")
        }
    )






    function handleSubmit(params) {
        console.log("Submit Question")
        mutate()
    }
    // mutate()

    return (
        <>


            <ImageBg >
                <KeyboardAwareScrollView bounces={false}

                    style={{}}>
                    <Image
                        on
                        onProgress={() => <ActivityIndicator />}
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
                            onChangeText={text => setQuestion(text)}
                            value={question}
                            style={{
                                ...shadow,
                                backgroundColor: 'red', minHeight: 100, textAlign: 'center',
                                color: '#6D6980', backgroundColor: '#3A3553',
                                borderRadius: 15, width: '85%', padding: 20,
                                marginVertical: 20,
                            }}

                        // inline
                        />

                        <Button title={'Submit'} onPress={() => handleSubmit()}
                            disabled={(image === consts.bg_image) || (question === "")}
                            loading={isLoading}

                            containerStyle={{
                                borderRadius: 100, width: 100, ...shadow
                            }}
                            buttonStyle={{ backgroundColor: colors.text_color_light, }}
                            disabledStyle={{ backgroundColor: '#3E3958', }}

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
                                {
                                    answer ?
                                        answer : "(your answer will be here.)"
                                }
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