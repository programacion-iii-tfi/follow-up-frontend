import { Colors } from '@/constants/Colors';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ValidarCodigoScreen() {
    const router = useRouter();
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleValidar = () => {
        if (!codigo.trim()) {
            setError('Por favor, ingresa el código del alumno');
            return;
        }

        // Aquí a futuro se validará con el backend. Por ahora simulamos la carga:
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            // Validamos un código de prueba (ej: ALUMNO123)
            if (codigo.toUpperCase() === 'ALUMNO123') {
                router.push('/register'); // Código válido: avanza al registro
            } else {
                setError('Código inválido o inexistente. Verifica e intenta nuevamente.');
            }
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

                <View style={styles.content}>
                    <MaterialIcons name="security" size={64} color={Colors.primary} style={styles.icon} />
                    <Text style={styles.title}>Código de Vinculación</Text>
                    <Text style={styles.subtitle}>
                        Para registrarte como tutor, necesitas ingresar el código único de 9 dígitos provisto por la institución escolar.
                    </Text>

                    <View style={styles.card}>
                        <FormField label="Código del Alumno" errorMessage={error}>
                            <Input
                                iconName="vpn-key"
                                placeholder="Ej: ALUMNO123"
                                value={codigo}
                                onChangeText={(text) => {
                                    setCodigo(text);
                                    setError('');
                                }}
                                autoCapitalize="characters"
                            />
                        </FormField>

                        <PrimaryButton
                            title="Validar Código"
                            onPress={handleValidar}
                            isLoading={isLoading}
                            style={styles.button}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.background },
    keyboardView: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 16 },
    content: { flex: 1, padding: 24, justifyContent: 'center' },
    icon: { alignSelf: 'center', marginBottom: 24 },
    title: { fontSize: 24, fontWeight: '800', color: Colors.neutral, textAlign: 'center', marginBottom: 8 },
    subtitle: { fontSize: 14, color: Colors.secondary, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
    card: { backgroundColor: Colors.surface, borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    button: { marginTop: 16 }
});