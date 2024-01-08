import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/auth';

const RejoindreGroupe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSearch = async () => {  
    if (searchTerm.trim().length === 0) {
      console.error("Le champ 'Nom du groupe' ne peut pas être vide.");
      return;
    }

    try {
      setLoading(true);

      console.log('Je souhaite rejoindre le groupe :', searchTerm);

      const response = await axios.get(`/api/groups/search?groupName=${searchTerm}`);
      
      if (response && response.data && response.data.groups) {
        setSearchResults(response.data.groups);

        console.log('Réponse Axios réussie:', response.data);
        console.log('searchResults:', searchResults);
        console.log('Avant la navigation vers Home');
      } else {
        console.error('Pas de données dans la réponse Axios');
        Alert.alert("Aucun groupe trouvé avec ce nom.");
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
      Alert.alert("Erreur lors de la recherche du groupe");
    } finally {
      setLoading(false);
      console.log("Fin de chargement");
    }
  };

  const joinGroup = async (groupName) => {
    try {
      setLoading(true);
  
      // Remplacez 'userEmail' par l'email de l'utilisateur connecté
      const userEmail = state.user.email;
  
      // Check if the user is already a member of the group
      const isUserAlreadyMember = searchResults.some(
        (group) => group.nom === groupName && group.membres.some((membre) => membre.userMail === userEmail)
      );
  
      if (isUserAlreadyMember) {
        Alert.alert('Déjà membre', 'Vous êtes déjà membre de ce groupe.');
        return;
      }
  
      const response = await axios.post('/api/join_group', {
        groupName,
        memberEmail: userEmail,
      });
  
      if (response && response.data && response.data.group) {
        Alert.alert('Succès', 'Vous avez rejoint le groupe avec succès!');
      } else {
        Alert.alert('Erreur', 'Erreur lors de la tentative de rejoindre le groupe');
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
      Alert.alert('Erreur', 'Erreur lors de la tentative de rejoindre le groupe');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REJOINDRE GROUPE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du groupe"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>REJOINDRE LE GROUPE</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="black" />}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.nom}
        renderItem={({ item }) => (
          <View key={item.nom} style={styles.groupContainer}>
            <Text>Nom du groupe: {item.nom}</Text>
            <Text>Trajet: {item.trajetUsuel}</Text>
            <Text>Membres:</Text>
            {item.membres.map((membre) => (
              <Text key={membre.userMail}>{membre.userMail}</Text>
            ))}
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => joinGroup(item.nom)}
            >
              <Text style={styles.buttonText}>Rejoindre</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  groupContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  joinButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'stretch',
  },
});

export default RejoindreGroupe;
