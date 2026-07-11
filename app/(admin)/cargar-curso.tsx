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
import ValidationCard from '@/components/molecules/ValidationCard';

const GRADOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIVISIONES = ['1', '2', '3', '4', '5', 'A', 'B', 'C', 'D', 'E'];
const TURNOS = ['Mañana', 'Tarde'];
const DOCENTES = [
  'María González',
  'Carlos Rodríguez',
  'Laura Martínez',
  'Jorge López',
  'Ana Fernández',
];

export default function CargarCursoScreen() {
  const router = useRouter();

  const [grado, setGrado] = useState('');
  const [division, setDivision] = useState('');
  const [turno, setTurno] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lógica de validación dinámica
  const isFormularioCompleto =
    grado !== '' &&
    division !== '' &&
    turno !== '' &&
    capacidad.trim() !== '';

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
        <Text style={styles.headerTitle}>Cargar Curso</Text>
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
          <Text style={styles.sectionTitle}>Información Académica</Text>
          <Text style={styles.sectionSubtitle}>
            Completá los detalles para registrar una nueva división en el sistema.
          </Text>

          <View style={styles.form}>
            <SelectInput
              label="Grado / Año"
              iconName="school"
              placeholder="Seleccionar grado..."
              value={grado}
              options={GRADOS}
              onChange={setGrado}
            />
            <SelectInput
              label="División"
              iconName="class"
              placeholder="Seleccionar división..."
              value={division}
              options={DIVISIONES}
              onChange={setDivision}
            />
            <SelectInput
              label="Turno"
              iconName="schedule"
              placeholder="Seleccionar turno..."
              value={turno}
              options={TURNOS}
              onChange={setTurno}
            />

            <FormField label="Capacidad máxima de alumnos">
              <Input
                iconName="groups"
                placeholder="Ej: 30"
                value={capacidad}
                onChangeText={setCapacidad}
                keyboardType="numeric"
              />
            </FormField>
          </View>
          <View style={styles.hintsRow}>
            <View style={[styles.hintCard, styles.hintBlue]}>
              <MaterialIcons name="info-outline" size={18} color={Colors.primary} />
              <Text style={[styles.hintText, { color: Colors.primary }]}>
                Promedio alumnos sugerido: 30
              </Text>
            </View>
            <View style={[styles.hintCard, styles.hintRed]}>
              <MaterialIcons name="warning-amber" size={18} color={Colors.error} />
              <Text style={[styles.hintText, { color: Colors.error }]}>
                Cupos limitados por aula física
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <ValidationCard isValid={isFormularioCompleto} />
            <PrimaryButton
              title="Guardar Curso"
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.neutral,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
    marginBottom: 28,
  },
  form: {
    marginBottom: 8,
  },
  hintsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
    marginTop: 4,
  },
  hintCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  hintBlue: {
    backgroundColor: `${Colors.primary}12`,
  },
  hintRed: {
    backgroundColor: `${Colors.error}12`,
  },
  hintText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
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
