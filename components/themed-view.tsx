import {
  View,
  type ViewProps,
  ScrollView,
  type ScrollViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedScrollViewProps = ScrollViewProps & {
  disableInsets?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedScrollView({
  style,
  lightColor,
  disableInsets,
  darkColor,
  ...otherProps
}: ThemedScrollViewProps) {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  return (
    <ScrollView
      style={[
        {
          backgroundColor,
          ...(!disableInsets && {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }),
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
