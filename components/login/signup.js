import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function Signup() {
  const [user_id, setUsername] = useState("");
  const [name, setFullname] = useState(""); // 사용자 이름 추가
  const [email, setEmail] = useState("");
  const [passwd, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (
      !user_id.trim() ||
      !name.trim() ||
      !email.trim() ||
      !passwd.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("에러", "모든 필드를 입력해주세요.");
      return;
    }

    if (passwd !== confirmPassword) {
      Alert.alert("에러", "비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("보내는 데이터:", {
      user_id,
      name,
      email,
      passwd,
    });

    try {
      const response = await fetch("http://192.168.45.46:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          name,
          email,
          passwd,
        }),
      });

      const data = await response.json();
      console.log("서버 응답:", data);

      if (!response.ok) {
        Alert.alert("에러", data.error || "회원가입에 실패했습니다.");
        return;
      }

      Alert.alert("성공", data.message || "회원가입 성공!");
    } catch (error) {
      console.error("회원가입 요청 오류:", error);
      Alert.alert("에러", "서버에 연결할 수 없습니다. 다시 시도해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#888"
        value={user_id}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#888"
        secureTextEntry
        value={passwd}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
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
    backgroundColor: "#f5f5f5",
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
  signupButton: {
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
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
