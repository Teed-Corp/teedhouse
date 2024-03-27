import AppButton from "@app/components/AppButton";
import CustomTextField from "@app/components/CustomTextField";
import theme from "@app/theme/theme";
import React, { Dispatch } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AuthCard = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  confirmPassword,
  setConfirmPassword,
  onConfirm,
}: {
  email: string;
  setEmail: Dispatch<string>;
  password: string;
  setPassword: Dispatch<string>;
  isLogin: boolean;
  setIsLogin: Dispatch<boolean>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<string>;
  onConfirm: () => void;
}) => {
  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.pageContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}>TeedHouse</Text>
        <Text style={styles.subTextStyle}>
          {isLogin ? "Connectez vous" : "Rejoignez nous"}
        </Text>
        <CustomTextField
          value={email}
          placeHolderValue="Email"
          onChangeEvent={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextField
          value={password}
          placeHolderValue="Mot de passe"
          onChangeEvent={setPassword}
          secureTextEntry
        />
        {!isLogin ? (
          <CustomTextField
            value={confirmPassword}
            placeHolderValue="Confirmer le mot de passe"
            onChangeEvent={setConfirmPassword}
            secureTextEntry
          />
        ) : null}
        <AppButton
          title={isLogin ? "Se Connecter" : "S'inscrire"}
          onPressEvent={onConfirm}
        />
        {isLogin ? (
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.goToOtherPageLabelStyle}>
          {isLogin
            ? "Vous n'avez pas de compte ?"
            : "Vous avez déjà un compte ?"}
        </Text>
        <Text style={styles.goToOtherPageCtaStyle}>
          {isLogin ? "Rejoignez nous" : "Se connecter"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    width: "80%",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  subTextStyle: {
    fontSize: 20,
    marginBottom: 35,
    textAlign: "center",
  },
  forgotPassword: {
    color: theme.gradientColor,
    marginVertical: 20,
    textAlign: "center",
  },
  goToOtherPageLabelStyle: {
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
  },

  goToOtherPageCtaStyle: {
    color: theme.gradientColor,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default AuthCard;
