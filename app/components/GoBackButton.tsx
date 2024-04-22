import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

const GoBackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (navigation.canGoBack()) navigation.goBack();
      }}
    >
      <View style={styles.container}>
        <Icon
          name="chevron-left"
          type="font-awesome-5"
          color="black"
          size={24}
        />
      </View>
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

export default GoBackButton;
