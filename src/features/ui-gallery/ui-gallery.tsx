import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import type { RootStackScreenProps } from '@/navigation/types';

import { Typography } from '@/components/ui/typography';

import { ROUTES } from '@/configs/routes';
import { COLORS, SPACING } from '@/themes';

const ITEMS = [
  { title: 'Button', route: ROUTES.UI_GALLERY_BUTTON },
  { title: 'Input', route: ROUTES.UI_GALLERY_INPUT },
] as const;

const UiGalleryScreen: React.FC<RootStackScreenProps<typeof ROUTES.UI_GALLERY>> = ({
  navigation,
}) => (
  <FlatList
    data={ITEMS}
    keyExtractor={(item) => item.route}
    style={styles.list}
    renderItem={({ item }) => (
      <Pressable
        accessibilityRole='button'
        onPress={() => navigation.navigate(item.route)}
        style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      >
        <Typography>{item.title}</Typography>
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: COLORS.background,
  },
  item: {
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  itemPressed: {
    backgroundColor: COLORS.muted,
  },
});

export { UiGalleryScreen };
