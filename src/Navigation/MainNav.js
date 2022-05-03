

import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import Tabs from "./TabsNav";
import SettingsScreen from "../Screens/Settings/SettingsScreen";
import ViltCamera from "../Screens/Vilt camera";


const Stack = createStackNavigator();

const headerOptions = {

    headerShown: true,
    headerStyle: { backgroundColor: '#0E0738', },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: '#312D45', },
    tabBarLabelStyle: { color: '#C4C4C4', },


}

const MainNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Tabs" key={"Home"} component={Tabs} />

            <Stack.Screen options={{
                headerShown: true, ...headerOptions, headerBackTitle: 'back',
                headerBackTitleVisible: true
            }}
                name="Settings" key={"Settings"} component={SettingsScreen}
            />

            <Stack.Screen
                name="camera" key={"camera"} component={ViltCamera} />



        </Stack.Navigator>
    )
}

export default MainNav;