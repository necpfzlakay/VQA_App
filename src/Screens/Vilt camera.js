import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { imageAtom } from '../utils/Atoms';
import { useAtom } from 'jotai';


const { width, height } = Dimensions.get('screen')

export default function ViltCamera() {
    const [image, setImage] = useAtom(imageAtom)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    let cam = useRef();
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    let snap = async () => {
        console.log("taking");

        console.log(await cam.current.takePictureAsync());
        let photo = await cam.takePictureAsync()
        console.log("photo", photo);
    }


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera
                ref={cam}

                style={styles.camera} type={type}  >
                <SafeAreaView style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => snap()}
                        style={{
                            width: 100, height: 100, backgroundColor: 'red', borderRadius: 100,
                            justifyContent: 'center', alignItems: 'center'
                        }} >
                        <Text>Snap</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: { flex: 1, },
    container: {
        flex: 1
    },
    buttonContainer: {
        position: 'absolute', bottom: 100, width: width,

    },
    button: {
        flex: 1
    },
    text: {
        textAlign: 'center'
    }
}); 