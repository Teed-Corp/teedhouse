import Divider from "@app/components/common/Divider";
import theme from "@app/theme/theme";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CustomDropdown = ({
  data,
  onSelect,
  placeHolder,
  displayTopPlaceHolder = false,
  value,
  values,
  zindex,
  multiSelect = false,
}: {
  data: any[];
  onSelect: any;
  placeHolder: string;
  displayTopPlaceHolder?: boolean;
  value?: string;
  values?: any[];
  zindex: number;
  multiSelect?: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, { zIndex: zindex }]}>
      {displayTopPlaceHolder && (
        <>
          <Text style={styles.topPlaceHolder}>{placeHolder}</Text>
          <Divider height={12} />
        </>
      )}
      <DropDownPicker
        items={data}
        open={open}
        setOpen={setOpen}
        setValue={onSelect}
        value={multiSelect ? values : value}
        placeholder={placeHolder}
        placeholderStyle={
          value === null || values === null
            ? styles.placeholder
            : styles.valueStyle
        }
        style={styles.inputContainer}
        textStyle={styles.valueStyle}
        dropDownContainerStyle={styles.dropdown}
        disableBorderRadius={false}
        listItemContainerStyle={styles.listItemContainer}
        multiple={multiSelect}
        multipleText={values ? `${values.length} jours sont sélectionnés` : ""}
        scrollViewProps={{ scrollEnabled: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: theme.defaultRadius,
    paddingLeft: 25,
    width: "100%",
    height: 56,
    backgroundColor: "white",
  },
  placeholder: {
    fontSize: 15,
    color: "#929292",
    textAlign: "left",
  },
  valueStyle: {
    fontSize: 15,
    color: "black",
    textAlign: "left",
  },
  topPlaceHolder: {
    marginLeft: 4,
  },
  icon: {
    marginRight: 15,
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: theme.defaultRadius,
    borderColor: "#AAAAAA",
    marginTop: 10,
  },
  listItemContainer: {
    height: 50,
  },
});

export default CustomDropdown;
