import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterItem from "./FooterItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterList = () => {
const navigation = useNavigation();
const route = useRoute();

  return (
    <View style={styles.container}>
      <FooterItem text="Home" name="home" screenName="Home" handlePress={() => navigation.navigate("Home")} routeName={route.name} />
      <FooterItem text="Mes trajets" name="plus-square" screenName="Trajet" handlePress={() => navigation.navigate("Trajet")} routeName={route.name} />
      <FooterItem text="Mes groupes" name="list-ol" screenName="Groupe" handlePress={() => navigation.navigate("Groupe")} routeName={route.name} />
      <FooterItem text="Mon profil" name="user" screenName="Profil" handlePress={() => navigation.navigate("Profil")} routeName={route.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    marginHorizontal: 30,
    justifyContent: "space-between",
  },
});

export default FooterList;
