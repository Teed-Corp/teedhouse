import ErrorText from "@app/components/common/Content/ErrorText";
import CustomLoader from "@app/components/common/CustomLoader";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useAuth } from "@app/context/AuthContext";
import { useFamily } from "@app/context/FamilyContext";
import { OnBoarding } from "@app/navigation/routes";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const LoginPage = ({ navigation }) => {
  const { loginWithEmail, registerWithEmail } = useAuth();
  const { isJoinedFamily } = useFamily();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
  });

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
    <SafeAreaView className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <KeyboardAvoidingView
          behavior="height"
          className="h-full justify-center items-center"
        >
          <Formik
            initialValues={{
              email,
              password,
            }}
            validationSchema={validationSchema}
            onSubmit={onConfirm}
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
                <View className="w-[80%] rounded-3xl border border-black py-4 px-5 mt-5 bg-white">
                  <Text className="text-3xl font-bold mb-4 text-center">
                    TeedHouse
                  </Text>
                  <Text className="text-xl mb-9 text-center">
                    {isLogin ? "Connectez vous" : "Rejoignez nous"}
                  </Text>
                  <View className="mb-5">
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
                  <View className="mb-5">
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
                    <Text className="text-gradient my-5 text-center">
                      Mot de passe oublié ?
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsLogin(!isLogin);
                    resetForm();
                  }}
                >
                  <Text className="mb-2 mt-3 text-center">
                    {isLogin
                      ? "Vous n'avez pas de compte ?"
                      : "Vous avez déjà un compte ?"}
                  </Text>
                  <Text className="text-gradient font-bold text-center mb-5">
                    {isLogin ? "Rejoignez nous" : "Se connecter"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
