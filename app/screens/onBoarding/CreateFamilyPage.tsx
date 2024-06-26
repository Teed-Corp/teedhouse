import ErrorText from "@app/components/common/Content/ErrorText";
import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDropdown from "@app/components/common/Inputs/CustomDropDown";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useFamily } from "@app/context/FamilyContext";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateFamilyPage = () => {
  const { createFamily } = useFamily();
  const [homeType, setHomeType] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const data = [
    { label: "Maison", value: "Maison" },
    { label: "Appartement", value: "Appartement" },
    { label: "Villa", value: "Villa" },
  ];

  const onConfirm = async () => {
    setIsLoading(true);
    setDisplayError(true);
    if (familyName !== null && homeType !== null) {
      setShowPopup(true);
    }
    setIsLoading(false);
  };

  const handleCreateFamily = async (withDefaultTasks: boolean) => {
    setIsLoading(true);
    const { error } = await createFamily(familyName, withDefaultTasks);
    if (error) alert(error);
    setIsLoading(false);
  };

  const renderItem = () => (
    <KeyboardAvoidingView behavior="height">
      <View className="flex flex-grow justify-center items-center mb-3">
        <HeaderIcon icon="users" />
        <Divider height={24} />
        <HeaderTitle value={"Créer\n une famille"} />
        <Divider height={20} />
        <Text className="text-sm text-center">
          {
            "Pour créer votre famille,\nVeuillez remplir les informations ci-dessous"
          }
        </Text>
        <Divider height={24} />
        <CustomTextField
          value={familyName}
          onChangeEvent={setFamilyName}
          placeHolderValue="Nom de la famille"
          displayTopPlaceHolder
        />
        {(familyName === null || familyName === "") && displayError && (
          <ErrorText error="Un nom est requis" />
        )}
        <Divider height={24} />
        <View className="w-full z-10">
          <CustomDropdown
            data={data}
            onSelect={setHomeType}
            value={homeType}
            displayTopPlaceHolder
            zindex={2}
            placeHolder="Type de logement"
          />
        </View>
        {homeType === null && displayError && (
          <ErrorText error="Un type de logement est requis" />
        )}
        <Divider height={20} />
        {isLoading ? (
          <CustomLoader />
        ) : (
          <AppButton title="Continuer" onPressEvent={onConfirm} />
        )}
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView className="h-full w-full px-5 pt-20">
      <FlatList
        data={[0]}
        renderItem={renderItem}
        className="flex flex-grow mb-3"
        showsVerticalScrollIndicator={false}
      />
      <Modal
        animationType="fade"
        transparent
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-[#00000080] justify-center items-center"
          activeOpacity={1}
          onPress={() => setShowPopup(false)}
        >
          <View className="items-center justify-center bg-opacity-50 ">
            <View className=" rounded-2xl items-center p-6">
              <View className="w-80 h-full mx-8 justify-center items-center">
                <View className="bg-white p-5 rounded-lg h-40 items-center">
                  <Text className="text-lg">
                    Voulez-vous ajouter des tâches par défaut à la famille ?
                  </Text>
                  <Divider height={20} />
                  <View style={{ flexDirection: "row", width: "80%" }}>
                    <TouchableOpacity
                      className="bg-green-500 py-2 px-4 rounded-md"
                      onPress={() => {
                        setShowPopup(false);
                        handleCreateFamily(true);
                      }}
                    >
                      <Text className="text-lg text-white">Oui</Text>
                    </TouchableOpacity>
                    <Divider width={40} />
                    <TouchableOpacity
                      className="bg-red-500 py-2 px-4 rounded-md"
                      onPress={() => {
                        setShowPopup(false);
                        handleCreateFamily(false);
                      }}
                    >
                      <Text className="text-lg text-white">Non</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateFamilyPage;
