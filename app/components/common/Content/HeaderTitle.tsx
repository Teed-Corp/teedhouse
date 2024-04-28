import { Text } from "react-native";

const HeaderTitle = ({ value }: { value: string }) => {
  return <Text className="text-4xl font-bold text-center">{value}</Text>;
};

export default HeaderTitle;
