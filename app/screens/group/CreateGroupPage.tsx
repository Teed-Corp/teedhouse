import React, { useState } from "react";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import Divider from "@app/components/Divider";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDropdown from "@app/components/Inputs/CustomDropdown";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFamily from "@app/hooks/Family";

const CreateGroupPage = () => {
  const { createFamily } = useFamily();
  const [groupName, setGroupName] = useState("");
  const [homeType, setHomeType] = useState(null);

  const data: any = [
    { label: "Maison", value: "Maison" },
    { label: "Appartement", value: "Appartement" },
    { label: "Villa", value: "Villa" },
  ];

  const handleCreateFamily = async () => {
    await createFamily(groupName);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
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
            placeHolderValue={"Nom du groupe"}
            displayTopPlaceHolder={true}
          />
          <Divider height={24} />
          <CustomDropdown
            data={data}
            onSelect={setHomeType}
            placeHolder={"Type de logement"}
            displayTopPlaceHolder={true}
            value={homeType}
          />
          <Divider height={20} />
          <AppButton title="Continuer" onPressEvent={handleCreateFamily} />
        </ScrollView>
      </View>
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
  dropdown: {
    zIndex: 1, // Ajout de zIndex pour le CustomDropdown
  },
});

export default CreateGroupPage;
