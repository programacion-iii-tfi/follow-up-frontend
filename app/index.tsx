import { Colors } from '@/constants/Colors';
import { CustomInput } from '@/components/atoms/CustomInput';
import { OutlinedButton } from '@/components/atoms/OutlinedButton';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <CustomInput
              label="Usuario"
              iconName="person-outline"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="Contraseña"
              iconName="lock-outline"
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              isPassword
            />
            <View style={styles.accederRow}>
              <PrimaryButton
                title="Acceder"
                onPress={() => router.push('/(tutor)')}
                style={styles.accederButton}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <MaterialIcons name="help-outline" size={16} color={Colors.primary} />
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </View>
          </View>
          <View style={styles.registerContainer}>
            <OutlinedButton title="Registrarse" onPress={() => router.push('/register')} />
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
