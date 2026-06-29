import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ActividadItemProps {
  materia: string;
  tipo: string;
  fecha: string;
  icono: keyof typeof MaterialIcons.glyphMap;
  color: string;
  onPress?: () => void;
}

export const ActividadItem = ({ materia, tipo, fecha, icono, color, onPress }: ActividadItemProps) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <MaterialIcons name={icono} size={22} color={color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.materia}>{materia}</Text>
        <Text style={styles.tipo}>{tipo}</Text>
      </View>
      <View style={styles.fechaContainer}>
        <Text style={styles.fecha}>{fecha}</Text>
        <MaterialIcons name="chevron-right" size={18} color={Colors.outline} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  materia: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
  },
  tipo: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  fechaContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  fecha: {
    fontSize: 12,
    color: Colors.outline,
    fontWeight: '500',
  },
});
