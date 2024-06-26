import ErrorText from "@app/components/common/Content/ErrorText";
import ProfilePicture from "@app/components/common/Content/ProfilePicture";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDatePicker from "@app/components/common/Inputs/CustomDatePicker";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import PopUpButton from "@app/components/root/account/PopUpButton";
import { useProfile } from "@app/context/ProfileContext";
import { convertDateToString } from "@app/utils/DateUtils";
import { Ionicons } from "@expo/vector-icons";
import { profile } from "@prisma/client";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function AccountPage({ navigation }) {
  const { getProfile, updateProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<profile>(null);
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleImageSelected = (image: any) => {
    setImage(image);
  };

  const handleSave = async (values: {
    lastname: string;
    firstname: string;
    birthdate: string;
    email: string;
  }) => {
    await updateProfile(
      values.lastname,
      values.firstname,
      dateOfBirth === null ? profile.birthdate : dateOfBirth,
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
      setImage(result.assets[0].uri);
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

  if (isLoading)
    return (
      <View className="justify-center align-middle w-full h-full">
        <CustomLoader />
      </View>
    );

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-grow">
        <View className="mt-5 p-3 justify-center items-center">
          <Divider height={40} />
          <View className="relative w-40 h-40 overflow-hidden">
            {image ? (
              <ProfilePicture
                uri={image}
                imageStyle="w-full h-full rounded-full"
                iconSize={40}
              />
            ) : (
              <View className="w-40 h-40 bg-gray-300 rounded-full flex justify-center items-center">
                <ProfilePicture
                  uri=""
                  imageStyle="w-full h-full rounded-full"
                  iconSize={80}
                />
              </View>
            )}
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
                birthdate: convertDateToString(profile.birthdate),
                email: "todefine@todefine.com",
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
                    handleChange={(date: Date) => {
                      handleChange("birthdate")(convertDateToString(date));
                      setDateOfBirth(date);
                    }}
                    defaultValue={profile.birthdate}
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
                  <Divider height={80} />
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
