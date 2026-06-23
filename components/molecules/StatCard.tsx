import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    iconColor: string;
    label: string;
    value: string;
    valueColor?: string; // Opcional, para valores destacados (ej. rojo o verde)
}

export default function StatCard({ icon, iconColor, label, value, valueColor }: StatCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <MaterialIcons name={icon} size={20} color={iconColor} />
                </View>
                <Text style={styles.label} numberOfLines={1}>
                    {label}
                </Text>
            </View>
            <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        flex: 1,
        shadowColor: Colors.neutral,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        minWidth: '45%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    label: {
        fontSize: 14,
        color: Colors.secondary,
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.neutral,
    },
});
