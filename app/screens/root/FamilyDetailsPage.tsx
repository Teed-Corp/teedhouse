import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Divider from "@app/components/common/Divider";
import ProfileCard from "@app/components/common/Content/ProfileCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import Theme from "@app/theme/Theme";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";

const FamilyDetailsPage = () => {
  const family = {
    name: "Coloc's Family",
    code: "12345",
    members: [
      {
        id: 1,
        name: "John Doe",
        profilePicture: "https://picsum.photos/200",
      },
      {
        id: 2,
        name: "Jane Doe",
        profilePicture: "https://picsum.photos/200",
      },
      {
        id: 3,
        name: "Alice Doe",
        profilePicture: "https://picsum.photos/200",
      },
      {
        id: 4,
        name: "Bob Doe",
        profilePicture: "https://picsum.photos/200",
      },
    ],
  };

  const itemClassName =
    "w-full px-5 flex flex-row justify-start bg-white p-3 rounded-xl items-center";
  const iconClassName = "p-2 rounded-xl mr-3 justify-center";

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Code copié",
      "Le code de la famille a été copié dans le presse-papiers. \nVous pouvez le partager avec votre famille.",
    );
  };

  return (
    <View className="mx-5">
      <LinearGradient
        className="w-full items-center justify-center rounded-2xl p-5"
        colors={[Theme.primary, Theme.gradientColor]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      >
        <Text className="text-2xl font-bold text-center text-white">
          {family.name}
        </Text>
      </LinearGradient>
      <Divider height={20} />

      <View className={itemClassName}>
        <View className={iconClassName + " bg-orange-400"}>
          <Icon name="vpn-key" size={24} color="black" />
        </View>
        <Text className="text-lg">Code : </Text>
        <TouchableOpacity onPress={() => copyToClipboard(family.code)}>
          <View className="p-2 bg-gray-200 rounded-xl flex-row">
            <Text className="text-lg font-bold">{family.code}</Text>
            <MaterialIcons
              name="content-copy"
              size={24}
              color="black"
              style={{ marginLeft: 8 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Divider height={20} />
      <View className={itemClassName}>
        <View className={iconClassName + " bg-green-500"}>
          <Icon name="people" size={24} color="black" />
        </View>
        <Text className="text-lg">Membres de la famille :</Text>
      </View>
      <Divider height={10} />
      {family.members.map((member) => (
        <React.Fragment key={member.id}>
          <ProfileCard user={member} />
          <Divider height={12} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default FamilyDetailsPage;
