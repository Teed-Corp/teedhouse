import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import useAuth from "@app/hooks/Auth";
import AuthCard from "@app/screens/login/components/AuthCard";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const { loginWithEmail, registerWithEmail, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const onConfirm = async () => {
    if (isLogin) {
      const { error } = await loginWithEmail(email, password);

      if (!error) {
        alert("Login successful");
      } else {
        console.log(error);
        alert(error.message);
      }
    } else {
      const { error } = await registerWithEmail(
        email,
        password,
        confirmPassword,
      );

      if (!error) {
        alert("Registration successful");
      } else {
        console.log(error);
        alert(error.message);
      }
    }
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
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onConfirm={onConfirm}
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
