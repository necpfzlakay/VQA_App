import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import Auth from "../Screens/Auth/Auth";



const Stack = createStackNavigator();
const tabOptions = {

    headerShown: true,
    headerStyle: { backgroundColor: '#0E0738', },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: '#312D45', },
    tabBarLabelStyle: { color: '#C4C4C4', },

}
const AuthNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, 
            }}>
            <Stack.Screen 
                name="Auth" key={"Auth"} component={Auth} />


        </Stack.Navigator>
    )
}

export default AuthNav;
