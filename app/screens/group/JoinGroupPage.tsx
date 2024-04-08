import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomTextField from "@app/components/Inputs/CustomTextField";
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

const JoinGroupPage = () => {
  const [groupCode, setGroupCode] = useState("");

  const validationSchema = Yup.object().shape({
    groupCode: Yup.string()
      .required("Un code est requis")
      .min(6, "Le code doit contenir au moins 6 caractères"),
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height">
        <Formik
          initialValues={{ groupCode }}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log("ok");
          }}
        >
          {({ values, touched, handleChange, handleSubmit, errors }) => (
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                <HeaderIcon icon="users" />
                <Divider height={24} />
                <HeaderTitle value={"Rejoindre\n un groupe"} />
                <Divider height={20} />
                <Text style={styles.text}>
                  Veuillez entrer le code de votre groupe
                </Text>
                <Divider height={20} />
                <CustomTextField
                  value={values.groupCode}
                  onChangeEvent={(value) => {
                    handleChange("groupCode")(value);
                    setGroupCode(value);
                  }}
                  placeHolderValue="Code du groupe"
                  displayTopPlaceHolder
                />
                {errors.groupCode && touched.groupCode && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.groupCode}</Text>
                  </View>
                )}
                <Divider height={24} />
                <AppButton
                  title="Continuer"
                  onPressEvent={() => {
                    handleSubmit();
                  }}
                />
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

export default JoinGroupPage;
