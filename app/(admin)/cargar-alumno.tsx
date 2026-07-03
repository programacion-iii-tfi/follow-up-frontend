import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { OutlinedButton } from '@/components/atoms/OutlinedButton';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import SelectInput from '@/components/atoms/SelectInput';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CURSOS = [
  '1° A - Mañana',
  '1° B - Tarde',
  '2° A - Mañana',
  '2° B - Tarde',
  '3° A - Mañana',
  '3° B - Noche',
  '4° A - Mañana',
  '5° A - Tarde',
  '6° A - Noche',
];

export default function CargarAlumnoScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [curso, setCurso] = useState('');
  const [email, setEmail] = useState('');
  const [nombreTutor, setNombreTutor] = useState('');
  const [telefonoContacto, setTelefonoContacto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardar = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.neutral} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cargar Alumno</Text>
        <View style={styles.avatarSmall}>
          <MaterialIcons name="person" size={18} color={Colors.onPrimary} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.subtitle}>
            Completá la información del estudiante para darlo de alta en el sistema.
          </Text>

          <View style={styles.form}>
            <FormField label="Nombre completo">
              <Input
                iconName="person-outline"
                placeholder="Ej: Lucas Pérez"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
              />
            </FormField>

            <FormField label="DNI">
              <Input
                iconName="badge"
                placeholder="Ej: 45123456"
                value={dni}
                onChangeText={setDni}
                keyboardType="numeric"
              />
            </FormField>

            <FormField label="Fecha de nacimiento">
              <Input
                iconName="calendar-today"
                placeholder="dd/mm/yyyy"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
                keyboardType="numeric"
              />
            </FormField>


            <SelectInput
              label="Curso / División"
              iconName="school"
              placeholder="Seleccionar curso..."
              value={curso}
              options={CURSOS}
              onChange={setCurso}
            />

            <FormField label="Email institucional">
              <Input
                iconName="mail-outline"
                placeholder="alumno@escuela.edu.ar"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormField>
          </View>

          <View style={styles.tutorSection}>
            <Text style={styles.tutorSectionTitle}>Información del Tutor</Text>
          </View>

          <View style={styles.form}>
            <FormField label="Nombre del tutor/padre">
              <Input
                iconName="person-outline"
                placeholder="Ej: Roberto Pérez"
                value={nombreTutor}
                onChangeText={setNombreTutor}
                autoCapitalize="words"
              />
            </FormField>

            <FormField label="Teléfono de contacto">
              <Input
                iconName="phone"
                placeholder="Ej: +54 9 11 1234-5678"
                value={telefonoContacto}
                onChangeText={setTelefonoContacto}
                keyboardType="phone-pad"
              />
            </FormField>
          </View>

          <View style={styles.altaCard}>
            <View style={styles.altaCardContent}>
              <Text style={styles.altaCardTitle}>Alta Automática</Text>
              <Text style={styles.altaCardDescription}>
                El alumno tendrá acceso al portal una vez guardado.
              </Text>
            </View>
            <MaterialIcons name="verified-user" size={32} color={`${Colors.primary}60`} />
          </View>

          <View style={styles.dniCard}>
            <MaterialIcons name="info" size={24} color={Colors.error} />
            <Text style={styles.dniCardText}>DNI Verificado</Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton
              title="Guardar Alumno"
              onPress={handleGuardar}
              isLoading={isLoading}
              style={styles.primaryBtn}
            />
            <OutlinedButton
              title="Cancelar"
              onPress={() => router.back()}
              style={styles.outlinedBtn}
            />
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
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceVariant,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral,
    flex: 1,
    marginLeft: 12,
  },
  avatarSmall: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
    marginBottom: 24,
  },
  form: {
    marginBottom: 8,
  },
  tutorSection: {
    marginBottom: 16,
    marginTop: 8,
  },
  tutorSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 8,
    overflow: 'hidden',
  },
  altaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  altaCardContent: {
    flex: 1,
  },
  altaCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  altaCardDescription: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 16,
  },
  dniCard: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: `${Colors.error}10`,
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 28,
  },
  dniCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
  },
  actions: {
    gap: 12,
  },
  primaryBtn: {
    borderRadius: 24,
  },
  outlinedBtn: {
    borderRadius: 24,
  },
});
