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
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icono} size={24} color={color} />
      </View>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '50%',
    padding: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valor: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.neutral,
    lineHeight: 30,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral,
    marginTop: 2,
  },
  subtitulo: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
});
