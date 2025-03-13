import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import
import { BASE_URL } from "../../App"; // App.js에서 BASE_URL 임포트

export default function Login({ navigation }) {
  const [user_id, setUsername] = useState("");
  const [passwd, setPassword] = useState(""); // 여전히 passwd 사용

  const handleLogin = async () => {
    if (!user_id.trim() || !passwd.trim()) {
      Alert.alert("에러", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      console.log("로그인 요청 데이터:", { user_id, passwd });
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          passwd, // 여전히 passwd 사용
        }),
      });

      console.log("응답 상태:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("에러 응답 데이터:", errorData);
        Alert.alert(
          "로그인 실패",
          errorData.error || "잘못된 아이디 또는 비밀번호입니다."
        );
        return;
      }

      const data = await response.json();
      console.log("성공 응답 데이터:", data);

      // 로그인 성공 시 AsyncStorage에 user_id 저장
      await AsyncStorage.setItem("user_id", user_id.trim());
      console.log("AsyncStorage에 저장된 user_id:", user_id.trim());

      Alert.alert("로그인 성공", "환영합니다!", [
        {
          text: "확인",
          onPress: () => navigation.navigate("Home"),
        },
      ]);
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      Alert.alert("에러", "서버에 연결할 수 없습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#888"
        value={user_id}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#888"
        secureTextEntry
        value={passwd}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    color: "#333",
  },
  input: {
    width: "85%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  loginButton: {
    width: "85%",
    height: 45,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupButton: {
    width: "85%",
    height: 45,
    borderColor: "#007bff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  signupButtonText: {
    color: "#007bff",
    fontSize: 18,
    fontWeight: "600",
  },
});
