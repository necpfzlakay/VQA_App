import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SpeedDial } from 'react-native-elements';
export default ({ chose_photo }) => {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false);
    function goCamera(params) {
        navigation.navigate("camera")
        setOpen(false)
    }
    function photoChose(params) {
        chose_photo()
        setOpen(false)
    }
    return (
        <SpeedDial
            isOpen={open}
            icon={{ name: 'image', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
        >
            <SpeedDial.Action
                icon={{ name: 'photo', color: '#fff' }}
                title="Add"
                onPress={chose_photo && photoChose}
            />
            <SpeedDial.Action
                icon={{ name: 'camera', color: '#fff' }}
                title="Camera"
                onPress={goCamera}
            />
        </SpeedDial>
    );
};