import React, { ComponentProps } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button } from '@/components/ui/button';

import { COLORS, SPACING } from '@/themes';

import { Section } from './section';

type ButtonProps = ComponentProps<typeof Button>;

const VARIANTS: NonNullable<ButtonProps['variant']>[] = [
  'primary',
  'secondary',
  'destructive',
  'ghost',
];
const SIZES: NonNullable<ButtonProps['size']>[] = ['sm', 'md', 'lg'];

const ButtonGalleryScreen: React.FC = () => (
  <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    {VARIANTS.map((variant) => (
      <Section key={variant} title={variant}>
        {SIZES.map((size) => (
          <Button key={size} variant={variant} size={size} title={`Size ${size}`} />
        ))}
        <Button variant={variant} title='Disabled' disabled />
        <Button variant={variant} title='Loading' loading />
      </Section>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.xxl,
    gap: SPACING.xxl,
  },
});

export { ButtonGalleryScreen };
