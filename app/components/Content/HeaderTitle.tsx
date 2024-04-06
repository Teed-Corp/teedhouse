import { StyleSheet, Text } from "react-native";

const HeaderTitle = ({ value }: { value: string }) => {
  return <Text style={styles.title}>{value}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default HeaderTitle;
