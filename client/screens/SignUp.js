import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  // const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    if (name === "" || password === "" || email === "") {
      alert("Tous les champs sont requis");
      return;
    }
    try {
      const resp = await axios.post("/api/signup", {
        name,
        // prenom,
        email,
        password,
      });
      console.log(resp.data);
      if (resp.data.error) alert(resp.data.error);
      else {
        setState(resp.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
        alert("Sign Up Successful");
        navigation.navigate("Home");
      }

    } catch (e) {
      alert("Login failed");
      console.error(e);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/capture.png")}
            style={styles.imageStyles}
          />
        </View>
        <Text style={styles.signupText}>SignUp</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>NOM</Text>
          <TextInput
            style={styles.signupInput}
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
        {/* <View style={{ marginHorizontal: 24 }}>
            <Text style={{ fontSize: 16, color: "#8e93a1" }}>PRENOM</Text>
            <TextInput
              style={styles.signupInput}
              value={prenom}
              onChangeText={(text) => setPrenom(text)}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View> */}
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>EMAIL</Text>
          <TextInput
            style={styles.signupInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoComplete="email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>MOT DE PASSE</Text>
          <TextInput
            style={styles.signupInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoComplete="password"
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          Already Joined?{" "}
          <Text
            style={{ color: "darkred", fontWeight: "bold" }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
          </Text>
        </Text>
        <Text style={{ marginHorizontal: 24 }}>
          {JSON.stringify({ email, name, password })}{" "}
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  signupText: {
    fontSize: 38,
    textAlign: "center",
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: "darkmagenta",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default SignUp;
