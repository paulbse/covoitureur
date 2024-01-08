import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList } from 'react-native';
import FooterList from "../components/footer/FooterList";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { AuthContext } from '../context/auth';

const Home = () => {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [state, setState] = useContext(AuthContext)

  useEffect(() => {
    // Replace 'userEmail' with the actual email of the logged-in user
    const userEmail = state.user.email;

    // Fetch groups by user email
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`/api/groups/byUserEmail?userEmail=${userEmail}`);
        
        if (response && response.data && response.data.groups) {
          setGroups(response.data.groups);
        } else {
          console.error('No data in the response from the server');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []); // Empty dependency array to run the effect only once

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RejoindreGroupe")}
        >
          <Text style={styles.buttonText}>REJOINDRE UN GROUPE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.nom}
        renderItem={({ item, index }) => (
          <View key={item.nom} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{item.nom}</Text>
            <Text style={styles.groupInfo}>{item.trajetUsuel}</Text>
            <Text style={styles.groupInfo}>Membres:</Text>
            {item.membres.map((membre, membreIndex) => (
              <Text key={membreIndex} style={styles.memberInfo}>
                {membre.userMail}
              </Text>
            ))}
          </View>
        )}
      />

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
    marginTop: 10,
  },
  groupTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  groupInfo: {
    textAlign: "center",
    marginVertical: 5,
  },
  memberInfo: {
    textAlign: "center",
  },
});

export default Home;
