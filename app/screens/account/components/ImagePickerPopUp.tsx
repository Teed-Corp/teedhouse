import Divider from "@app/components/Divider";
import PopUpButton from "@app/screens/account/components/PopUpButton";
import theme from "@app/theme/theme";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImagePickerPopUp({
  showPopup,
  setShowPopup,
  onImageSelected,
}) {
  const [image, setImage] = useState(null);
  const pickImage = async (isGalerie: boolean) => {
    const options: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = isGalerie
      ? await ImagePicker.launchImageLibraryAsync(options)
      : await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (image) {
      onImageSelected(image);
      handleClosePopup();
    }
  }, [image]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={showPopup}
      onRequestClose={() => setShowPopup(false)}
    >
      <TouchableOpacity
        style={styles.backgroundContainer}
        onPress={handleClosePopup}
        activeOpacity={1}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.title}>Photo de profile</Text>
            <Divider height={10} />
            <View style={{ flexDirection: "row", width: "80%" }}>
              <PopUpButton title="Galerie" onPressEvent={pickImage} />
              <Divider width={10} />
              <PopUpButton title="Caméra" onPressEvent={pickImage} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "80%",
    height: "100%",
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: 160,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: theme.primary,
  },
});
