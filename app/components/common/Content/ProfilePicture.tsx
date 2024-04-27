import React from "react";
import { Image } from "react-native";
import { Icon } from "react-native-elements";

const ProfilePicture = ({
  uri,
  imageStyle,
  iconSize,
}: {
  uri: string;
  imageStyle: any;
  iconSize?: number;
}) => {
  return uri && uri !== "" ? (
    <Image style={imageStyle} source={{ uri }} />
  ) : (
    <Icon name="user" type="font-awesome" color="black" size={iconSize ?? 40} />
  );
};
export default ProfilePicture;
