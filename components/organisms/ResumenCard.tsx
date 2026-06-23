import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ResumenCardProps {
    title: string;
    description: string;
    buttonText: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    onButtonPress?: () => void;
}

export default function ResumenCard({
    title,
    description,
    buttonText,
    icon,
    onButtonPress,
}: ResumenCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Resumen Semanal</Text>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={icon} size={24} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
                <PrimaryButton
                    title={buttonText}
                    onPress={onButtonPress || (() => { })}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.neutral,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        shadowColor: Colors.neutral,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: `${Colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.neutral,
    },
    description: {
        fontSize: 14,
        color: Colors.secondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    button: {
        marginTop: 4,
    },
});
