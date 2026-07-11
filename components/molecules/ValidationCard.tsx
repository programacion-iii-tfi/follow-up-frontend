import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ValidationCardProps {
  isValid: boolean;
}

export default function ValidationCard({ isValid }: ValidationCardProps) {
  return (
    <View style={[styles.card, isValid ? styles.cardValid : styles.cardInvalid]}>
      <MaterialIcons
        name={isValid ? "check-circle" : "info"}
        size={24}
        color={isValid ? '#2E7D32' : Colors.error}
      />
      <Text style={[styles.text, isValid && { color: '#2E7D32' }]}>
        {isValid ? 'Formulario completo y listo para guardar' : 'Faltan campos por completar'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 24,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
  cardValid: {
    backgroundColor: '#E8F5E9',
  },
  cardInvalid: {
    backgroundColor: `${Colors.error}10`,
  },
});