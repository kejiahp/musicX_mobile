import { StyleSheet, TextInputProps, View } from "react-native";
import React from "react";
import Label from "./label";
import InputField from "./input-field";
import { Colors, SIZES } from "@/constants/theme";

export function FormError({ message }: { message: string | undefined }) {
  return (
    <Label
      style={{
        color: Colors.light.destructive,
        fontSize: SIZES.xsmall,
        lineHeight: SIZES.small,
      }}
    >
      {message}
    </Label>
  );
}

interface Props extends TextInputProps {
  label: string;
  errorMessage: string | undefined;
}

export function FormInputField({ errorMessage, label, ...props }: Props) {
  return (
    <View style={styles.container}>
      <Label style={{ fontSize: SIZES.small, lineHeight: SIZES.large }}>
        {label}
      </Label>
      <InputField {...props} />
      <FormError message={errorMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
});
