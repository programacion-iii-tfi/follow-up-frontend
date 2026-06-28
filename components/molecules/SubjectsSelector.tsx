import SubjectChip from '@/components/atoms/SubjectChip';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MATERIAS_DISPONIBLES = [
  'Matemáticas',
  'Biología',
  'Historia',
  'Lengua',
  'Arte',
  'Física',
  'Química',
  'Geografía',
  'Inglés',
  'Educación Física',
];

interface SubjectsSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function SubjectsSelector({ selected, onChange }: SubjectsSelectorProps) {
  const toggle = (materia: string) => {
    if (selected.includes(materia)) {
      onChange(selected.filter((m) => m !== materia));
    } else {
      onChange([...selected, materia]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="menu-book" size={16} color={Colors.secondary} />
        <Text style={styles.label}>MATERIAS QUE DICTA</Text>
      </View>
      <Text style={styles.hint}>Seleccioná todas las que correspondan</Text>
      <View style={styles.grid}>
        {MATERIAS_DISPONIBLES.map((materia) => (
          <SubjectChip
            key={materia}
            label={materia}
            selected={selected.includes(materia)}
            onPress={() => toggle(materia)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.8,
  },
  hint: {
    fontSize: 12,
    color: Colors.outline,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
});
