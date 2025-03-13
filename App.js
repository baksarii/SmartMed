export const BASE_URL = "http://165.229.229.132:3000";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login/login";
import Signup from "./components/login/signup";
import Home from "./components/home/home";
import AlertSet from "./components/alertSet/alertSet";
import Protector from "./components/protector/protector";
import ProtectorList from "./components/protector/protectorList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "로그인" }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: "회원가입" }}
        />
        <Stack.Screen name="Home" component={Home} options={{ title: "홈" }} />
        <Stack.Screen
          name="AlertSet"
          component={AlertSet}
          options={{ title: "알림 설정" }}
        />
        <Stack.Screen
          name="Protector"
          component={Protector}
          options={{ title: "보호자 추가" }}
        />
        <Stack.Screen
          name="ProtectorList"
          component={ProtectorList}
          options={{ title: "보호자 목록" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
