import React, { useState } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { EyeIcon } from '@/components/icons';

import { Input, InputSize } from './input';

type Props = Omit<React.ComponentProps<typeof Input>, 'secureTextEntry' | 'suffix'> & {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};

export const PasswordInput: React.FC<Props> = ({
  showPasswordLabel = 'Show password',
  hidePasswordLabel = 'Hide password',
  size = 'md',
  ...props
}) => {
  const { theme } = useUnistyles();

  styles.useVariants({ size });
  const [visible, setVisible] = useState(false);

  return (
    <Input
      autoCapitalize='none'
      size={size}
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
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      size: {
        sm: { width: theme.controlHeight.sm, height: theme.controlHeight.sm },
        md: { width: theme.controlHeight.md, height: theme.controlHeight.md },
        lg: { width: theme.controlHeight.lg, height: theme.controlHeight.lg },
      } satisfies Record<InputSize, ViewStyle>,
    },
  },
}));
