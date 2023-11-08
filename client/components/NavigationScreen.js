import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import { AuthContext } from "../context/auth";
import HeaderTabs from "./header/HeaderTabs";
import Trajet from "../screens/Trajet";
import Groupe from "../screens/Groupe";
import Profil from "../screens/Profil";
import NouveauGroupe from "../screens/NouveauGroupe";
import NouveauTrajet from "../screens/NouveauTrajet";

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator initialRouteName="Home">
      {authenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerRight: () => <HeaderTabs /> }} />
          <Stack.Screen name="Trajet" component={Trajet} />
          <Stack.Screen name="Groupe" component={Groupe} />
          <Stack.Screen name="Profil" component={Profil} />
          <Stack.Screen name="NouveauGroupe" component={NouveauGroupe} />
          <Stack.Screen name="NouveauTrajet" component={NouveauTrajet} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationScreen;
