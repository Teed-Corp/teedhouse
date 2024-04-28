import ErrorText from "@app/components/common/Content/ErrorText";
import HeaderIcon from "@app/components/common/Content/HeaderIcon";
import HeaderTitle from "@app/components/common/Content/HeaderTitle";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import AppButton from "@app/components/common/Inputs/AppButton";
import CustomDropdown from "@app/components/common/Inputs/CustomDropdown";
import CustomTextField from "@app/components/common/Inputs/CustomTextField";
import { useFamily } from "@app/context/FamilyContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateFamilyPage = () => {
  const { createFamily } = useFamily();
  const [homeType, setHomeType] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation: any = useNavigation();

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
      <View style={styles.content}>
        <HeaderIcon icon="users" />
        <Divider height={24} />
        <HeaderTitle value={"Créer\n une famille"} />
        <Divider height={20} />
        <Text style={styles.text}>
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
        <CustomDropdown
          data={data}
          onSelect={setHomeType}
          placeHolder="Type de logement"
          displayTopPlaceHolder
          value={homeType}
          zindex={1}
        />
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[0]}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  dropdown: {
    zIndex: 1,
  },
});

export default CreateFamilyPage;
