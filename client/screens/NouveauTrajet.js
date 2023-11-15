import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const NouveauTrajet = () => {
  const [trip, setTrip] = useState({
    date: '',
    driver: '',
    group: '',
  });

  const handleInputChange = (name, value) => {
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to submit the data goes here
    // For example, you could call an API to save the trip information
    console.log(trip);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOUVEAU TRAJET</Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={(text) => handleInputChange('date', text)}
        value={trip.date}
      />
      <TextInput
        style={styles.input}
        placeholder="Conducteur"
        onChangeText={(text) => handleInputChange('driver', text)}
        value={trip.driver}
      />
      <TextInput
        style={styles.input}
        placeholder="Groupe"
        onChangeText={(text) => handleInputChange('group', text)}
        value={trip.group}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ENREGISTRER</Text>
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
