import ErrorText from "@app/components/common/Content/ErrorText";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDatePicker from "@app/components/common/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useProfile } from "@app/context/ProfileContext";
import { convertStringToDate } from "@app/utils/DateUtils";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

export default function AccountCard({
  lastname,
  firstname,
  birthdate,
  email,
  stats,
}: {
  lastname: string;
  firstname: string;
  birthdate: string;
  email: string;
  stats: string;
}) {
  const { updateProfile } = useProfile();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("Un nom est requis"),
    firstname: Yup.string().required("Un prénom est requis"),
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    birthdate: Yup.string().required("Une date de naissance est requise"),
  });

  const handleSave = async (values: {
    lastname: string;
    firstname: string;
    birthdate: string;
    email: string;
    stats: string;
  }) => {
    await updateProfile(
      values.lastname,
      values.firstname,
      convertStringToDate(values.birthdate),
    );
    navigation.goBack();
  };

  return (
    <View style={{ width: "90%" }}>
      <Formik
        initialValues={{
          firstname,
          lastname,
          birthdate,
          email,
          stats,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ values, touched, handleChange, handleSubmit, errors }) => (
          <View>
            <CustomTextField
              value={values.lastname}
              onChangeEvent={handleChange("lastname")}
              placeHolderValue="Nom"
              displayTopPlaceHolder
            />
            {errors.lastname && touched.lastname && (
              <ErrorText error={errors.lastname as string} />
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.firstname}
              onChangeEvent={handleChange("firstname")}
              placeHolderValue="Prénom"
              displayTopPlaceHolder
            />
            {errors.firstname && touched.firstname && (
              <ErrorText error={errors.firstname as string} />
            )}
            <Divider height={10} />
            <CustomDatePicker
              placeHolder="Date de naissance"
              displayTopPlaceHolder
              handleChange={handleChange("birthdate")}
              defaultValue={values.birthdate}
            />
            {errors.birthdate && touched.birthdate && (
              <ErrorText error={errors.birthdate as string} />
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.email}
              onChangeEvent={handleChange("email")}
              placeHolderValue="Email"
              displayTopPlaceHolder
            />
            {errors.email && touched.email && (
              <ErrorText error={errors.email as string} />
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.stats}
              onChangeEvent={handleChange("stats")}
              editable={false}
              placeHolderValue="Stats"
              displayTopPlaceHolder
            />
            {errors.stats && touched.stats && (
              <ErrorText error={errors.stats as string} />
            )}
            <Divider height={50} />
            <AppButton title="Enregistrer" onPressEvent={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
