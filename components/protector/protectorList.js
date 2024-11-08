import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// 샘플 보호자 데이터
const initialProtectorData = [
  { id: "1", name: "김보호", protectorId: "protector_1" },
  { id: "2", name: "이보호", protectorId: "protector_2" },
];

export default function ProtectorList() {
  const [protectorData, setProtectorData] = useState(initialProtectorData);

  const renderProtector = ({ item }) => (
    <View style={styles.protectorItem}>
      <Text style={styles.protectorText}>이름: {item.name}</Text>
      <Text style={styles.protectorText}>ID: {item.protectorId}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 목록</Text>
      <FlatList
        data={protectorData}
        renderItem={renderProtector}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  protectorItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  protectorText: {
    fontSize: 18,
  },
});
