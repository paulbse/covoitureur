import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const NouveauTrajet = () => {
  const [trip, setTrip] = useState({
    date: '',
    conducteur: '',
    group: '',
    passagers:[],
  });

  const handleInputChange = (value, index) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      trip: prevTrip.passagers.map((passager, i) =>
        i === index ? { ...passager, nom: value } : passager
      ),
    }));
  };

  const handleAddPassager = () => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      passagers: [...prevTrip.passagers, { nom: '' }],
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {

      setLoading(true);

      console.log('Nouveau trajet à enregistrer :', JSON.stringify(trip));

      const response = await axios.post('/api/new_trip', trip);
           

      if (response && response.data) {

        console.log('Réponse Axios réussie:', response.data)
            
        // Log pour vérifier si la navigation est atteinte
        console.log('Avant la navigation vers Home');

        // Retarder la navigation de 500 millisecondes
        setTimeout(() => {
          navigation.navigate("Home");
          console.log('Après la navigation vers Home');
        }, 500);

      } else {
        console.error('Pas de data dans la réponse Axios');
        Alert.alert("Erreur lors de la création du trajet");
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
      Alert.alert("Erreur lors de la création du trajet");
    } finally {
      setLoading(false);
      console.log("fin de chargement")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOUVEAU TRAJET</Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={(text) => setTrip({ ...trip, date: text })}
        value={trip.date}
      />
      <TextInput
        style={styles.input}
        placeholder="Conducteur"
        onChangeText={(text) => setTrip({ ...trip, conducteur: text })}
        value={trip.conducteur}
      />
      <TextInput
        style={styles.input}
        placeholder="Groupe"
        onChangeText={(text) => setTrip({ ...trip, group: text })}
        value={trip.group}
      />
      {trip.passagers.map((passager, index) => (
        <TextInput
          key={`passager-${index}`}
          style={styles.input}
          placeholder="Rentre le nom des passagers"
          onChangeText={(text) => handleInputChange(text, index)}
          value={passager.nom}
      />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleAddPassager}>
        <Text style={styles.buttonText}>AJOUTER UN AUTRE PASSAGER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? 'gray' : 'black' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'ENREGISTREMENT EN COURS...' : 'ENREGISTRER LE TRAJET'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NouveauTrajet;
