import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../App"; // App.js에서 BASE_URL 임포트

export default function Home({ navigation }) {
  const [medicationData, setMedicationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // 오늘의 데이터만 저장
  const [isLoading, setIsLoading] = useState(true);

  // 요일 매핑 (한국어와 Date.getDay() 매핑)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    fetchMedications();
  }, []);

  useEffect(() => {
    filterTodayMedications(); // 데이터가 변경될 때마다 오늘의 데이터 필터링
  }, [medicationData]);

  const fetchMedications = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      if (!userId) {
        Alert.alert("오류", "사용자 정보를 가져올 수 없습니다.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/medications?user_id=${userId}`
      );
      const data = await response.json();

      if (!response.ok) {
        Alert.alert("오류", data.error || "복약 일정을 가져올 수 없습니다.");
        return;
      }

      setMedicationData(data.data);
    } catch (error) {
      console.error("복약 일정 조회 오류:", error);
      Alert.alert("오류", "서버에 연결할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 오늘의 요일에 맞는 데이터 필터링
  const filterTodayMedications = () => {
    const today = new Date();
    const todayWeekday = weekdays[today.getDay()]; // 오늘의 요일 (예: "목")
    const filtered = medicationData.filter((item) =>
      item.days_of_week.split(",").includes(todayWeekday)
    );
    setFilteredData(filtered);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "대기"
        ? "완료"
        : currentStatus === "완료"
        ? "실패"
        : "대기";

    try {
      const response = await fetch(
        `http://165.229.229.132:3000/api/medications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("오류", errorData.error || "상태를 변경할 수 없습니다.");
        return;
      }

      setMedicationData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      Alert.alert("성공", `상태가 "${newStatus}"(으)로 변경되었습니다.`);
    } catch (error) {
      console.error("복약 상태 변경 오류:", error);
      Alert.alert("오류", "서버에 연결할 수 없습니다.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <View style={styles.medicationDetails}>
        <Text style={styles.medicationText}>{item.medicine_name}</Text>
        <Text style={styles.subText}>시간: {item.time}</Text>
        <Text style={styles.subText}>요일: {item.days_of_week}</Text>
        <Text style={styles.subText}>
          기간: {new Date(item.start_date).toLocaleDateString("ko-KR")} ~{" "}
          {new Date(
            new Date(item.start_date).setDate(
              new Date(item.start_date).getDate() + item.duration - 1
            )
          ).toLocaleDateString("ko-KR")}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusButton,
          item.status === "완료"
            ? styles.completed
            : item.status === "실패"
            ? styles.failed
            : styles.pending,
        ]}
        onPress={() => toggleStatus(item.id, item.status)}
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
      {isLoading ? (
        <Text style={styles.loadingText}>로딩 중...</Text>
      ) : filteredData.length === 0 ? (
        <Text style={styles.emptyText}>오늘의 복약 일정이 없습니다.</Text>
      ) : (
        <FlatList
          data={filteredData} // 필터링된 데이터 사용
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.reminderButton}
        onPress={() => navigation.navigate("AlertSet")}
      >
        <Text style={styles.reminderButtonText}>알림 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addGuardianButton}
        onPress={() => navigation.navigate("Protector")}
      >
        <Text style={styles.addGuardianButtonText}>보호자 추가</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewProtectorButton}
        onPress={() => navigation.navigate("ProtectorList")}
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
  medicationDetails: {
    flex: 1,
  },
  medicationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  completed: {
    backgroundColor: "#28a745", // 초록색 (복용 완료)
  },
  failed: {
    backgroundColor: "#dc3545", // 빨간색 (복용 실패)
  },
  pending: {
    backgroundColor: "#ffc107", // 노란색 (복용 대기)
  },
  statusButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
