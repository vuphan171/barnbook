import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { EyeIcon } from '@/components/icons';

import { COLORS, CONTROL_HEIGHT } from '@/themes';

import { Input } from './input';

type Props = Omit<React.ComponentProps<typeof Input>, 'secureTextEntry' | 'right'>;

export const PasswordInput = (props: Props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <Input
      autoCapitalize='none'
      {...props}
      secureTextEntry={!visible}
      right={
        <Pressable
          accessibilityRole='button'
          accessibilityLabel={t(visible ? 'common.hidePassword' : 'common.showPassword')}
          onPress={() => setVisible((shown) => !shown)}
          style={styles.toggle}
        >
          <EyeIcon color={COLORS.mutedForeground} off={visible} />
        </Pressable>
      }
    />
  );
};

const styles = StyleSheet.create({
  toggle: {
    width: CONTROL_HEIGHT.md,
    height: CONTROL_HEIGHT.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
