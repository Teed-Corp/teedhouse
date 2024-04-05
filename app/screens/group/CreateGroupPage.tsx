import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderIcon from "@app/components/Content/HeaderIcon";
import HeaderTitle from "@app/components/Content/HeaderTitle";
import { SafeAreaView } from "react-native-safe-area-context";
import Divider from "@app/components/Divider";
import CustomTextField from "@app/components/Inputs/CustomTextField";
import AppButton from "@app/components/Inputs/AppButton";
import CustomDropdown from "@app/components/Inputs/CustomDropdown";

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
          displayTopPlaceHolder={true}
        />
        <Divider height={24} />
        <CustomDropdown
          data={["1", "2", "3"]}
          onSelect={setHomeType}
          placeHolder={"Type de logement"}
          displayTopPlaceHolder={true}
          value={homeType}
        />
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
