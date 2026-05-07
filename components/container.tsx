import { StyleSheet, ViewStyle, StyleProp, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { ThemedScrollView, ThemedView } from "./themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SIZES } from "@/constants/theme";

type Props = {
  disableInsets?: boolean;
  isScrollable?: boolean;
  outerViewStyle?: StyleProp<ViewStyle>;
  innerViewStyle?: StyleProp<ViewStyle>;
};

export default function Container({
  disableInsets,
  children,
  isScrollable,
  outerViewStyle,
  innerViewStyle,
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();

  return (
    <>
      {isScrollable ? (
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          style={[
            styles.outerView,
            outerViewStyle,
            !disableInsets && {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <ThemedView style={[styles.innerView, innerViewStyle]}>
            {children}
          </ThemedView>
        </ThemedScrollView>
      ) : (
        <ThemedView
          style={[
            styles.innerView,
            innerViewStyle,
            !disableInsets && {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {children}
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    paddingHorizontal: SIZES.small,
  },
});
