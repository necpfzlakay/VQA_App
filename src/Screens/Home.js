import react, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Dimensions, StatusBar } from "react-native";
import Answer from "../Components/Answer";
import ChosePhoto from "../Components/ChosePhoto";
import Question from "../Components/Question";
import ViewPhoto from "../Components/ViewPhoto";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
// axios.defaults.headers['content-type'] = "application/x-www-form-urlencoded"

// axios.defaults.headers["name"] = "photo"
const { width, height } = Dimensions.get('window')
let api_url = "http://127.0.0.1:5000/"
const Home = () => {
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState("")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        }).then(res => {
            // console.log("resss", res);
            let formdt = new FormData();

            // // Assume "photo" is the name of the form field the server expects 
            // setFilename(res.width + res.uri.split("/")[res.uri.split("/").length - 1])
            let file_name = res.width + res.uri.split("/")[res.uri.split("/").length - 1]
            let photo_data = {
                uri: res.uri,
                name: file_name,
                type: res.type
            }
            formdt.append("photo", photo_data)
            // console.log(formData);

            if (!res.cancelled) {
                setImage(res.uri);
            }
            return formdt
        })
            .then(formData => {
                // console.log(formData);

                fetch(api_url + "file", {
                    method: 'POST',
                    headers: {
                        Accept: 'multipart/form-data',
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                })
                    .then(async response => {
                        // console.log(await response.text())
                        // setFilename(await response.text())
                        return await response.text()
                    }).then(last_response => {
                        // console.log(last_response);
                        setFilename(last_response)
                    })
                    .catch(err => {
                        setImage("")
                        console.warn(err.data);
                    })

            })
        return result
    };




    function ProccessPhoto() {
        console.log(filename);
        ref.current.scrollToEnd(({ animated: true }));
    }




    const ref = useRef()



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'gainsboro', marginTop: StatusBar?.currentHeight }}>
            <ScrollView bounces={false} style={{ flex: 1, }}
                ref={ref}
            >

                <View style={{ height: height / 3.5 }}>
                    <ChosePhoto pickImage={pickImage} />
                </View>
                <View style={{}}>
                    <ViewPhoto img={image} onPressFunc={ProccessPhoto} />
                </View>
                <View style={{ height: height / 3.5 }}>
                    <Question />
                </View>
                <View style={{ height: height / 3.5 }}>
                    <Answer />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


export default Home;
