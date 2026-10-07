import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { COLORS, SPACING } from '@/themes';

import { Section } from './section';

const InputGalleryScreen: React.FC = () => (
  <KeyboardAwareScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <Section title='Input'>
      <Input placeholder='Placeholder' />
      <Input label='With label' placeholder='Placeholder' />
      <Input label='With value' defaultValue='Hello Barnbook' />
      <Input label='Error' defaultValue='invalid@' error='Invalid email address' />
      <Input label='Disabled' defaultValue='Not editable' editable={false} />
    </Section>
    <Section title='PasswordInput'>
      <PasswordInput label='Password' placeholder='••••••••' />
      <PasswordInput label='Error' defaultValue='123' error='Password is too short' />
    </Section>
  </KeyboardAwareScrollView>
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

export { InputGalleryScreen };
