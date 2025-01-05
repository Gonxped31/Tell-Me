import React from "react";
import Welcome from "@/src/components/auth/welcome";
import Login from "@/src/components/auth/login";
import SignUp from "@/src/components/auth/signup";
import PasswordRecovery from "@/src/components/auth/passwordRecovery";
import ResetPassword from "@/src/components/auth/resetPassword";
import MainView from "@/src/components/main/mainVIew";
import RateUserScreen from "@/src/components/main/rateUserScreen";
import MessagingScreen from "@/src/components/main/messagingScreen";
import Settings from "@/src/components/main/settings";
import Conversations from "@/src/components/main/messagesList";
import Profile from "@/src/components/main/profile";
import EmailForRecovery from "@/src/components/auth/emailForRecovery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "@/src/hooks/useAuth";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthScreens = () => (
  <AuthStack.Navigator initialRouteName="welcome"  screenOptions={{ headerShown: false }}>
    <AuthStack.Screen
      name="welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="signup"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="passRecovery"
      component={PasswordRecovery}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="resetPassword"
      component={ResetPassword}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
    <AuthStack.Screen
      name="emailForRecovery"
      component={EmailForRecovery}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
  </AuthStack.Navigator>
);

const MainScreens = () => (
  <MainStack.Navigator initialRouteName="home">
    <MainStack.Screen
      name="home"
      component={MainView}
      options={{ title: "Home", headerShown: false }}
    />
    <MainStack.Screen
      name="profile"
      component={Profile}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
    <MainStack.Screen
      name="conversations"
      component={Conversations}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
    <MainStack.Screen
      name="settings"
      component={Settings}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
    <MainStack.Screen
      name="rateUser"
      component={RateUserScreen}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
    <MainStack.Screen
      name="messaging"
      component={MessagingScreen}
      options={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFF",
      }}
    />
  </MainStack.Navigator>
);

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <MainScreens /> : <AuthScreens />}
      <Toast />
    </>
  );
};

export default () => (
  <AuthProvider>
    <Index />
  </AuthProvider>
);
