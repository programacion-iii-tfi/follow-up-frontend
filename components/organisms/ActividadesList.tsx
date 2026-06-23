import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
}

export const ActividadesList = ({ actividades, onItemPress }: ActividadesListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximas Actividades</Text>
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
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 20,
    gap: 10,
  },
});
