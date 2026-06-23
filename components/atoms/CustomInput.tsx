import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  isPassword?: boolean;
}

export const CustomInput = ({ label, iconName, isPassword = false, ...props }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: isFocused ? Colors.primary : Colors.secondary }]}>
          {label}
        </Text>
      </View>
      <View style={[styles.inputContainer, { borderColor: isFocused ? Colors.primary : Colors.border }]}>
        <MaterialIcons
          name={iconName}
          size={22}
          color={isFocused ? Colors.primary : Colors.secondary}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.outline}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialIcons
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={22}
              color={Colors.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 8,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: Colors.surface,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral,
    minHeight: 52,
  },
});
