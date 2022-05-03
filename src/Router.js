import react from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useAtom } from "jotai";
import { userAuth } from "./utils/Atoms";
import AuthNav from "./Navigation/AuthNav";
import MainNav from "./Navigation/MainNav";




const Router = () => {
    const [user, setUser] = useAtom(userAuth)
    console.log("UUSERRRR--ROUTER---", user);
    return (

        <NavigationContainer >
            {
                user ?

                    <MainNav />
                    :
                    <AuthNav />

            }

        </NavigationContainer>


    )

}


export default Router;