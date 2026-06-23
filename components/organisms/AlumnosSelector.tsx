import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AlumnoPill } from '@/components/molecules/AlumnoPill';
import { Colors } from '@/constants/Colors';

interface Alumno {
  id: string;
  nombre: string;
}

interface AlumnosSelectorProps {
  alumnos: Alumno[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const AlumnosSelector = ({ alumnos, selectedId, onSelect }: AlumnosSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Alumnos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {alumnos.map((alumno) => (
          <AlumnoPill
            key={alumno.id}
            nombre={alumno.nombre}
            isSelected={alumno.id === selectedId}
            onPress={() => onSelect(alumno.id)}
          />
        ))}
      </ScrollView>
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
  scroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
});
