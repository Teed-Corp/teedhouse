import AppButton from "@app/components/AppButton";
import { signInWithEmail, signUpWithEmail } from "@app/libs/auth/SupabaseAuth";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import CustomTextField from "@app/components/CustomTextField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ width: "80%" }}>
        <CustomTextField
          value={email}
          placeHolderValue="Email"
          onChangeEvent={setEmail}
        />
        <CustomTextField
          value={password}
          placeHolderValue="Password"
          onChangeEvent={setPassword}
          secureTextEntry
        />
        <>
          <AppButton
            title="Login"
            onPressEvent={() => signInWithEmail(email, password)}
          />
          <Button
            title="Register"
            onPress={() => signUpWithEmail(email, password)}
          />
        </>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
  },
});