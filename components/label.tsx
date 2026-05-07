import React, { PropsWithChildren, useContext } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<TextStyle>;
};

export default function Label({
  lightColor,
  darkColor,
  style,
  children,
}: PropsWithChildren<Props>) {
  return (
    <ThemedText lightColor={lightColor} darkColor={darkColor} style={style}>
      {children}
    </ThemedText>
  );
}
