import MenuItemRow from '@/components/molecules/MenuItemRow';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ModuloItemData {
    id: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress?: () => void;
}

interface ModulosListProps {
    modulos: ModuloItemData[];
}

export default function ModulosList({ modulos }: ModulosListProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Módulos de Gestión</Text>
            <View style={styles.list}>
                {modulos.map((modulo) => (
                    <MenuItemRow
                        key={modulo.id}
                        icon={modulo.icon}
                        label={modulo.label}
                        onPress={modulo.onPress}
                    />
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
    list: {
        paddingHorizontal: 20,
    },
});
