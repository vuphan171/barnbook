import React, { ReactNode, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { COLORS, CONTROL_HEIGHT, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/themes';

import { ErrorMessage } from './error-message';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  right?: ReactNode;
};

export const Input = ({ label, error, right, style, onFocus, onBlur, ...rest }: Props) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View>
        <TextInput
          placeholderTextColor={COLORS.mutedForeground}
          aria-invalid={!!error}
          style={[
            styles.input,
            !!right && styles.inputWithRight,
            error ? styles.inputError : null,
            focused && styles.inputFocused,
            style,
          ]}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.semibold,
    color: COLORS.foreground,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    minHeight: CONTROL_HEIGHT.md,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.foreground,
    backgroundColor: COLORS.card,
  },
  inputWithRight: {
    paddingRight: CONTROL_HEIGHT.md + SPACING.xs,
  },
  inputError: {
    borderWidth: 2,
    borderColor: COLORS.destructive,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: COLORS.ring,
  },
  right: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
