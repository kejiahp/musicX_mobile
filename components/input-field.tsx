import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  FocusEvent,
} from "react-native";
import React, { useContext, useState } from "react";
import { SIZES } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type Props = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

const InputField = React.forwardRef<TextInput, Props>(
  ({ style, lightColor, darkColor, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const tint = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

    const custOnFocus = (e: FocusEvent) => {
      setFocused(!focused);
      if (onFocus) {
        onFocus(e);
      }
    };

    const custOnBlur = (e: FocusEvent) => {
      setFocused(!focused);
      if (onBlur) {
        onBlur(e);
      }
    };

    return (
      <TextInput
        ref={ref}
        onFocus={custOnFocus}
        onBlur={custOnBlur}
        style={[
          styles.inputField,
          {
            color,
            borderColor: focused ? tint : color,
          },
          style,
        ]}
        placeholderTextColor={color}
        {...props}
      />
    );
  },
);

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: SIZES.small,
  },
});
