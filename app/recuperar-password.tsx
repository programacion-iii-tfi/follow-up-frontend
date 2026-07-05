import { Colors } from '@/constants/Colors';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecuperarPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleRecuperar = () => {
    if (!email.trim()) {
      setErrorEmail('El correo es requerido');
      return;
    } else if (!email.includes('@')) {
      setErrorEmail('El formato del correo es inválido');
      return;
    }

    setErrorEmail('');
    // Simulamos envío al backend
    setEnviado(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo-sf.png')}
              style={styles.logoImage}
              contentFit="contain"
            />
          </View>
          
          <View style={styles.card}>
            {!enviado ? (
              <>
                <Text style={styles.title}>Recuperar Contraseña</Text>
                <Text style={styles.subtitle}>
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </Text>
                
                <FormField label="Correo Electrónico" errorMessage={errorEmail}>
                  <Input
                    iconName="mail-outline"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </FormField>

                <View style={styles.buttonContainer}>
                  <PrimaryButton title="Enviar enlace" onPress={handleRecuperar} />
                </View>
              </>
            ) : (
              <View style={styles.successContainer}>
                <Text style={styles.successTitle}>¡Correo enviado!</Text>
                <Text style={styles.successSubtitle}>
                  Revisa tu bandeja de entrada (y la carpeta de spam). Hemos enviado las instrucciones a: {'\n'}
                  <Text style={{ fontWeight: '700', color: Colors.primary, marginTop: 8 }}>{email}</Text>
                </Text>
              </View>
            )}

            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                <Text style={styles.footerText}>Volver al <Text style={styles.linkText}>Inicio de sesión</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 32,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#137333',
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footerContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
