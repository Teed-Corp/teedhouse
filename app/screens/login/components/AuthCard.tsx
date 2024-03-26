import { Button, KeyboardAvoidingView, View } from "react-native";
import CustomTextField from "@app/components/CustomTextField";
import AppButton from "@app/components/AppButton";
import { signInWithEmail, signUpWithEmail } from "@app/libs/auth/SupabaseAuth";
import React from "react";

const AuthCard = () => {
  return (
    // TODO
    <View>
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
