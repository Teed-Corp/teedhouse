import ErrorText from "@app/components/Content/ErrorText";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import CustomLoader from "@app/components/CustomLoader";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDatePicker from "@app/components/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/Inputs/CustomTextField";
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
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Un nom est requis"),
    surname: Yup.string().required("Un prénom est requis"),
    dateOfBirth: Yup.string().required("Une date de naissance est requise"),
  });

  const navigation: any = useNavigation();

  const handlePushUserInformation = async () => {
    setIsLoading(true);
    navigation.replace(OnBoarding.ChooseFamilyPage);
    setIsLoading(false);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height">
        <Formik
          initialValues={{
            name: "",
            surname: "",
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
                  value={values.name}
                  onChangeEvent={handleChange("name")}
                  placeHolderValue="Nom"
                  displayTopPlaceHolder
                  autoCapitalize="characters"
                />
                {errors.name && touched.name && (
                  <ErrorText error={errors.name} />
                )}
                <Divider height={24} />
                <CustomTextField
                  value={values.surname}
                  onChangeEvent={handleChange("surname")}
                  placeHolderValue="Prénom"
                  displayTopPlaceHolder
                  autoCapitalize="characters"
                />
                {errors.surname && touched.surname && (
                  <ErrorText error={errors.surname} />
                )}
                <Divider height={24} />
                <CustomDatePicker
                  placeHolder="Date de naissance"
                  displayTopPlaceHolder
                  handleChange={handleChange("dateOfBirth")}
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
