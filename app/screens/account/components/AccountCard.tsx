import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
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
    email: Yup.string().email("Email invalide").required("Un email est requis"),
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
              <Text>{errors.userSurname}</Text>
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.userName}
              onChangeEvent={handleChange("userName")}
              placeHolderValue="Prénom"
              displayTopPlaceHolder
            />
            {errors.userName && touched.userName && (
              <Text>{errors.userName}</Text>
            )}
            <Divider height={10} />
            <CustomTextField
              value={values.dof}
              onChangeEvent={handleChange("dof")}
              placeHolderValue="Date de naissance"
              displayTopPlaceHolder
            />
            {errors.dof && touched.dof && <Text>{errors.dof}</Text>}
            <Divider height={10} />
            <CustomTextField
              value={values.email}
              onChangeEvent={handleChange("email")}
              placeHolderValue="Email"
              displayTopPlaceHolder
            />
            {errors.email && touched.email && <Text>{errors.email}</Text>}
            <Divider height={10} />
            <CustomTextField
              value={values.stats}
              onChangeEvent={handleChange("stats")}
              editable={false}
              placeHolderValue="Stats"
              displayTopPlaceHolder
            />
            {errors.stats && touched.stats && <Text>{errors.stats}</Text>}
            <Divider height={50} />
            <AppButton title="Enregistrer" onPressEvent={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}
