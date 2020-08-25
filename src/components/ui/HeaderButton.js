import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";

import Theme from "../../constants/Theme";

const _HeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Feather}
      iconSize={23}
      color={Platform.OS === "ios" ? Theme.primary : "#fff"}
    />
  );
};

export default _HeaderButton;
