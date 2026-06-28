import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Severity = 'ALTA' | 'MEDIA' | 'BAJA';

interface AlertBadgeProps {
  severity: Severity;
}

const SEVERITY_CONFIG: Record<Severity, { bg: string; text: string; label: string }> = {
  ALTA: { bg: '#B3261E', text: '#FFFFFF', label: 'ALTA' },
  MEDIA: { bg: '#E67E22', text: '#FFFFFF', label: 'MEDIA' },
  BAJA: { bg: '#386A20', text: '#FFFFFF', label: 'BAJA' },
};

export default function AlertBadge({ severity }: AlertBadgeProps) {
  const config = SEVERITY_CONFIG[severity];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
