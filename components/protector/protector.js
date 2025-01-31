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
  const [userId, setUserId] = useState(""); // 사용자 ID
  const [protectorId, setProtectorId] = useState("");
  const [name, setName] = useState("");

  const saveProtectorInfo = async () => {
    if (!userId.trim() || !protectorId.trim() || !name.trim()) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    try {
      console.log("보호자 데이터 요청:", {
        user_id: userId.trim(),
        guardian_id: protectorId.trim(),
        name: name.trim(),
      });
      const response = await fetch(
        "http://192.168.45.46:3000/api/add-guardian",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId.trim(),
            guardian_id: protectorId.trim(),
            name: name.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("오류", data.error || "보호자 정보를 저장할 수 없습니다.");
        return;
      }

      Alert.alert("성공", "보호자 정보가 성공적으로 저장되었습니다.");

      // 저장 후 폼 초기화
      setUserId("");
      setProtectorId("");
      setName("");
    } catch (error) {
      console.error("보호자 정보 저장 오류:", error);
      Alert.alert("오류", "서버에 연결할 수 없습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 정보 설정</Text>

      <Text style={styles.label}>사용자 ID</Text>
      <TextInput
        style={styles.input}
        placeholder="사용자 ID를 입력하세요"
        value={userId}
        onChangeText={setUserId}
      />

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
