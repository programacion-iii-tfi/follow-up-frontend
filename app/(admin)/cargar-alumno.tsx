import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import { OutlinedButton } from '@/components/atoms/OutlinedButton';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import SelectInput from '@/components/atoms/SelectInput';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
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

const GRADOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIVISIONES = ['1', '2', '3', '4', '5', 'A', 'B', 'C', 'D', 'E'];
const TURNOS = ['Mañana', 'Tarde'];

export default function CargarAlumnoScreen() {
  const router = useRouter();
  const { edit } = useLocalSearchParams<{ edit?: string }>();
  const isEditing = edit === 'true';
  // Alumno
  const [apellido, setApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  // Escuela
  const [grado, setGrado] = useState('');
  const [division, setDivision] = useState('');
  const [turno, setTurno] = useState('');

  // Tutor
  const [apellidoTutor, setApellidoTutor] = useState('');
  const [nombreTutor, setNombreTutor] = useState('');
  const [telefonoContacto, setTelefonoContacto] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Lógica de validación dinámica (Para el recuadro final)
  const isFormularioCompleto =
    apellido.trim() !== '' &&
    nombre.trim() !== '' &&
    dni.trim() !== '' &&
    fechaNacimiento.trim() !== '' &&
    grado !== '' &&
    division !== '' &&
    turno !== '' &&
    apellidoTutor.trim() !== '' &&
    nombreTutor.trim() !== '' &&
    telefonoContacto.trim() !== '';
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
        <Text style={styles.headerTitle}>
          {isEditing ? 'Editar Alumno' : 'Cargar Alumno'}
        </Text>
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
            <FormField label="Apellido del alumno">
              <Input iconName="person-outline" placeholder="Ej: Pérez" value={apellido} onChangeText={setApellido} autoCapitalize="words" />
            </FormField>

            <FormField label="Nombre del alumno">
              <Input iconName="person-outline" placeholder="Ej: Lucas" value={nombre} onChangeText={setNombre} autoCapitalize="words" />
            </FormField>

            <FormField label="DNI">
              <Input iconName="badge" placeholder="Ej: 45123456" value={dni} onChangeText={setDni} keyboardType="numeric" />
            </FormField>

            <FormField label="Fecha de nacimiento">
              <Input iconName="calendar-today" placeholder="dd/mm/yyyy" value={fechaNacimiento} onChangeText={setFechaNacimiento} keyboardType="numeric" />
            </FormField>

            {/* Nuevos Selectores Separados */}
            <SelectInput label="Grado / Año" iconName="school" placeholder="Seleccionar grado..." value={grado} options={GRADOS} onChange={setGrado} />
            <SelectInput label="División" iconName="class" placeholder="Seleccionar división..." value={division} options={DIVISIONES} onChange={setDivision} />
            <SelectInput label="Turno" iconName="schedule" placeholder="Seleccionar turno..." value={turno} options={TURNOS} onChange={setTurno} />
          </View>
          <View style={styles.tutorSection}>
            <Text style={styles.tutorSectionTitle}>Información del Tutor</Text>
          </View>

          <View style={styles.form}>
            <FormField label="Apellido del tutor/padre">
              <Input iconName="person-outline" placeholder="Ej: Pérez" value={apellidoTutor} onChangeText={setApellidoTutor} autoCapitalize="words" />
            </FormField>

            <FormField label="Nombre del tutor/padre">
              <Input iconName="person-outline" placeholder="Ej: Roberto" value={nombreTutor} onChangeText={setNombreTutor} autoCapitalize="words" />
            </FormField>

            <FormField label="Teléfono de contacto">
              <Input iconName="phone" placeholder="Ej: +54 9 11 1234-5678" value={telefonoContacto} onChangeText={setTelefonoContacto} keyboardType="phone-pad" />
            </FormField>
          </View>

          <View style={[styles.dniCard, isFormularioCompleto ? styles.formValido : styles.formInvalido]}>
            <MaterialIcons
              name={isFormularioCompleto ? "check-circle" : "info"}
              size={24}
              color={isFormularioCompleto ? '#2E7D32' : Colors.error}
            />
            <Text style={[styles.dniCardText, isFormularioCompleto && { color: '#2E7D32' }]}>
              {isFormularioCompleto ? 'Formulario completo y listo para guardar' : 'Faltan campos por completar'}
            </Text>
          </View>
          <View style={styles.actions}>
            <PrimaryButton
              title={isEditing ? 'Guardar Cambios' : 'Guardar Alumno'}
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
  formValido: {
    backgroundColor: '#E8F5E9',
  },
  formInvalido: {
    backgroundColor: `${Colors.error}10`,
  },
});
