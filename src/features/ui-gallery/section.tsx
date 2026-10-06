import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Typography } from '@/components/ui/typography';

import { SPACING } from '@/themes';

type Props = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: Props) => (
  <View style={styles.section}>
    <Typography variant='label' color='mutedForeground'>
      {title}
    </Typography>
    <View style={styles.content}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    gap: SPACING.sm,
  },
  content: {
    gap: SPACING.md,
  },
});
