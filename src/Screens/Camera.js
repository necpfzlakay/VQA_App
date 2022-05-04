import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { base64sendAtom, imageAtom, imageVQAatom } from '../utils/Atoms';
import { useAtom } from 'jotai';
import Icon from 'react-native-vector-icons/Ionicons'
import UploadImage from '../Hooks/uploadImageFromCamera';
import { AddPhotosToFormData } from '../utils/AddToFormData';
import { consts } from '../Constants';

const { width, height } = Dimensions.get('window')
const screenRatio = height / width;
const CameraOpen = ({ navigation, route }) => {
    const [image, setImage] = useAtom(imageAtom)
    const [base64send, setbase64Send] = useAtom(base64sendAtom)
    const [imageVQA, setImageVQA] = useAtom(imageVQAatom)
    const [hasPermission, setHasPermission] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let cam = useRef();
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log("camera open", status);
        })();
    }, []);

    let snap = async () => {
        setIsLoading(true)
        if (route.params?.isBase64) {
            let photo = await cam.current.takePictureAsync({ base64: true })
            console.log("BASEEEE 64646464----", photo.uri);
            setImage(photo.uri)
            setbase64Send(photo.base64)
            navigation.goBack()
            return
        }
        console.log("taking");
        // console.log(await cam.current.takePictureAsync());
        let photo = await cam.current.takePictureAsync({ base64: false })

        let photoUriName = photo.uri.split("/")[photo.uri.split("/").length - 1]
        console.log("photo", photoUriName);
        let formDt = new FormData()
        formDt.append('photo', {
            uri: photo.uri,
            type: "image/" + photoUriName,
            name: photo.uri.split("/")[photo.uri.split("/").length - 1]
        })
        console.warn("SON FORM DATA---- ", formDt);
        UploadImage({ imageOBJ: formDt }).then(res => {
            let newPhotoUri = consts.API_URL + "/image?image=" + photoUriName
            setImageVQA(newPhotoUri)
            console.log("Response => ", res);
        }).catch(err => {
            console.log(err)
            alert("An Error Occured While Uploading Image")
        })
        navigation.goBack()

    }


    if (hasPermission === null) {
        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                backgroundColor: 'red', alignItems: 'center'
            }}>
                <Text>No access to camera</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return <View style={{
            flex: 1, justifyContent: 'center',
            backgroundColor: 'red', alignItems: 'center'
        }}>
            <Text>No access to camera</Text>
        </View>
    }
    return (
        <>

            <View style={styles.container}>
                <Camera
                    // onCameraReady={() => console.log(cam.current.getSupportedRatiosAsync())}
                    zoom={0.1}
                    ref={cam}
                    ratio={'16:9'}
                    style={styles.camera} type={type}  >


                </Camera>
            </View >
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}>
                <Icon name='camera-reverse' size={30} color={'white'}
                    style={{ borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => !isLoading && snap()}
                    style={styles.takePhoto} >
                    {
                        isLoading ?
                            <ActivityIndicator size={'large'} color='red' />
                            :
                            <Icon name='camera-outline' size={50} color={'white'}
                                style={{
                                    borderRadius: 100,

                                }} />
                    }
                </TouchableOpacity>

            </View>


        </>
    );
}

const styles = StyleSheet.create({
    camera: { width: width, height: height, padding: width / 5 },
    container: {
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer: {
        position: 'absolute', bottom: 100, width: width,
        flexDirection: 'row', alignItems: 'center', opacity: .5, justifyContent: 'center',
        borderRadius: 50


    },
    button: {
        position: 'absolute', backgroundColor: 'black', padding: 15, borderRadius: 100,
        top: 50, right: 20
    },
    text: {
        textAlign: 'center'
    },
    takePhoto: {
        width: 100, height: 100, borderRadius: 100,
        borderWidth: 5, borderColor: 'white',
        justifyContent: 'center', alignItems: 'center', opacity: 1

    }
});


export default CameraOpen;
