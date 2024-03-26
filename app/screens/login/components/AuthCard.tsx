import AppButton from "@app/components/AppButton";
import CustomTextField from "@app/components/CustomTextField";
import theme from "@app/utils/theme";
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
    <View style={styles.pageContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}>TeedHouse</Text>
        <Text style={styles.subTextStyle}>
          {isLogin ? "Connectez vous" : "Rejoignez nous"}
        </Text>
        <KeyboardAvoidingView behavior="padding" style={{ width: "80%" }}>
          <CustomTextField
            value={email}
            placeHolderValue="Email"
            onChangeEvent={setEmail}
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
        </KeyboardAvoidingView>
      </View>
      <Text style={styles.goToOtherPageLabelStyle}>
        {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
      </Text>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.goToOtherPageCtaStyle}>
          {isLogin ? "Rejoignez nous" : "Se connecter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  mainContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 15,
  },

  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  subTextStyle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  forgotPassword: {
    color: theme.gradientColor,
    marginVertical: 20,
    textAlign: "center",
  },
  goToOtherPageLabelStyle: {
    color: theme.primary,
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
  },

  goToOtherPageCtaStyle: {
    color: theme.gradientColor,
    fontWeight: "bold",
  },
});

export default AuthCard;
