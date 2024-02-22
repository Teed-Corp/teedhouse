import { signIn, signUp } from "@app/libs/auth/FirebaseAuth";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="password"
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <>
          <Button title="Login" onPress={() => signIn(email, password)} />
          <Button title="Register" onPress={() => signUp(email, password)} />
        </>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
  },
});
