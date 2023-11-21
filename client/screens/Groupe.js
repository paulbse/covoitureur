import { StyleSheet, Text, SafeAreaView, View } from "react-native";

import React from "react";

import FooterList from "../components/footer/FooterList";           
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

const Groupe = () => {
  return (
    <SafeAreaView style={styles.container}>
      {groupData.groups.map((group, index) => (
        <View key={group.id} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>GROUPE {index + 1}</Text>
          <Text style={styles.groupInfo}>
            PROCHAIN RENDEZ-VOUS: {group.nextMeeting}
          </Text>
          <Text style={styles.groupInfo}>VILLE: {group.city}</Text>
          <Text style={styles.groupInfo}>DATE: {group.date}</Text>
          {group.members.map((member) => (
            <View key={member.email} style={styles.memberContainer}>
              <Text style={styles.memberInfo}>
                {member.name} - {member.email}
              </Text>
            </View>
          ))}
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
    backgroundColor: "#fff",
  },
  mainText: { fontSize: 30, textAlign: "center" },
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

export default Groupe;
