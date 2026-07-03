import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ActividadItem } from '@/components/molecules/ActividadItem';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

interface Actividad {
  id: string;
  materia: string;
  tipo: string;
  fecha: string;
  icono: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

interface ActividadesListProps {
  actividades: Actividad[];
  onItemPress?: (id: string) => void;
  onVerTodas?: () => void;
}

export const ActividadesList = ({ actividades, onItemPress, onVerTodas }: ActividadesListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>PRÓXIMAS ACTIVIDADES</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onVerTodas}>
          <Text style={styles.verTodas}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {actividades.map((item) => (
          <ActividadItem
            key={item.id}
            materia={item.materia}
            tipo={item.tipo}
            fecha={item.fecha}
            icono={item.icono}
            color={item.color}
            onPress={() => onItemPress?.(item.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  verTodas: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
});
