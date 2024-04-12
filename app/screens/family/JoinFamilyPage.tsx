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
import useFamily from "@app/hooks/Family";

const JoinFamilyPage = () => {
  const { joinFamily } = useFamily();
  const [familyCode, setFamilyCode] = useState("");

  const validationSchema = Yup.object().shape({
    familyCode: Yup.string()
      .required("Un code est requis")
      .min(6, "Le code doit contenir au moins 6 caractères"),
  });

  const handleJoinFamily = async () => {
    await joinFamily(familyCode);
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height">
        <Formik
          initialValues={{ familyCode }}
          validationSchema={validationSchema}
          onSubmit={handleJoinFamily}
        >
          {({ values, touched, handleChange, handleSubmit, errors }) => (
            <View style={styles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                <HeaderIcon icon="users" />
                <Divider height={24} />
                <HeaderTitle value={"Rejoindre\n une famille"} />
                <Divider height={20} />
                <Text style={styles.text}>
                  Veuillez entrer le code de votre famille
                </Text>
                <Divider height={20} />
                <CustomTextField
                  value={values.familyCode}
                  onChangeEvent={(value) => {
                    handleChange("familyCode")(value);
                    setFamilyCode(value);
                  }}
                  placeHolderValue="Code de la famille"
                  displayTopPlaceHolder
                  autoCapitalize="characters"
                />
                {errors.familyCode && touched.familyCode && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.familyCode}</Text>
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

export default JoinFamilyPage;
