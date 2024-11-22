import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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

//TODO: Add navigation
export default function Index() {
  return (
    <View style={styles.container}>
      {/* <Welcome /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <PasswordRecovery /> */}
      {/* <LoadingScreen message="Verifying the code..." /> */}
      {/* <ResetPassword /> */}
      {/* <MainView /> */}
      {/* <RateUserScreen infos={{name: "John Doe", distance: 2}} /> */}
      {/* <MessagingScreen /> */}
      {/* <Settings /> */}
      {/* <Conversations /> */}
      {/* <Profile /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});