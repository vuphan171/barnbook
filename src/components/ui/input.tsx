import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {
  COLORS,
  SPACING,
  RADIUS,
  CONTROL_HEIGHT,
  FONT_SIZE,
  FONT_WEIGHT,
} from '@/themes';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = ({ label, error, style, ...rest }: InputProps) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={COLORS.placeholder}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.textLabel,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    minHeight: CONTROL_HEIGHT.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  error: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.error,
  },
});

export default Input;
