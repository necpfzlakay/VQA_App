import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, consts, shadow } from '../../Constants';
import ImageBg from '../../Layouts/ImageBackground';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { userAuth } from '../../utils/Atoms'
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import axios from 'axios';

const { height, width } = Dimensions.get('screen')


function ProfileTab({ navigation }) {

    const [user, setUser] = useAtom(userAuth)
    const styles = getStyles()
    // console.log(user);

    const { data, isError, isLoading, isSuccess } = useQuery("HistoryFetch", () => {
        return axios.get(consts.API_URL + "history?username=" + user[0])
    })
    // console.log("------", data[0]);
    console.log(isError);
    return (
        <ImageBg>
            {/* <View style={styles.header} >

            </View> */}
            <KeyboardAwareScrollView bounces={false}

                style={{}}>
                <View style={styles.imageContainer}>
                    <Text style={styles.imageText}>
                        {
                            isLoading ?
                                <ActivityIndicator />
                                :
                                user[0][0]
                        }
                    </Text>
                    <Ionicon name='cog-outline' size={40} onPress={() => navigation.navigate("Settings")}
                        color={'white'} style={{
                            zIndex: 99, position: 'absolute', right: 15, top: 15
                        }} />
                </View>
                <View style={{
                    ...shadow,
                    height: height / 1.5,
                    backgroundColor: colors.bg_color_dark, alignItems: 'center',
                    borderTopLeftRadius: 35, borderTopRightRadius: 35,
                }}>

                    <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', marginVertical: 15 }} > History  {'\n'}
                        <Text style={{ fontSize: 8 }}> (What did you asked?)</Text>
                    </Text>

                    {data?.length === 0 ?
                        <View style={{
                            justifyContent: 'center', height: 200,
                        }}>

                            <Text style={{
                                color: 'white',
                            }}>There is No History Yet</Text>
                        </View>
                        :
                        <ScrollView>

                            {data?.data.map((item, index) => {
                                console.log("---->", data?.data[index][3]);
                                return (
                                    <View key={index} style={styles.cardContainer} >
                                        <View style={styles.textContainer} >
                                            <Text style={styles.questionContainer}>
                                                Question:  {item[1]}
                                            </Text>
                                            <Text style={styles.answerContainer}>
                                                Answer:     {item[2]}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1.5, justifyContent: 'center' }} >
                                            <Image
                                                style={{ width: '100%', height: '90%', borderRadius: 15, }}
                                                onLoad={() => <ActivityIndicator />}
                                                source={{ uri: consts.API_URL + "/image?image=" + data?.data[index][3] }}
                                            // source={{ uri: consts.API_URL + "/image?image=" + "4288C1E7C785-EB59-4C57-AAE7-9AF63B546765.jpg" }}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    }




                </View>
            </KeyboardAwareScrollView>
        </ImageBg>
    );
}

export default ProfileTab;

const getStyles = () => StyleSheet.create({
    header: {
        backgroundColor: 'red', height: 10
    },
    imageContainer: {
        flex: 1, height: height / 3, borderRadius: 50,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: .2, margin: 5, marginBottom: -5, backgroundColor: colors.blueBg,
        ...shadow
    },
    imageText: {
        fontSize: 55, color: 'white'
    },
    cardContainer: {
        backgroundColor: colors.bg_color_light, height: height / 7, ...shadow, borderWidth: .25,
        width: width - 40, borderRadius: 20, justifyContent: 'space-evenly', paddingHorizontal: 15,
        marginVertical: 10, flexDirection: 'row'

    },
    textContainer: {
        flex: 4, justifyContent: 'space-evenly'
    },
    questionContainer: {
        color: colors.descriptionText

    },
    answerContainer: {
        color: colors.descriptionText,
    }
})