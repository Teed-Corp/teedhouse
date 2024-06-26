import { useAuth } from "@app/context/AuthContext";
import { OnBoarding, Root } from "@app/navigation/routes";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import Divider from "@app/components/common/Divider";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import ErrorText from "@app/components/common/Content/ErrorText";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomLoader from "@app/components/common/CustomLoader";
import { useFamily } from "@app/context/FamilyContext";

const LoginPage = ({ navigation }) => {
  const { loginWithEmail } = useAuth();
  const { isJoinedFamily } = useFamily();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères")
      .required("Un mot de passe est requis"),
  });

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
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              const { error } = await loginWithEmail(
                values.email,
                values.password,
              );

              if (!error && !isJoinedFamily) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: OnBoarding.GetUserInformationPage }],
                });
              } else if (!error && isJoinedFamily) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: Root.HomePage }],
                });
              } else {
                alert(error.message);
              }

              setIsLoading(false);
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ values, touched, handleChange, handleSubmit, errors }) => (
              <SafeAreaView className="w-full h-full px-5">
                <Divider height={30} />
                <Text className="text-3xl font-bold">Bonjour</Text>
                <Divider height={30} />
                <Text className="text-xl">
                  Accédez à l'application en vous connectant à votre compte
                </Text>
                <Divider height={30} />
                <CustomTextField
                  value={values.email}
                  keyboardType="email-address"
                  onChangeEvent={handleChange("email")}
                  autoCapitalize="none"
                  displayTopPlaceHolder
                  placeHolderValue="Email"
                />
                {errors.email && touched.email && (
                  <ErrorText error={errors.email} />
                )}
                <Divider height={20} />
                <CustomTextField
                  value={values.password}
                  displayTopPlaceHolder
                  placeHolderValue="Mot de passe"
                  onChangeEvent={handleChange("password")}
                  isPassword
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <ErrorText error={errors.password} />
                )}
                <Divider height={40} />
                {isLoading ? (
                  <CustomLoader />
                ) : (
                  <AppButton title="Se connecter" onPressEvent={handleSubmit} />
                )}
              </SafeAreaView>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
