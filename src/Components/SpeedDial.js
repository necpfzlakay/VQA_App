import React, { useState } from 'react';
import { SpeedDial } from 'react-native-elements';

export default ({ chose_photo }) => {
    const [open, setOpen] = useState(false);
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
                onPress={chose_photo && chose_photo}
            />
            <SpeedDial.Action
                icon={{ name: 'camera', color: '#fff' }}
                title="Camera"
                onPress={() => console.log('Delete Something')}
            />
        </SpeedDial>
    );
};