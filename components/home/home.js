import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// 샘플 데이터 (약 복용 일정)
const initialMedicationData = [
  { id: "1", name: "아스피린", time: "08:00 AM", status: "대기" },
  { id: "2", name: "비타민 D", time: "12:00 PM", status: "완료" },
  { id: "3", name: "오메가3", time: "06:00 PM", status: "실패" },
];

export default function Home({ navigation }) {
  const [medicationData, setMedicationData] = useState(initialMedicationData);

  // 복용 상태를 순환하여 변경하는 함수
  const toggleStatus = (id) => {
    setMedicationData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "대기"
                  ? "완료"
                  : item.status === "완료"
                  ? "실패"
                  : "대기",
            }
          : item
      )
    );
  };

  // 복용 일정 목록 렌더링
  const renderItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <Text style={styles.medicationText}>
        {item.name} - {item.time}
      </Text>
      <TouchableOpacity
        style={[
          styles.statusButton,
          item.status === "완료"
            ? styles.completed
            : item.status === "실패"
            ? styles.failed
            : styles.pending,
        ]}
        onPress={() => toggleStatus(item.id)}
      >
        <Text style={styles.statusButtonText}>
          {item.status === "완료"
            ? "복용 완료"
            : item.status === "실패"
            ? "복용 실패"
            : "복용 대기"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 복용 일정</Text>
      <FlatList
        data={medicationData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.reminderButton}
        onPress={() => navigation.navigate("AlertSet")} // AlertSet 화면으로 이동
      >
        <Text style={styles.reminderButtonText}>알림 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addGuardianButton}
        onPress={() => navigation.navigate("Protector")} // Protector 화면으로 이동
      >
        <Text style={styles.addGuardianButtonText}>보호자 추가</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewProtectorButton}
        onPress={() => navigation.navigate("ProtectorList")} // ProtectorList 화면으로 이동
      >
        <Text style={styles.viewProtectorButtonText}>보호자 목록 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
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
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  medicationText: {
    fontSize: 18,
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  completed: {
    backgroundColor: "#28a745", // 녹색 (완료)
  },
  failed: {
    backgroundColor: "#dc3545", // 빨간색 (실패)
  },
  pending: {
    backgroundColor: "#ffc107", // 노란색 (대기)
  },
  statusButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reminderButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  reminderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addGuardianButton: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addGuardianButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewProtectorButton: {
    backgroundColor: "#32cd32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  viewProtectorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
