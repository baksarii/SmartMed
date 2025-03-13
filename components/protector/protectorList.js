import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../App";

export default function ProtectorList() {
  const [protectorData, setProtectorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGuardians();
  }, []);

  const fetchGuardians = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      console.log("AsyncStorage에서 가져온 user_id:", userId); // 값 확인
      if (!userId) {
        console.log("user_id가 AsyncStorage에 없음");
        Alert.alert(
          "오류",
          "사용자 정보를 가져올 수 없습니다. 다시 로그인해주세요."
        );
        setIsLoading(false);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        "user-id": userId,
      };
      console.log("전송할 헤더:", headers); // 헤더 확인

      const response = await fetch(`${BASE_URL}/api/guardians`, {
        method: "GET",
        headers,
      });

      const data = await response.json();
      console.log("백엔드 응답 데이터:", data);

      if (!response.ok) {
        console.log("응답 상태 코드:", response.status); // 상태 코드 확인
        Alert.alert("오류", data.error || "보호자 목록을 가져올 수 없습니다.");
        setIsLoading(false);
        return;
      }

      setProtectorData(data.data);
    } catch (error) {
      console.error("보호자 목록 조회 오류:", error);
      Alert.alert("오류", "서버에 연결할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderProtector = ({ item }) => (
    <View style={styles.protectorItem}>
      <Text style={styles.protectorText}>이름: {item.name}</Text>
      <Text style={styles.protectorText}>ID: {item.guardian_id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 목록</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : protectorData.length === 0 ? (
        <Text style={styles.emptyText}>등록된 보호자가 없습니다.</Text>
      ) : (
        <FlatList
          data={protectorData}
          renderItem={renderProtector}
          keyExtractor={(item) => item.guardian_id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: { flex: 1 },
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
  protectorText: { fontSize: 18 },
  loadingText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
