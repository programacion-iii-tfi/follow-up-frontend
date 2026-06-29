import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface InfoCardProps {
  titulo: string;
  valor: string;
  subtitulo: string;
  icono: keyof typeof MaterialIcons.glyphMap;
  color: string;
  onPress?: () => void;
}

export const InfoCard = ({ titulo, valor, subtitulo, icono, color, onPress }: InfoCardProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <MaterialIcons name={icono} size={22} color={color} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral,
  },
  subtitulo: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 4,
  },
});
