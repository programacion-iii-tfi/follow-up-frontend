import { Colors } from '@/constants/Colors';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { OutlinedButton } from '@/components/atoms/OutlinedButton';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({ email: '', password: '' });

  const handleAcceder = () => {
    let valid = true;
    let nuevosErrores = { email: '', password: '' };

    if (!email.trim()) {
      nuevosErrores.email = 'El correo electrónico es requerido';
      valid = false;
    } else if (!email.includes('@')) {
      nuevosErrores.email = 'El formato del correo es inválido';
      valid = false;
    }

    if (!password) {
      nuevosErrores.password = 'La contraseña es requerida';
      valid = false;
    }

    setErrores(nuevosErrores);

    if (valid) {
      router.replace('/_sitemap' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo-sf.png')}
              style={styles.logoImage}
              contentFit="contain"
              placeholder={{ blurhash: 'L00000fQfQfQfQfQfQfQfQfQfQfQ' }}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
            <FormField label="Usuario" errorMessage={errores.email}>
              <Input
                iconName="person-outline"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormField>

            <FormField label="Contraseña" errorMessage={errores.password}>
              <Input
                iconName="lock-outline"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
            </FormField>
            <View style={styles.accederRow}>
              <PrimaryButton
                title="Acceder"
                onPress={handleAcceder}
                style={styles.accederButton}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => router.push('/recuperar-password')}
              activeOpacity={0.7}
            >
              <MaterialIcons name="help-outline" size={16} color={Colors.primary} />
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <OutlinedButton title="Soy Tutor" onPress={() => router.push('/register')} />
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 24,
  },
  rolCardActivo: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  rolCardText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.secondary,
  },
  rolCardTextActivo: {
    color: Colors.primary,
    fontWeight: '700',
  },
  accederRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  accederButton: {
    minWidth: 120,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 24,
  },
});
