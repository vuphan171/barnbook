import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = Omit<TextInputProps, 'value' | 'onChangeText' | 'maxLength'> & {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
  error?: boolean;
};

export const OtpInput: React.FC<Props> = ({
  value,
  onChangeText,
  length = 6,
  error = false,
  editable = true,
  onFocus,
  onBlur,
  style,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length }, (_, index) => {
        const digit = value[index];
        const active = focused && editable && index === activeIndex && !error;

        return (
          <View
            key={index}
            style={[
              styles.cell,
              digit && styles.cellFilled,
              active && styles.cellActive,
              error && styles.cellError,
            ]}
          >
            {digit ? (
              <Text style={[styles.digit, error && styles.digitError]}>{digit}</Text>
            ) : active ? (
              <View style={styles.caret} />
            ) : null}
          </View>
        );
      })}
      {/* Transparent input over the cells so the OS still offers SMS/email code autofill */}
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, '').slice(0, length))}
        maxLength={length}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        autoComplete='one-time-code'
        caretHidden
        editable={editable}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  cell: {
    flex: 1,
    height: 56,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    borderColor: theme.colors.input,
  },
  cellActive: {
    borderWidth: 2,
    borderColor: theme.colors.ring,
  },
  cellError: {
    borderWidth: 2,
    borderColor: theme.colors.destructive,
  },
  digit: {
    fontSize: theme.fontSize.xxl,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.foreground,
  },
  digitError: {
    color: theme.colors.destructive,
  },
  caret: {
    width: 2,
    height: 24,
    backgroundColor: theme.colors.foreground,
  },
  input: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
}));
