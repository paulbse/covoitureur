import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, FlatList, TouchableOpacity, ScrollView, View, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RejoindreGroupe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim().length === 0) {
      // Affichez un message d'erreur ou bloquez la soumission
      console.error("Le champ 'Nom du groupe' ne peut pas être vide.");
      return;
    }

    try {
      setLoading(true);

      console.log('Je souhaite rejoindre le groupe :', searchTerm);

      const response = await axios.get(`/api/groups/search?groupName=${searchTerm}`);
      
      if (response && response.data && response.data.groups) {
        setSearchResults(response.data.groups);

        // Log pour vérifier si la navigation est atteinte
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

  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
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
      </ScrollView>

      <View contentContainerStyle={styles.container}>  
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.nom}
        renderItem={({ item }) => (
          <View key={item.nom}>
            <Text>{item.nom}</Text>
            {/* Ajoutez ici d'autres informations du groupe si nécessaire */}
          </View>
        )}
      />
      </View>
    </View>
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
});

export default RejoindreGroupe;
