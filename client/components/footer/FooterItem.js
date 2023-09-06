import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FooterItem = ({ name, text, handlePress, screenName, routeName }) => {
  const activeSceenColor = screenName === routeName && "darkmagenta"

  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <FontAwesome5 name={name} size={25} style={styles.fontStyle} color={activeSceenColor} />
        <Text style={styles.iconText}>{text}</Text>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fontStyle: { marginBottom: 3, alignSelf: "center" },
  iconText: { fontSize: 12, textAlign: "center", textTransform: "uppercase" },
});

export default FooterItem;
