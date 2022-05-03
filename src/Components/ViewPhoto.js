import react from "react";
import { Dimensions, Image, Text, TouchableNativeFeedback, View } from "react-native";

const { height } = Dimensions.get('window')

const ViewPhoto = ({ img, onPressFunc }) => {
    // console.log(img);
    return (
        <View style={{
            flex: 1, backgroundColor: 'silver', margin: 15, maxHeight: height / 2, minHeight: height / 4,
            borderRadius: 25, justifyContent: 'center', alignItems: 'center'
        }}>
            <Text style={{ fontSize: 30 }}>Image</Text>
            {img ?
                <View style={{
                    alignItems: 'center', paddingVertical: 20,
                    // backgroundColor: 'lightgrey',
                    width: '90%', height: '80%', justifyContent: 'center',
                    borderRadius: 30
                }}>


                    <Image source={{ uri: img }}
                        style={{
                            width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 30
                        }} />


                    <TouchableNativeFeedback onPress={() => onPressFunc && onPressFunc()}>
                        <Text style={{
                            fontSize: 18, borderWidth: 1, padding: 20, paddingVertical: 10,
                            borderRadius: 10,
                        }}>Submit</Text>
                    </TouchableNativeFeedback>
                </View>
                :
                <Text>Your Photo will be shown in here</Text>
            }
        </View>
    )
}

export default ViewPhoto;