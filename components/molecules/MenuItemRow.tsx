import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemRowProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress?: () => void;
}

export default function MenuItemRow({ icon, label, onPress }: MenuItemRowProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <View style={styles.leftSection}>
                <View style={styles.iconBackground}>
                    <MaterialIcons name={icon} size={20} color={Colors.primary} />
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.secondary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: Colors.neutral,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBackground: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: `${Colors.primary}10`, // Color primario con 10% de opacidad
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.neutral,
    },
});
