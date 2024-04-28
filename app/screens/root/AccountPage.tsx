import ErrorText from "@app/components/common/Content/ErrorText";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDatePicker from "@app/components/common/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import PopUpButton from "@app/components/root/account/PopUpButton";
import { useProfile } from "@app/context/ProfileContext";
import { convertStringToDate } from "@app/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import { profile } from "@prisma/client";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function AccountPage({ navigation }) {
  const { getProfile, updateProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<profile>(null);
  const [image, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageSelected = (image: any) => {
    setSelectedImage(image);
  };

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

  const pickImage = async (isGalerie: boolean) => {
    const options: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = isGalerie
      ? await ImagePicker.launchImageLibraryAsync(options)
      : await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("Un nom est requis"),
    firstname: Yup.string().required("Un prénom est requis"),
    email: Yup.string().email("Email invalide").required("Un email est requis"),
    birthdate: Yup.string().required("Une date de naissance est requise"),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
      setIsLoading(false);
    };

    if (image) {
      handleImageSelected(image);
      handleClosePopup();
    }

    fetchProfile().catch(console.error);
  }, [image]);

  if (isLoading) return null;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-grow">
        <View className="mt-5 p-3 justify-center items-center">
          <Text className="text-2xl font-bold mb-4 text-center">
            {" "}
            Ton Profil
          </Text>
          <View className="relative w-40 h-40 overflow-hidden">
            <Image
              className="w-full h-full rounded-full"
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/defaultProfile.jpg")
              }
            />
            <TouchableOpacity
              className="absolute bottom-1 right-1 bg-primary w-10 h-10 rounded-full justify-center items-center"
              onPress={() => {
                setShowPopup(true);
              }}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%" }}>
            <Formik
              initialValues={{
                firstname: profile.firstname,
                lastname: profile.lastname,
                birthdate: `${profile.birthdate.getFullYear()}/${profile.birthdate.getMonth() + 1}/${profile.birthdate.getDate()}`,
                email: "todefine@todefine.com",
                stats: "toremove?",
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
        </View>
        <Modal
          animationType="fade"
          transparent
          visible={showPopup}
          onRequestClose={() => setShowPopup(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-[#00000080] justify-center items-center"
            onPress={handleClosePopup}
            activeOpacity={1}
          >
            <View className="w-74 h-full mx-8 justify-center items-center">
              <View className="bg-white p-5 rounded-lg h-40 items-center">
                <Text className="text-lg font-bold mb-4 text-center text-primary">
                  Photo de profile
                </Text>
                <Divider height={10} />
                <View style={{ flexDirection: "row", width: "80%" }}>
                  <PopUpButton title="Galerie" onPressEvent={pickImage} />
                  <Divider width={10} />
                  <PopUpButton title="Caméra" onPressEvent={pickImage} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
