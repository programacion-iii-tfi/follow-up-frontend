import AlertBadge from '@/components/atoms/AlertBadge';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Severity = 'ALTA' | 'MEDIA' | 'BAJA';

interface AlertListItemProps {
  nombre: string;
  descripcion: string;
  severity: Severity;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export default function AlertListItem({ nombre, descripcion, severity }: AlertListItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(nombre)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.nombre} numberOfLines={1}>{nombre}</Text>
        <Text style={styles.descripcion} numberOfLines={2}>{descripcion}</Text>
      </View>
      <AlertBadge severity={severity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  content: {
    flex: 1,
  },
  nombre: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral,
    marginBottom: 2,
  },
  descripcion: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 16,
  },
});
