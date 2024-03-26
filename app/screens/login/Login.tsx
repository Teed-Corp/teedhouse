import { signInWithEmail, signUpWithEmail } from "@app/libs/auth/SupabaseAuth";
import AuthCard from "@app/screens/login/components/AuthCard";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const onConfirm = async () => {
    if (isLogin) {
      await signInWithEmail(email, password);
    } else {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
      } else {
        await signUpWithEmail(email, password);
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
