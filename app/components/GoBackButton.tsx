import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const GoBackButton = ({ navigation }) => {
  return navigation.canGoBack() ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" type="font-awesome-5" color="black" size={24} />
    </TouchableOpacity>
  ) : (
    <></>
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

export default GoBackButton;
