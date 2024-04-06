import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "@app/components/Divider";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import AppButton from "@app/components/Inputs/AppButton";
import SelectableList from "@app/components/Inputs/SelectableList";

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [homeType, setHomeType] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
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
          placeHolderValue={"Nom du groupe"}
        />
        <Divider height={24} />
        <SelectableList />
        <Divider height={20} />
        <AppButton title={"Continuer"} onPressEvent={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default CreateGroupPage;
