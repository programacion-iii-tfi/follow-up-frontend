import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AlumnoPillProps {
  nombre: string;
  isSelected: boolean;
  onPress: () => void;
}

export const AlumnoPill = ({ nombre, isSelected, onPress }: AlumnoPillProps) => {
  return (
    <TouchableOpacity
      style={[styles.pill, isSelected && styles.pillSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isSelected && styles.textSelected]}>
        {nombre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  pillSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
  },
  textSelected: {
    color: Colors.onPrimary,
    fontWeight: '700',
  },
});
