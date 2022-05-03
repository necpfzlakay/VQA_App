import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useMutation } from "react-query";
import ButtonOrange from "../../Components/ButtonOrange";
import Input from "../../Components/Input";
import { colors, consts } from "../../Constants";
import ImageBg from "../../Layouts/ImageBackground";
import { userAuth } from "../../utils/Atoms";

const { width, height } = Dimensions.get('screen')
const form = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",

}
const Auth = () => {
    const styles = getStyles()
    const [user, setUser] = useAtom(userAuth)
    const [stage, setStage] = React.useState(true)
    // const mutate = useMutation()
    // http://31.145.7.41/login?username=username&password=password
    function fetchUser(params) {
        let url = ""
        if (!stage) {

            url = consts.API_URL + "login?username=" + form.username + "&password=" + form.password

        } else {
            url = consts.API_URL + "register?username=" + form.username
                + "&password=" + form.password
                + "&email=" + form.email

        }
        console.log(url);
        return axios.get(url)
    }
    const mutate = useMutation({
        queryKey: "AUTH_LOGIN",
        mutationFn: () => fetchUser(),
        onSuccess: (data) => {
            if (data.data === false) {
                console.log(data.data);
                alert("user not found")
            }
            else {
                let ars = data.data
                let str = ars.replace("(", "")
                str = str.replace(")", "")
                let infoList = str.split("'")
                console.log(infoList[1], infoList[3]);
                setUser([infoList[1], infoList[3]])

            }

        },
        // onSettled: data => {
        //     let ars = data.data
        //     let str = ars.replace("(", "")
        //     str = str.replace(")", "")
        //     let infoList = str.split("'")
        //     console.log(infoList[1], infoList[3]);
        // },
        onError: data => {
            alert(data.message)
        }



    })

    function handleSubmit() {
        mutate.mutate()
    }
    function handleOnChange(key, value) {
        console.log(key, value);
        form[key] = value
    }
    return (
        <>
            <ImageBg >
                <KeyboardAwareScrollView bounces={false}
                    style={{}} >

                    <View style={styles.container} >
                        <Text style={styles.headerText}>
                            Hey! {'\n'}
                            Welcome
                        </Text>
                        {stage ?
                            <>
                                <Input placeholder="Username"
                                    onChangeText={text => handleOnChange("username", text)} />
                                <Input placeholder="Email"
                                    onChangeText={text => handleOnChange("email", text)} />
                                <Input placeholder="Password"
                                    onChangeText={text => handleOnChange("password", text)} />
                                <Input placeholder="Confirm Password"
                                    onChangeText={text => handleOnChange("passwordConfirm", text)} />

                            </>
                            :
                            <>

                                <Input placeholder="Enter Username"
                                    onChangeText={text => handleOnChange("username", text)}
                                />
                                <Input placeholder="Password" secured
                                    onChangeText={text => handleOnChange("password", text)} />
                            </>
                        }
                        <ButtonOrange title={stage ? "Register" : "Login"}
                            isLoading={mutate.isLoading}
                            onPress={() => handleSubmit()} />



                        <Text style={styles.descriptionText} onPress={() => setStage(!stage)}>
                            {stage ?
                                "Already have an accountr? Login."
                                :
                                `Not a member?\nRegister Now`
                            }
                        </Text>

                    </View>
                </KeyboardAwareScrollView>
            </ImageBg>
        </>
    )
}

export default Auth;

const getStyles = () => StyleSheet.create({
    container: {
        // backgroundColor: 'red', 
        // borderWidth: 1,
        // flex: 1,
        height: height / 1.21,
        borderColor: 'white',
        margin: '15%',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 50, color: 'white', marginBottom: 10
    },
    descriptionText: {
        color: colors.descriptionText,
        textAlign: 'center',
        fontSize: 12
    }
})