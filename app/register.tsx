import { Colors } from '@/constants/Colors';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [relacion, setRelacion] = useState(''); // 'Padre', 'Madre', o 'Otros'
  const [otraRelacion, setOtraRelacion] = useState('');

  const [errores, setErrores] = useState({
    apellido: '',
    nombre: '',
    email: '',
    password: '',
    relacion: ''
  });
  const handleRegister = () => {
    let valid = true;
    let nuevosErrores = { apellido: '', nombre: '', email: '', password: '', relacion: '' };

    if (!apellido.trim()) { nuevosErrores.apellido = 'El apellido es requerido'; valid = false; }
    if (!nombre.trim()) { nuevosErrores.nombre = 'El nombre es requerido'; valid = false; }

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
    } else if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }

    if (!relacion) {
      nuevosErrores.relacion = 'Selecciona una relación';
      valid = false;
    } else if (relacion === 'Otros' && !otraRelacion.trim()) {
      nuevosErrores.relacion = 'Escribe la relación (Ej: Padrino)';
      valid = false;
    }

    setErrores(nuevosErrores);

    if (valid) {
      const relacionFinal = relacion === 'Otros' ? otraRelacion : relacion;
      console.log('Registro exitoso:', { apellido, nombre, email, password, relacion: relacionFinal });
      // Aquí irá la llamada a la API
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.neutral} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crear Cuenta</Text>
        </View>
        <Text style={styles.subtitle}>Ingresa tus datos para registrarte en FollowUp</Text>
        <View style={styles.card}>
          <FormField label="Apellido" errorMessage={errores.apellido}>
            <Input
              iconName="person-outline"
              placeholder="Ej: Pérez"
              value={apellido}
              onChangeText={setApellido}
              autoCapitalize="words"
            />
          </FormField>
          <FormField label="Nombre" errorMessage={errores.nombre}>
            <Input
              iconName="person-outline"
              placeholder="Ej: Juan"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
            />
          </FormField>
          <Text style={styles.inputLabel}>Relación con el alumno</Text>
          <View style={styles.relacionRow}>
            {['Padre', 'Madre', 'Otros'].map((op) => (
              <TouchableOpacity
                key={op}
                style={[styles.relacionPill, relacion === op && styles.relacionPillActiva]}
                onPress={() => setRelacion(op)}
              >
                <Text style={[styles.relacionText, relacion === op && styles.relacionTextActivo]}>
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errores.relacion ? <Text style={styles.errorText}>{errores.relacion}</Text> : null}
          {/* Este input aparece mágicamente solo si elige "Otros" */}
          {relacion === 'Otros' && (
            <FormField label="Especificar relación">
              <Input
                iconName="edit"
                placeholder="Ej: Padrino, Abuela..."
                value={otraRelacion}
                onChangeText={setOtraRelacion}
                autoCapitalize="words"
              />
            </FormField>
          )}

          <FormField label="Correo Electrónico" errorMessage={errores.email}>
            <Input
              iconName="mail-outline"
              placeholder="email@ejemplo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </FormField>

          <FormField label="Contraseña" errorMessage={errores.password}>
            <Input
              iconName="lock-outline"
              placeholder="*********"
              value={password}
              onChangeText={setPassword}
              isPassword
            />
          </FormField>
          <PrimaryButton
            title="Registrarse"
            onPress={handleRegister}
            style={styles.registerButton}
          />
        </View>
        <TouchableOpacity
          style={styles.loginLinkContainer}
          onPress={() => router.replace('/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginLinkText}>
            ¿Ya tienes cuenta? <Text style={styles.loginLinkHighlight}>Iniciar sesión</Text>
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
  loginLinkHighlight: {
    color: Colors.primary,
    fontWeight: '700',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 8,
  },
  relacionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  relacionPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  relacionPillActiva: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}15`,
  },
  relacionText: {
    color: Colors.secondary,
    fontWeight: '500',
  },
  relacionTextActivo: {
    color: Colors.primary,
    fontWeight: '700',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 16,
  },
});
