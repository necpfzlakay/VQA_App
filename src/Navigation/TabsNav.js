import { useEffect } from 'react'
import { ImageBackground, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VQA from "../Screens/VQA";
import Vilt from "../Screens/Vilt";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileTab from '../Screens/tabs/ProfileTab';
import { useFocusEffect } from '@react-navigation/native';



const Tab = createBottomTabNavigator();

const tabOptions = {

    headerShown: true,
    headerStyle: { backgroundColor: '#0E0738', },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: '#312D45', },
    tabBarLabelStyle: { color: '#C4C4C4', },

}





const Tabs = ({ navigation }) => {
    useEffect(() => {

        console.log("render");
    }, [navigation])
    return (
        <Tab.Navigator screenOptions={{ headerShown: true, }}>
            <Tab.Screen name={`VQA`} key={"VQA"} component={VQA}
                options={{
                    ...tabOptions,
                    tabBarIcon: () => (
                        <Ionicons name="home-outline" size={25} color={'white'} />
                    ),
                }}
            />
            <Tab.Screen name="Vilt" key={"Vilt"} component={Vilt}
                options={{
                    ...tabOptions,
                    tabBarIcon: () => (
                        <Ionicons name="image-outline" size={25} color={'white'} />
                    ),
                }}
            />
            <Tab.Screen name="Profile" key={"Profile"} component={ProfileTab}
                options={{
                    ...tabOptions,
                    tabBarIcon: () => (
                        <Ionicons name="person-outline" size={25} color={'white'} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs