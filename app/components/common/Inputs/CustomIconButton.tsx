import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const CustomIconButton = ({
  onPress,
  iconName,
  iconType,
}: {
  onPress: any;
  iconName: string;
  iconType?: string;
}) => {
  return (
    <TouchableOpacity
      className="w-10 h-10 rounded-xl bg-white justify-center"
      onPress={onPress}
    >
      <Icon
        name={iconName}
        type={iconType ?? "font-awesome"}
        color="black"
        size={24}
      />
    </TouchableOpacity>
  );
};

export default CustomIconButton;
