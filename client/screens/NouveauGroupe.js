import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import axios from 'axios';

const MonGroupe = () => {

  const [state, setState] = useContext(AuthContext);

  const navigation = useNavigation();

  const [group, setGroup] = useState({
    nom: '',
    trajetUsuel: '',
    membres: [{ userMail: state.user.email}],
  });
  
  console.log(group)

  const [loading, setLoading] = useState(false);

  const handleInputChange = (value, index) => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      membres: prevGroup.membres.map((member, i) =>
        i === index ? { ...member, userMail: value } : member
      ),
    }));
  };
  
  const handleAddMember = () => {
    setGroup((prevGroup) => ({
      ...prevGroup,
      membres: [...prevGroup.membres, { userMail: '' }],
    }));
  };
  
  const handleSubmit = async () => {
    if (group.membres.length === 0) {
      // Display an error message or prevent submission
      console.error("Le champ 'membres' ne peut pas être vide.");
      return;
    }
  
    try {
      setLoading(true);
      console.log('Nouveau groupe à enregistrer :', JSON.stringify(group));
  
      const response = await axios.post('/api/new_group', group, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response && response.data) {
        console.log('Réponse Axios réussie:', response.data);
  
        // Log to check if navigation is reached
        console.log('Avant la navigation vers Home');
  
        // Delay navigation by 500 milliseconds
        setTimeout(() => {
          navigation.navigate("Home");
          console.log('Après la navigation vers Home');
        }, 500);
      } else {
        console.error('Pas de data dans la réponse Axios');
        Alert.alert("Erreur lors de la création du groupe");
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
  
      if (error.response && error.response.status === 400) {
        // Handle duplicate group name error
        Alert.alert("Erreur lors de la création du groupe", "Un groupe avec ce nom existe déjà.");
      } else {
        // Handle other errors
        Alert.alert("Erreur lors de la création du groupe");
      }
    } finally {
      setLoading(false);
      console.log("fin de chargement");
    };
  };  
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>NOUVEAU GROUPE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du groupe"
        onChangeText={(text) => setGroup({ ...group, nom: text })}
        value={group.nom}
      />
      <TextInput
        style={styles.input}
        placeholder="Trajet"
        onChangeText={(text) => setGroup({ ...group, trajetUsuel: text })}
        value={group.trajetUsuel}
      />
      {group.membres.map((member, index) => (
        <TextInput
          key={`member-${index}`}
          style={styles.input}
          placeholder="Rentre l'email des membres du group"
          onChangeText={(text) => handleInputChange(text, index)}
          value={member.userMail}
      />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleAddMember}>
        <Text style={styles.buttonText}>AJOUTER UN AUTRE MEMBRE</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" style={styles.spinner} />
          <Text style={styles.loadingText}>Enregistrement en cours...</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? 'gray' : 'black' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'ENREGISTREMENT EN COURS...' : 'ENREGISTRER LE GROUPE'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  
  loadingText: {
    marginTop: 10,
    color: 'gray',
  },
  
  spinner: {
    marginVertical: 20,
  },
});

export default MonGroupe;
