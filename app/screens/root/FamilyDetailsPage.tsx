import ProfileCard from "@app/components/common/Content/ProfileCard";
import CustomLoader from "@app/components/common/CustomLoader";
import Divider from "@app/components/common/Divider";
import { useFamily } from "@app/context/FamilyContext";
import Theme from "@app/theme/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { family, profile } from "@prisma/client";
import { LinearGradient } from "expo-linear-gradient";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import { Platform, Share, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const FamilyDetailsPage = () => {
  const { getFamily, getFamilyMembers } = useFamily();
  const [isLoading, setIsLoading] = useState(true);
  const [family, setFamily] = useState<family>();
  const [members, setMembers] = useState<profile[]>();

  useEffect(() => {
    const fetch = async () => {
      setFamily((await getFamily()).data);
      setMembers((await getFamilyMembers()).data);
      setIsLoading(false);
    };

    fetch().catch(console.error);
  }, []);

  const itemClassName =
    "w-full px-5 flex flex-row justify-start bg-white p-3 rounded-xl items-center";
  const iconClassName = "p-2 rounded-xl mr-3 justify-center";

  const shareCode = async (text: string) => {
    const isSharingAvailable = await Sharing.isAvailableAsync();

    if (isSharingAvailable) {
      await Share.share({
        message: `Rejoins ma famille et commence à effectuer des tâches pour gagner des points ! Code de la famille: ${family.code}`,
      });
    }
  };

  if (isLoading) return <CustomLoader />;

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
        <TouchableOpacity onPress={() => shareCode(family.code)}>
          <View className="p-2 bg-gray-200 rounded-xl flex-row">
            <Text className="text-lg font-bold">{family.code}</Text>
            <MaterialIcons
              name={Platform.OS === "ios" ? "ios-share" : "share"}
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
      {members.map((member) => (
        <React.Fragment key={member.id}>
          <ProfileCard user={member} />
          <Divider height={12} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default FamilyDetailsPage;
