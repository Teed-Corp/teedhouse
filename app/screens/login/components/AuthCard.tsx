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
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";

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
  const validationSchemaSignUp = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passes ne correspondent pas",
      )
      .required("Veuillez confirmer votre mot de passe"),
  });

  const navigation: any = useNavigation();

  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
  });

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.pageContainer}>
      <Formik
        initialValues={{
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }}
        validationSchema={
          isLogin ? validationSchemaSignIn : validationSchemaSignUp
        }
        onSubmit={() => {
          onConfirm();
          navigation.navigate("ChooseFamilyPage");
        }}
      >
        {({
          values,
          resetForm,
          touched,
          handleChange,
          handleSubmit,
          errors,
        }) => (
          <>
            <View style={styles.mainContainer}>
              <Text style={styles.titleStyle}>TeedHouse</Text>
              <Text style={styles.subTextStyle}>
                {isLogin ? "Connectez vous" : "Rejoignez nous"}
              </Text>
              <View style={styles.separator}>
                <CustomTextField
                  value={values.email}
                  placeHolderValue="Email"
                  onChangeEvent={(value) => {
                    handleChange("email")(value);
                    setEmail(value);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.separator}>
                <CustomTextField
                  value={values.password}
                  placeHolderValue="Mot de passe"
                  onChangeEvent={(value) => {
                    handleChange("password")(value);
                    setPassword(value);
                  }}
                  isPassword={true}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              {!isLogin ? (
                <View style={styles.separator}>
                  <CustomTextField
                    value={values.confirmPassword}
                    placeHolderValue="Confirmer le mot de passe"
                    onChangeEvent={(value) => {
                      handleChange("confirmPassword")(value);
                      setConfirmPassword(value);
                    }}
                    isPassword={true}
                    secureTextEntry
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              ) : null}
              <AppButton
                title={isLogin ? "Se Connecter" : "S'inscrire"}
                onPressEvent={handleSubmit}
              />
              {isLogin ? (
                <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
            >
              <Text style={styles.goToOtherPageLabelStyle}>
                {isLogin
                  ? "Vous n'avez pas de compte ?"
                  : "Vous avez déjà un compte ?"}
              </Text>
              <Text style={styles.goToOtherPageCtaStyle}>
                {isLogin ? "Rejoignez nous" : "Se connecter"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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

  errorText: {
    color: "red",
    marginTop: 5,
    marginLeft: 5,
  },

  separator: {
    marginBottom: 20,
  },
});

export default AuthCard;
