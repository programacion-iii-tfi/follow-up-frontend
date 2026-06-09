import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomInput } from '@/components/CustomInput';
import { PrimaryButton } from '@/components/PrimaryButton';


export default function RegisterScreen() {
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');

    const [password, setPassword] = useState('');

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

                <View style={styles.card}>

                    <CustomInput
                        label='nombre y apellido'
                        iconName='person-outline'
                        placeholder='Ej. Damian Ramirez'
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize='words'
                    />

                    <CustomInput
                        label='Correo Electrónico'
                        iconName='mail-outline'
                        placeholder='email@ejemplo.com'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />

                    <CustomInput
                        label='DNI del alumno'
                        iconName='badge'
                        placeholder='12.345.678'
                        value={studentId}
                        onChangeText={setStudentId}
                        keyboardType='numeric'
                    />

                    <CustomInput
                        label='Contraseña'
                        iconName='lock-outline'
                        placeholder='*********'
                        value={password}
                        onChangeText={setPassword}
                        isPassword={true}
                    />

                    <PrimaryButton
                        title='Registrarse'
                        onPress={() => console.log('registro solicitado:', { fullName, email, studentId, password })}
                        style={styles.registerButton}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginLinkContainer} onPress={() => router.back()} activeOpacity={0.7}>
                    <Text style={styles.loginLinkText}>
                        ¿Ya tienes cuenta? <Text style={styles.loginLinkHighLight}>Iniciar sesión</Text>
                    </Text>
                </TouchableOpacity>

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
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    registerButton: {
        marginTop: 32,
    },

    loginLinkContainer: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },

    loginLinkText: {
        fontSize: 14,
        color: Colors.secondary,
        fontWeight: '700',
    },

    loginLinkHighLight: {
        color: Colors.primary,
        fontWeight: '700',
    },
});
