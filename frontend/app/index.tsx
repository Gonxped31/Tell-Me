import Welcome from "@/components/auth/welcome";
import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signup";
import PasswordRecovery from "@/components/auth/passwordRecovery";
import ResetPassword from "@/components/auth/resetPassword";
import MainView from "@/components/main/mainVIew";
import RateUserScreen from "@/components/main/rateUserScreen";
import MessagingScreen from "@/components/main/messagingScreen";
import Settings from "@/components/main/settings";
import Conversations from "@/components/main/messagesList";
import Profile from "@/components/main/profile";
import EmailForRecovery from "@/components/auth/emailForRecovery";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/hooks/useAuth";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName="welcome">
        {/* Auth screens */}
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="passRecovery"
          component={PasswordRecovery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="resetPassword"
          component={ResetPassword}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="emailForRecovery"
          component={EmailForRecovery}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />



        {/* Main screens */}
        <Stack.Screen
          name="home"
          component={MainView}
          options={{
            title: "Home",
            headerShown: false
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="conversations"
          component={Conversations}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="rateUser"
          component={RateUserScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="messaging"
          component={MessagingScreen}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
      <Toast/>
    </AuthProvider>
  );
}

export default Index;