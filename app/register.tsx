import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>

                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name='arrow-back' size={24} color={Colors.neutral} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Crear Cuenta</Text>
                </View>

                {/* Subtítulo informativo */}
                <Text style={styles.subtitle}>
                    Ingresa tus datos para registrarte en FollowUp
                </Text>

                <View style={styles.placeholderCard}>
                    <Text style={styles.placeholderText}>[Formulario en Construcción]</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
        gap: 16,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.neutral,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.secondary,
        lineHeight: 22,
        marginBottom: 32,
    },
    placeholderCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: Colors.secondary,
        fontSize: 14,
    }
});
