import React from 'react'
import ImageBg from '../../Layouts/ImageBackground'
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import Ionicon from 'react-native-vector-icons/Ionicons'
import Ant from 'react-native-vector-icons/AntDesign'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userAuth } from '../../utils/Atoms'
import { useAtom } from 'jotai';


const { height, width } = Dimensions.get('screen')

const SettingsScreen = () => {

    const [user, setUser] = useAtom(userAuth)

    const styles = getStyles()

    return (

        <ImageBg>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttons}>
                    <Ionicon name='lock-closed-outline' color={'white'} size={25} />
                    <Text style={styles.btnText}>
                        Security
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Ant name='questioncircleo' color={'white'} size={25} />
                    <Text style={styles.btnText}>
                        About
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => setUser("")} >
                    <Ionicon name='log-out-outline' color={'white'} size={25} />
                    <Text style={styles.btnText}>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBg>

    )
}


export default SettingsScreen;

const getStyles = () => StyleSheet.create({
    container: {
        flex: 1,
        margin: 50
    },
    buttons: {
        // backgroundColor: 'red',
        flexDirection: 'row', alignItems: 'center',
        marginVertical: 30
    },
    btnText: {
        fontSize: 20, color: 'white', marginLeft: 20
    }
})