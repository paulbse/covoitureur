import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import FooterList from "../components/footer/FooterList";

const tripData = {
  "trips": [
    {
      "date": "19/11/22",
      "driver": "Matthieu Boissé",
      "group": "Groupe 1"
    },
    {
      "date": "19/11/22",
      "driver": "Matthieu Boissé",
      "group": "Groupe 1"
    },
  ]
}

const Trajet = () => {
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.date}</Text>
      <Text style={styles.itemText}>{item.driver}</Text>
      <Text style={styles.itemText}>{item.group}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>SUIVI DES TRAJETS</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportText}>
              Exporter les données sous Format Excel/CSV
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tripData.trips}
          renderItem={renderItem}
          keyExtractor={(item, index) => `trip-${index}`}
          ListHeaderComponent={() => (
            <View style={styles.listItem}>
              <Text style={styles.itemHeader}>Date</Text>
              <Text style={styles.itemHeader}>Conducteur</Text>
              <Text style={styles.itemHeader}>Groupe</Text>
            </View>
          )}
        />
      </View>
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
  headerContainer: {
    backgroundColor: "#000",
    padding: 10,
  },
  header: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  exportText: {
    color: "#000",
    textAlign: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    color: "#000",
  },
  itemHeader: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default Trajet;
