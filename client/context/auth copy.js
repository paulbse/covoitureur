import React, { useEffect, useState, createContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  // navigation
  const navigation = useNavigation();

  // config axios
  const token = state && state.token ? state.token : "";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
  // handle expired token or 401 error
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
  
    async function (error) {
      if (error.response && error.response.status === 401 && !error.config._isRetryRequest) {
        await AsyncStorage.removeItem("auth-rn");
        setState({ user: null, token: "" });
        navigation.navigate("SignIn");
      }
      return Promise.reject(error); // Rejette l'erreur pour qu'elle puisse être gérée ailleurs si nécessaire.
    }
  );

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("auth-rn");
      const parsed = JSON.parse(data);
      if (parsed && parsed.user && parsed.token) {
        setState({ ...state, user: parsed.user, token: parsed.token });
      } else {
        'wtffff'
        console.log('wtffffffff')
      }
    };
    loadFromAsyncStorage();
  }, []);
  

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
