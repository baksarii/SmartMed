import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Protector() {
  const [protectorId, setProtectorId] = useState("");
  const [name, setName] = useState("");

  const saveProtectorInfo = () => {
    if (!protectorId || !name) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    Alert.alert(
      "보호자 추가 완료",
      `보호자 ID: ${protectorId}\n보호자 이름: ${name}`
    );

    // 저장 후 폼 초기화
    setProtectorId("");
    setName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 정보 설정</Text>

      <Text style={styles.label}>보호자 ID</Text>
      <TextInput
        style={styles.input}
        placeholder="보호자 ID를 입력하세요"
        value={protectorId}
        onChangeText={setProtectorId}
      />

      <Text style={styles.label}>보호자 이름</Text>
      <TextInput
        style={styles.input}
        placeholder="보호자 이름을 입력하세요"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveProtectorInfo}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
