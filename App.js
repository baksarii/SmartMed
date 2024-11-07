import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login/login";
import Signup from "./components/login/signup";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
