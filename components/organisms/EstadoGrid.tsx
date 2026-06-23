import StatCard from '@/components/molecules/StatCard';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface StatCardData {
    id: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconColor: string;
    label: string;
    value: string;
    valueColor?: string;
}

interface EstadoGridProps {
    stats: StatCardData[];
}

export default function EstadoGrid({ stats }: EstadoGridProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estado de Hoy</Text>
            <View style={styles.grid}>
                {stats.map((stat) => (
                    <View key={stat.id} style={styles.cardWrapper}>
                        <StatCard
                            icon={stat.icon}
                            iconColor={stat.iconColor}
                            label={stat.label}
                            value={stat.value}
                            valueColor={stat.valueColor}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.neutral,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '48%',
        marginBottom: 16,
    },
});
