import ErrorText from "@app/components/common/Content/ErrorText";
import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDatePicker from "@app/components/common/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useProfile } from "@app/context/ProfileContext";
import { OnBoarding } from "@app/navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const GetUserInformationPage = () => {
  const { createProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("Un nom est requis"),
    firstname: Yup.string().required("Un prénom est requis"),
    dateOfBirth: Yup.string().required("Une date de naissance est requise"),
  });

  const navigation: any = useNavigation();

  const handlePushUserInformation = async () => {
    setIsLoading(true);
    const parts = dateOfBirth.split("/");
    await createProfile(
      lastname,
      firstname,
      new Date(Number(parts[0]), Number(parts[1]), Number(parts[2])),
    );
    navigation.replace(OnBoarding.ChooseFamilyPage);
    setIsLoading(false);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height">
        <Formik
          initialValues={{
            lastname: "",
            firstname: "",
            dateOfBirth: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handlePushUserInformation}
        >
          {({ values, touched, handleChange, handleSubmit, errors }) => (
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                <HeaderIcon icon="user" />
                <Divider height={24} />
                <HeaderTitle value="Votre compte" />
                <Divider height={20} />
                <Text style={styles.text}>
                  Veuillez entrer vos informations
                </Text>
                <Divider height={20} />
                <CustomTextField
                  value={values.lastname}
                  onChangeEvent={(value) => {
                    handleChange("lastname")(value);
                    setLastname(value);
                  }}
                  placeHolderValue="Nom"
                  displayTopPlaceHolder
                  autoCapitalize="characters"
                />
                {errors.lastname && touched.lastname && (
                  <ErrorText error={errors.lastname} />
                )}
                <Divider height={24} />
                <CustomTextField
                  value={values.firstname}
                  onChangeEvent={(value) => {
                    handleChange("firstname")(value);
                    setFirstname(value);
                  }}
                  placeHolderValue="Prénom"
                  displayTopPlaceHolder
                  autoCapitalize="characters"
                />
                {errors.firstname && touched.firstname && (
                  <ErrorText error={errors.firstname} />
                )}
                <Divider height={24} />
                <CustomDatePicker
                  placeHolder="Date de naissance"
                  displayTopPlaceHolder
                  handleChange={(date) => {
                    handleChange("dateOfBirth")(date);
                    setDateOfBirth(date);
                  }}
                />
                {errors.dateOfBirth && touched.dateOfBirth && (
                  <ErrorText error={errors.dateOfBirth} />
                )}
                <Divider height={24} />
                {isLoading ? (
                  <CustomLoader />
                ) : (
                  <AppButton title="Continuer" onPressEvent={handleSubmit} />
                )}
              </ScrollView>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  errorContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  errorText: {
    color: "red",
    marginLeft: 4,
    marginTop: 5,
  },
});

export default GetUserInformationPage;
