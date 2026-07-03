import TurnoCard from '@/components/atoms/TurnoCard';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TURNOS: { label: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { label: 'Mañana', icon: 'wb-sunny' },
  { label: 'Tarde', icon: 'wb-cloudy' },
  { label: 'Noche', icon: 'nights-stay' },
];

interface TurnoSelectorProps {
  selected: string;
  onChange: (turno: string) => void;
}

export default function TurnoSelector({ selected, onChange }: TurnoSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="schedule" size={16} color={Colors.secondary} />
        <Text style={styles.label}>TURNO ASIGNADO</Text>
      </View>
      <View style={styles.options}>
        {TURNOS.map((turno) => (
          <TurnoCard
            key={turno.label}
            label={turno.label}
            icon={turno.icon}
            selected={selected === turno.label}
            onPress={() => onChange(turno.label)}
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
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.8,
  },
  options: {
    gap: 0,
  },
});
