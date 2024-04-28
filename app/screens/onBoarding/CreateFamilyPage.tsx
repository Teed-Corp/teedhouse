import ErrorText from "@app/components/common/Content/ErrorText";
import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useFamily } from "@app/context/FamilyContext";
import Theme from "@app/theme/Theme";
import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateFamilyPage = () => {
  const { createFamily } = useFamily();
  const [homeType, setHomeType] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const data = [
    { label: "Maison", value: "Maison" },
    { label: "Appartement", value: "Appartement" },
    { label: "Villa", value: "Villa" },
  ];

  const onConfirm = async () => {
    setIsLoading(true);
    setDisplayError(true);
    if (familyName !== null && homeType !== null) {
      const { error } = await createFamily(familyName, true);
      if (error) alert(error);
    }
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
          <Text className="ml-1">Type de logement</Text>
          <Divider height={12} />

          <DropDownPicker
            items={data}
            open={open}
            setOpen={setOpen}
            setValue={setHomeType}
            value={homeType}
            placeholder="Type de logement"
            placeholderStyle={{
              fontSize: 15,
              color: "#929292",
              textAlign: "left",
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 0.5,
              borderRadius: Theme.defaultRadius,
              paddingLeft: 25,
              width: "100%",
              height: 56,
              backgroundColor: "white",
            }}
            textStyle={{
              fontSize: 15,
              color: "black",
              textAlign: "left",
            }}
            dropDownContainerStyle={{
              borderWidth: 0.5,
              borderRadius: Theme.defaultRadius,
              borderColor: "#AAAAAA",
              marginTop: 10,
            }}
            disableBorderRadius={false}
            listItemContainerStyle={{
              height: 50,
            }}
            scrollViewProps={{ scrollEnabled: true }}
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
    <SafeAreaView className="h-full w-full px-5">
      <FlatList
        data={[0]}
        renderItem={renderItem}
        className="flex flex-grow mb-3"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CreateFamilyPage;
