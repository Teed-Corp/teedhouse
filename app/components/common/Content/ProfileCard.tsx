import { Text, View } from "react-native";
import ProfilePicture from "@app/components/common/Content/ProfilePicture";
import React from "react";
import PieceComponent from "@app/components/common/Content/PieceComponent";

const ProfileCard = ({ user, displayScore = false }) => {
  return (
    <View className="w-full px-5 flex flex-row justify-between bg-white p-3 rounded-xl">
      <View className="flex flex-row items-center">
        <View className="w-14 h-14 rounded-xl bg-[#2121211a] mr-3 justify-center">
          <ProfilePicture
            uri={user.profilePicture}
            imageStyle="w-full h-full rounded-xl"
            iconSize={30}
          />
        </View>
        <Text>{user.name}</Text>
      </View>
      {displayScore && (
        <View className="flex flex-row justify-center items-center">
          <PieceComponent />
          <Text className="text-lg font-bold ml-2">{user.score}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileCard;
