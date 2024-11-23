import Welcome from "@/components/auth/welcome";
import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signup";
import PasswordRecovery from "@/components/auth/passwordRecovery";
import LoadingScreen from "@/components/utils/loadingScreen";
import ResetPassword from "@/components/auth/resetPassword";
import MainView from "@/components/main/mainVIew";
import RateUserScreen from "@/components/main/rateUserScreen";
import MessagingScreen from "@/components/main/messagingScreen";
import Settings from "@/components/main/settings";
import Conversations from "@/components/main/messagesList";
import Profile from "@/components/main/profile";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <Stack.Navigator initialRouteName="welcome">
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
        name="home"
        component={MainView}
        options={{
          title: "Home",
          // headerBackVisible: false
          headerShown: false
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
      />
      <Stack.Screen
        name="conversations"
        component={Conversations}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
      />
      <Stack.Screen
        name="passRecovery"
        component={PasswordRecovery}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
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
        name="rateUser"
        component={RateUserScreen}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
      />
      <Stack.Screen
        name="messaging"
        component={MessagingScreen}
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: '#000', // Change header background color
          },
          headerTintColor: '#FFF', // Change back button color
        }}
      />
    </Stack.Navigator>
  );
}

export default Index;