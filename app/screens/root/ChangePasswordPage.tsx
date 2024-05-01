import ErrorText from "@app/components/common/Content/ErrorText";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { Formik } from "formik";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const ChangePasswordPage = () => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Le mot de passe actuel est requis"),
    newPassword: Yup.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères")
      .required("Le mot de passe est requis"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Les mots de passe ne correspondent pas",
      )
      .required("La confirmations de mot de passe est requise"),
  });
  const handleChangePassword = async () => {};

  return (
    <SafeAreaView className="flex justify-start px-5">
      <ScrollView>
        <Divider height={80} />
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <CustomTextField
                value={values.oldPassword}
                onChangeEvent={(value) => {
                  handleChange("oldPassword")(value);
                }}
                placeHolderValue="Mot de passe Actuel"
                displayTopPlaceHolder
                secureTextEntry
              />
              {errors.oldPassword && touched.oldPassword && (
                <ErrorText error={errors.oldPassword} />
              )}
              <Divider height={20} />
              <CustomTextField
                value={values.newPassword}
                onChangeEvent={(value) => {
                  handleChange("newPassword")(value);
                }}
                placeHolderValue="Nouveau mot de passe"
                displayTopPlaceHolder
                secureTextEntry
              />
              {errors.newPassword && touched.newPassword && (
                <ErrorText error={errors.newPassword} />
              )}
              <Divider height={20} />
              <CustomTextField
                value={values.confirmPassword}
                onChangeEvent={(value) => {
                  handleChange("confirmPassword")(value);
                }}
                placeHolderValue="Confirmer le mot de passe"
                displayTopPlaceHolder
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <ErrorText error={errors.confirmPassword} />
              )}
              <Divider height={40} />
              <AppButton
                title="Changer le mot de passe"
                onPressEvent={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordPage;
