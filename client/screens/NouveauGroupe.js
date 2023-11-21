import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const MonGroupe = () => {
  const [group, setGroup] = useState({
    nom: '',
    trajetUsuel: '',
    membres: [{ userId: '' }],
  });

  const handleInputChange = (value, index) => {
    const membres = [...group.membres];
    membres[index]['userId'] = value;
    setGroup({ ...group, membres });
  };

  const handleAddMember = () => {
    setGroup({ ...group, membres: [...group.membres, { userId: '' }] });
  };

  const handleSubmit = async () => {
    try {
      if (group.nom === "") {
        alert("Choisis un nom pour ton groupe");
        return;
      }
  
      console.log('Nouveau groupe à enregistrer :', group);
  
      const response = await axios.post('/api/new_group', group);
  
      if (response && response.data) {
        console.log(response.data);
        alert("Groupe créé");
        navigation.navigate("Home");
      } else {
        console.error('Pas de data dans la réponse Axios');
        alert("Erreur lors de la création du groupe");
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
      alert("Erreur lors de la création du groupe");
    }
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
          placeholder="Rentre l'ID Covoit des membres"
          onChangeText={(text) => handleInputChange(text, index)}
          value={member.userId}
      />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleAddMember}>
        <Text style={styles.buttonText}>AJOUTER UN AUTRE MEMBRE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>ENREGISTRER LE GROUPE</Text>
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
});

export default MonGroupe;
