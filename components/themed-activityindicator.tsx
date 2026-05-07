import { useThemeColor } from "@/hooks/use-theme-color";
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";

type Props = ActivityIndicatorProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedActivityIndicator({
  lightColor,
  darkColor,
  ...rest
}: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <ActivityIndicator color={color} {...rest} />;
}
