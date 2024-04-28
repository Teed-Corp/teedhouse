import AuthCard from "@app/components/onBoarding/AuthCard";
import { useAuth } from "@app/context/AuthContext";
import { useFamily } from "@app/context/FamilyContext";
import { OnBoarding } from "@app/navigation/routes";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = ({ navigation }) => {
  const { loginWithEmail, registerWithEmail } = useAuth();
  const { isJoinedFamily } = useFamily();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);
    if (isLogin) {
      const { error } = await loginWithEmail(email, password);

      if (!error && !isJoinedFamily) {
        navigation.replace(OnBoarding.GetUserInformationPage);
      } else {
        alert(error.message);
      }
    } else {
      const { error } = await registerWithEmail(email, password);

      if (!error && !isJoinedFamily) {
        navigation.replace(OnBoarding.GetUserInformationPage);
      } else {
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
