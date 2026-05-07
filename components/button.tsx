import {
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
  StyleSheet,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { Colors } from "@/constants/theme";

interface Props extends PressableProps {
  varaint?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSize;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Button({
  varaint,
  size,
  style,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        (!varaint || varaint === "default") && buttonVariants.default,
        varaint === "secondary" && buttonVariants.secondary,
        varaint === "destructive" && buttonVariants.destructive,
        varaint === "link" && buttonVariants.link,
        (!size || size === "default") && buttonSize.default,
        size === "xsm" && buttonSize.xsm,
        size === "sm" && buttonSize.sm,
        size === "lg" && buttonSize.lg,
        size === "icon" && buttonSize.icon,
        props.disabled && { opacity: 0.3 },
        style,
        pressed && { opacity: 0.6 },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export default Button;

const buttonVariants = StyleSheet.create({
  default: {
    backgroundColor: Colors.light.primary,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
  },
  destructive: {
    backgroundColor: Colors.light.destructive,
  },
  link: {
    backgroundColor: "transparent",
  },
});

const buttonSize = StyleSheet.create({
  default: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  xsm: {
    height: 24,
    paddingHorizontal: 4,
  },
  sm: {
    height: 32,
    paddingHorizontal: 12,
  },
  lg: {
    height: 44,
    paddingHorizontal: 32,
  },
  icon: {
    height: 40,
    paddingHorizontal: 40,
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
  },
});
