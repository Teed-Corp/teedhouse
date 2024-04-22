import useAuth from "@app/hooks/Auth";
import { OnBoarding } from "@app/navigation/routes";
import AuthCard from "@app/screens/onBoarding/components/AuthCard";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = ({ navigation }) => {
  const { loginWithEmail, registerWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);
    if (isLogin) {
      const { error } = await loginWithEmail(email, password);

      if (!error) {
        navigation.replace(OnBoarding.GetUserInformationPage);
      } else {
        console.log(error);
        alert(error.message);
      }
    } else {
      const { error } = await registerWithEmail(email, password);

      if (!error) {
        navigation.replace(OnBoarding.GetUserInformationPage);
      } else {
        console.log(error);
        alert(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <AuthCard
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            onConfirm={onConfirm}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default LoginPage;
