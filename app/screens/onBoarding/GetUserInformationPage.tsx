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
import { convertStringToDate } from "@app/utils/DateUtils";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const GetUserInformationPage = () => {
  const { updateProfile } = useProfile();
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
    await updateProfile(lastname, firstname, convertStringToDate(dateOfBirth));
    navigation.replace(OnBoarding.ChooseFamilyPage);
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="pt-5">
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
            <View className="w-full h-full px-5">
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-grow"
              >
                <View className="items-center">
                  <HeaderIcon icon="user" />
                </View>
                <Divider height={24} />
                <HeaderTitle value="Votre compte" />
                <Divider height={20} />
                <Text className="text-sm text-center">
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

export default GetUserInformationPage;
