import AccountCard from "@app/components/root/account/AccountCard";
import ImagePickerPopUp from "@app/components/root/account/ImagePickerPopUp";
import { useProfile } from "@app/context/ProfileContext";
import Theme from "@app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { profile } from "@prisma/client";
import { useEffect, useState } from "react";
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
  const { getProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<profile>(null);
  const [image, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleImageSelected = (image: any) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
      setIsLoading(false);
    };

    fetchProfile().catch(console.error);
  }, []);

  if (isLoading) return null;

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
            firstname={profile.firstname}
            lastname={profile.lastname}
            birthdate={`${profile.birthdate.getFullYear()}/${profile.birthdate.getMonth() + 1}/${profile.birthdate.getDate()}`}
            email="todefine@todefine.com"
            stats="toremove?"
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
    marginTop: 20,
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
    backgroundColor: Theme.primary,
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
