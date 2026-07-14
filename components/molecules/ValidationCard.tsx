import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ValidationCardProps {
  errors: string[];
}

export default function ValidationCard({ errors }: ValidationCardProps) {
  const isValid = errors.length === 0;

  return (
    <View style={[styles.card, isValid ? styles.cardValid : styles.cardInvalid]}>
      <MaterialIcons
        name={isValid ? "check-circle" : "error-outline"}
        size={24}
        color={isValid ? '#2E7D32' : Colors.error}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        {isValid ? (
          <Text style={[styles.text, { color: '#2E7D32' }]}>
            Formulario completo y listo para guardar
          </Text>
        ) : (
          errors.map((error, index) => (
            <Text key={index} style={styles.text}>
              • {error}
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardValid: {
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
  },
  cardInvalid: {
    backgroundColor: `${Colors.error}10`,
  },
});