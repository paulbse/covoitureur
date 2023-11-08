import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FooterList from "../components/footer/FooterList";
import { useNavigation } from "@react-navigation/native";

const groupData = {
  groups: [
    {
      id: "group1",
      nextMeeting: "XXX",
      city: "CHAUDEFONT",
      date: "16/10/18",
      members: [
        {
          name: "NOM PRENOM",
          email: "ADRESSE MAIL",
        },
        {
          name: "NOM PRENOM",
          email: "ADRESSE MAIL",
        },
      ],
    },
  ],
};

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MES GROUPES</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("NouveauTrajet")}
          >
            AJOUTER UN TRAJET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NouveauGroupe")}
        >
          <Text style={styles.buttonText}>CRÉER UN GROUPE</Text>
        </TouchableOpacity>
      </View>
      {groupData.groups.map((group, index) => (
        <View key={group.id} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>GROUPE {index + 1}</Text>
          <Text style={styles.groupInfo}>
            PROCHAIN CONDUCTEUR: {group.nextMeeting}
          </Text>
        </View>
      ))}
      <FooterList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  mainText: { fontSize: 30, textAlign: "center" },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  groupContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  groupTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  groupInfo: {
    textAlign: "center",
    marginVertical: 5,
  },
  memberContainer: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingVertical: 5,
  },
  memberInfo: {
    textAlign: "center",
  },
});

export default Home;
