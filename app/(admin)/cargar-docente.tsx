import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { OutlinedButton } from '@/components/atoms/OutlinedButton';
import { Input } from '@/components/atoms/Input';
import { FormField } from '@/components/molecules/FormField';
import SubjectsSelector from '@/components/molecules/SubjectsSelector';
import TurnoSelector from '@/components/molecules/TurnoSelector';
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

export default function CargarDocenteScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [materias, setMaterias] = useState<string[]>([]);
  const [turno, setTurno] = useState('');
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
        <Text style={styles.headerTitle}>Cargar Docente</Text>
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
          <View style={styles.heroBanner}>
            <Text style={styles.heroTitle}>Nuevo Perfil</Text>
            <Text style={styles.heroSubtitle}>
              Completá la información para integrar al nuevo docente al equipo institucional.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="person-outline" size={16} color={Colors.secondary} />
              <Text style={styles.sectionLabel}>INFORMACIÓN PERSONAL</Text>
            </View>
            <FormField label="Nombre completo">
              <Input
                iconName="person-outline"
                placeholder="Ej: María González"
                value={nombre}
                onChangeText={setNombre}
                autoCapitalize="words"
              />
            </FormField>

            <FormField label="DNI / Identificación">
              <Input
                iconName="badge"
                placeholder="Ej: 30123456"
                value={dni}
                onChangeText={setDni}
                keyboardType="numeric"
              />
            </FormField>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="contact-mail" size={16} color={Colors.secondary} />
              <Text style={styles.sectionLabel}>CONTACTO</Text>
            </View>

            <FormField label="Email Institucional">
              <Input
                iconName="mail-outline"
                placeholder="docente@escuela.edu.ar"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FormField>

            <FormField label="Teléfono">
              <Input
                iconName="phone"
                placeholder="Ej: +54 9 11 1234-5678"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
            </FormField>
          </View>

          <SubjectsSelector selected={materias} onChange={setMaterias} />

          <TurnoSelector selected={turno} onChange={setTurno} />

          <View style={styles.actions}>
            <PrimaryButton
              title="Guardar Docente"
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
  heroBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: `${Colors.white}CC`,
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.8,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
  primaryBtn: {
    borderRadius: 24,
  },
  outlinedBtn: {
    borderRadius: 24,
  },
});
