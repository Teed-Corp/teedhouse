import AccountCard from "@app/screens/account/components/AccountCard";
import ImagePickerPopUp from "@app/screens/account/components/ImagePickerPopUp";
import theme from "@app/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountPage() {
  const [image, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageSelected = (image: any) => {
    setSelectedImage(image);
  };
  const userTest = {
    userSurname: "",
    userName: "",
    dof: "",
    email: "",
    stats: "1200",
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}> Ton Profil</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/defaultProfile.jpg")
              }
            />
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={() => {
                setShowPopup(true);
              }}
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <AccountCard
            userSurname={userTest.userSurname}
            userName={userTest.userName}
            dof={userTest.dof}
            email={userTest.email}
            stats={userTest.stats}
          />
        </View>
        <ImagePickerPopUp
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          onImageSelected={handleImageSelected}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: theme.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 150,
    height: 150,
    overflow: "hidden",
    position: "relative",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
