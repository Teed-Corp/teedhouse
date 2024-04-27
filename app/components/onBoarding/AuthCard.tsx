import ErrorText from "@app/components/common/Content/ErrorText";
import CustomLoader from "@app/components/common/CustomLoader";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import theme from "@app/theme/theme";
import { Formik } from "formik";
import React, { Dispatch } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const AuthCard = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  onConfirm,
  isLoading,
}: {
  email: string;
  setEmail: Dispatch<string>;
  password: string;
  setPassword: Dispatch<string>;
  isLogin: boolean;
  setIsLogin: Dispatch<boolean>;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
  });

  return (
    <KeyboardAvoidingView behavior="height" style={styles.pageContainer}>
      <Formik
        initialValues={{
          email,
          password,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          onConfirm();
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
                  <ErrorText error={errors.email} />
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
                  isPassword
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <ErrorText error={errors.password} />
                )}
              </View>
              {isLoading ? (
                <CustomLoader />
              ) : (
                <AppButton
                  title={isLogin ? "Se Connecter" : "S'inscrire"}
                  onPressEvent={handleSubmit}
                />
              )}
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
    backgroundColor: "white",
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

  separator: {
    marginBottom: 20,
  },
});

export default AuthCard;
