import { StyleSheet, TouchableOpacity } from "react-native";
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        name={iconName}
        type={iconType ?? "font-awesome"}
        color="black"
        size={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default CustomIconButton;
