import react, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";




const ChosePhoto = ({ pickImage }) => {
    const [image, setImage] = useState(null);



    return (
        <View style={{
            flex: 1, backgroundColor: 'silver', margin: 15,
            borderRadius: 40
        }}>
            <View style={{
                flexDirection: 'row', margin: 15,
                flex: 1
            }}>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        source={{ uri: "http://cdn.onlinewebfonts.com/svg/img_34785.png" }}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}

                    />
                    <Text style={{ textAlign: 'center' }}>
                        pick image from gallery
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <Image
                        source={{ uri: "http://cdn.onlinewebfonts.com/svg/img_573677.png" }}
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}

                    />
                    <Text style={{ textAlign: 'center' }}>
                        Take Photo via camera
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ChosePhoto;