import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { EyeIcon } from '@/components/icons';

import { Input } from './input';

type Props = Omit<React.ComponentProps<typeof Input>, 'secureTextEntry' | 'suffix'> & {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};

export const PasswordInput: React.FC<Props> = ({
  showPasswordLabel = 'Show password',
  hidePasswordLabel = 'Hide password',
  ...props
}) => {
  const { theme } = useUnistyles();
  const [visible, setVisible] = useState(false);

  return (
    <Input
      autoCapitalize='none'
      {...props}
      secureTextEntry={!visible}
      suffix={
        <Pressable
          accessibilityRole='button'
          accessibilityLabel={visible ? hidePasswordLabel : showPasswordLabel}
          onPress={() => setVisible((prev) => !prev)}
          style={styles.toggle}
        >
          <EyeIcon color={theme.colors.mutedForeground} off={visible} />
        </Pressable>
      }
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  toggle: {
    width: theme.controlHeight.md,
    height: theme.controlHeight.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
