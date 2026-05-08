import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import React, { PropsWithChildren } from "react";
import { ThemedScrollView, ThemedView } from "./themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SIZES } from "@/constants/theme";

type Props = {
  isScrollable?: boolean;
  outerViewStyle?: StyleProp<ViewStyle>;
  innerViewStyle?: StyleProp<ViewStyle>;
};

export default function Container({
  children,
  isScrollable,
  outerViewStyle,
  innerViewStyle,
}: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const content = (
    <ThemedView style={[styles.innerView, innerViewStyle]}>
      {children}
    </ThemedView>
  );

  return (
    <ThemedView
      style={[
        styles.outerView,
        outerViewStyle,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {isScrollable ? (
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ThemedScrollView>
      ) : (
        content
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
  },
  innerView: {
    paddingHorizontal: SIZES.small,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
