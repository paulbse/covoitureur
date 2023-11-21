import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';

const RejoindreGroupe = () => {
  const [group, setGroup] = useState({
    groupName: '',
    trip: '',
    members: [{ email: '' }],
  });

  const handleInputChange = (value, index) => {
    const members = [...group.members];
    members[index]['email'] = value;
    setGroup({ ...group, members });
  };

  const handleAddMember = () => {
    setGroup({ ...group, members: [...group.members, { email: '' }] });
  };

  const handleSubmit = () => {
    // Logic to submit the data goes here
    // This is where you would call an API to save the group information
    console.log(group);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>REJOINDRE GROUPE</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom du groupe"
        onChangeText={(text) => setGroup({ ...group, groupName: text })}
        value={group.groupName}
      />
      <TextInput
        style={styles.input}
        placeholder="groupId"
        onChangeText={(text) => setGroup({ ...group, trip: text })}
        value={group.trip}
      />
      {group.members.map((member, index) => (
        <TextInput
          key={`member-${index}`}
          style={styles.input}
          placeholder="Adresse mail du membre"
          onChangeText={(text) => handleInputChange(text, index)}
          value={member.email}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>REJOINDRE LE GROUPE</Text>
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

export default RejoindreGroupe;
