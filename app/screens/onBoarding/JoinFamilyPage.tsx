import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useFamily } from "@app/context/FamilyContext";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const JoinFamilyPage = () => {
  const { joinFamily } = useFamily();
  const [familyCode, setFamilyCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    familyCode: Yup.string()
      .required("Un code est requis")
      .min(6, "Le code doit contenir au moins 6 caractères"),
  });

  const handleJoinFamily = async () => {
    setIsLoading(true);
    const { error } = await joinFamily(familyCode);
    setIsLoading(false);
    if (error) alert(error);
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
            <View className="w-full h-full px-5">
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-grow"
              >
                <Divider height={40} />
                <View className="items-center">
                  <HeaderIcon icon="users" />
                </View>
                <Divider height={24} />
                <HeaderTitle value={"Rejoindre\n une famille"} />
                <Divider height={20} />
                <Text className="text-sm text-center">
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
                  <View className="w-full justify-start items-start">
                    <Text className="bg-red-500 ml-1 mt-1">
                      {errors.familyCode}
                    </Text>
                  </View>
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

export default JoinFamilyPage;
