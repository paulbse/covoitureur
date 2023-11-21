import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Profil = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useContext(AuthContext);
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });
  const [uploadImage, setUploadImage] = useState("");

  useEffect(() => {
    if (state) {
      const { name, email, role, image } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, [state]);

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      alert("All fields are required");
      return;
    }
    const resp = await axios.post("/api/signin", {
      email,
      password,
    });
    if (resp.data.error) alert(resp.data.error);
    else {
      setState(resp.data);
      await AsyncStorage.setItem("auth-rn", JSON.stringify(resp.data));
      alert("Sign In Successful");
      navigation.navigate("Home");
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
     base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    let storedData = await AsyncStorage.getItem("auth-rn");
    const parsed = JSON.parse(storedData);
    const { data } = await axios.post(
      "/api/upload-image",
      {
        image: base64Image,
        user: parsed.user,
      }
    );
    console.log("UPLOADED RESPONSE => ", data);
    //update async storage
    const stored = JSON.parse(await AsyncStorage.getItem("auth-rn"));
    stored.user = data;
    await AsyncStorage.setItem("auth-rn", JSON.stringify(stored));
    //update contexte
    setState({ ...state, user: data});
    setImage(data.image);
    alert("Profile image saved")
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 100 }}>
        <View style={styles.imageContainer}>
          {image && image.url ? (
            <Image source={{ uri: image.url }} style={styles.imageStyles} />
          ) : uploadImage ? (
            <Image source={{ uri: uploadImage }} style={styles.imageStyles} />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <FontAwesome5Icon name="camera" size={25} color="darkmagenta" />
            </TouchableOpacity>
          )}
        </View>
        {image && image.url ? (
          <TouchableOpacity onPress={() => handleUpload()}>
            <FontAwesome5Icon
              name="camera"
              size={25}
              color="darkmagenta"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <Text style={styles.signupText}>{name}</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.roleText}>{role}</Text>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: "#8e93a1" }}>MOT DE PASSE</Text>
          <TextInput
            style={styles.signupInput}
            values={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCompleteType="password"
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  iconStyle: { marginTop: -5, marginBottom: 10, alignSelf: "center" },
  container: { flex: 1, justifyContent: "center" },
  signupText: { fontSize: 30, textAlign: "center", paddingBottom: 10 },
  emailText: { fontSize: 18, textAlign: "center", paddingBottom: 10 },
  roleText: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
    color: "gray",
  },
  signupInput: {
    borderBottomwidth: 0.5,
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
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 },
});

export default Profil;
