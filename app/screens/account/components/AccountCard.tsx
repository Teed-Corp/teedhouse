import ErrorText from "@app/components/Content/ErrorText";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDatePicker from "@app/components/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

export default function AccountCard({
  userName,
  userSurname,
  dof,
  email,
  stats,
}: {
  userName: string;
  userSurname: string;
  dof: string;
  email: string;
  stats: string;
}) {
  const validationSchema = Yup.object().shape({
    userSurname: Yup.string().required("Un nom est requis"),
    userName: Yup.string().required("Un prénom est requis"),
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    dof: Yup.string().required("Une date de naissance est requise"),
  });

  return (
    <View style={{ width: "90%" }}>
      <Formik
        initialValues={{
          userSurname,
          userName,
          dof,
          email,
          stats,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, touched, handleChange, handleSubmit, errors }) => (
          <View>
            <CustomTextField
              value={values.userSurname}
              onChangeEvent={handleChange("userSurname")}
              placeHolderValue="Nom"
              displayTopPlaceHolder
            />
            {errors.userSurname && touched.userSurname && (
              <ErrorText error={errors.userSurname} />
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.userName}
              onChangeEvent={handleChange("userName")}
              placeHolderValue="Prénom"
              displayTopPlaceHolder
            />
            {errors.userName && touched.userName && (
              <ErrorText error={errors.userName} />
            )}
            <Divider height={10} />
            <CustomDatePicker
              placeHolder="Date de naissance"
              displayTopPlaceHolder
              handleChange={handleChange("dof")}
            />
            {errors.dof && touched.dof && <ErrorText error={errors.dof} />}
            <Divider height={10} />
            <CustomTextField
              value={values.email}
              onChangeEvent={handleChange("email")}
              placeHolderValue="Email"
              displayTopPlaceHolder
            />
            {errors.email && touched.email && (
              <ErrorText error={errors.email} />
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
              <ErrorText error={errors.stats} />
            )}
            <Divider height={50} />
            <AppButton title="Enregistrer" onPressEvent={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
