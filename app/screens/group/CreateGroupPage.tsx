import ErrorText from "@app/components/Content/ErrorText";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDropdown from "@app/components/Inputs/CustomDropdown";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroupPage = () => {
  const [homeType, setHomeType] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  const data = [
    { label: "Maison", value: "Maison" },
    { label: "Appartement", value: "Appartement" },
    { label: "Villa", value: "Villa" },
  ];

  const onConfirm = () => {
    setDisplayError(true);
    if (groupName !== null && homeType !== null) {
      console.log("Group name: ", groupName);
      console.log("Home type: ", homeType);
    }
  };

  const renderItem = () => (
    <View style={styles.content}>
      <HeaderIcon icon="users" />
      <Divider height={24} />
      <HeaderTitle value={"Créer\n un groupe"} />
      <Divider height={20} />
      <Text style={styles.text}>
        {
          "Pour créer votre groupe,\nVeuillez remplir les informations ci-dessous"
        }
      </Text>
      <Divider height={24} />
      <CustomTextField
        value={groupName}
        onChangeEvent={setGroupName}
        placeHolderValue="Nom du groupe"
        displayTopPlaceHolder
      />
      {(groupName === null || groupName === "") && displayError && (
        <ErrorText error="Un nom de groupe est requis" />
      )}
      <Divider height={24} />
      <CustomDropdown
        data={data}
        onSelect={setHomeType}
        placeHolder="Type de logement"
        displayTopPlaceHolder
        value={homeType}
      />
      {homeType === null && displayError && (
        <ErrorText error="Un type de logement est requis" />
      )}
      <Divider height={20} />
      <AppButton title="Continuer" onPressEvent={onConfirm} />
    </View>
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

export default CreateGroupPage;
