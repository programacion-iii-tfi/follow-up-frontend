import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#4A6FA5';

type TipoObservacion = 'Positiva' | 'Conductual' | 'Academica';

const alumnos = ['F. Alegre', 'D. Ramirez', 'P. Ramirez', 'L. Hofer', 'E. Vicentin'];

const tiposObservacion = [
  { id: 'Positiva' as TipoObservacion, label: 'Positiva', icono: 'thumb-up' as const, color: '#386A20' },
  { id: 'Conductual' as TipoObservacion, label: 'Conductual', icono: 'warning' as const, color: '#E65100' },
  { id: 'Academica' as TipoObservacion, label: 'Académica', icono: 'school' as const, color: '#B3261E' },
];

export default function ObservacionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [busqueda, setBusqueda] = useState('');
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<string>('F. Alegre');
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoObservacion>('Positiva');
  const [descripcion, setDescripcion] = useState('');
  const [materiaContexto, setMateriaContexto] = useState('Matemáticas - Clase del 29/06');
  const [visibleTutores, setVisibleTutores] = useState(true);
  const [visibleDireccion, setVisibleDireccion] = useState(false);

  const alumnosFiltrados = alumnos.filter((a) =>
    a.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleGuardar = () => {
    // TODO: integrate with backend
    router.back();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="close" size={24} color={Colors.neutral} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registrar Observación</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 16) + 80 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── Buscador de alumnos ────────────── */}
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={18} color={Colors.outline} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar alumno..."
                placeholderTextColor={Colors.outline}
                value={busqueda}
                onChangeText={setBusqueda}
              />
              {busqueda.length > 0 && (
                <TouchableOpacity onPress={() => setBusqueda('')}>
                  <MaterialIcons name="close" size={16} color={Colors.outline} />
                </TouchableOpacity>
              )}
            </View>

            {/* ── Chips de alumnos ───────────────── */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              {alumnosFiltrados.map((alumno) => {
                const isActive = alumno === alumnoSeleccionado;
                return (
                  <TouchableOpacity
                    key={alumno}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => setAlumnoSeleccionado(alumno)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                      {alumno}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* ── Tipo de Observación ────────────── */}
            <Text style={styles.sectionLabel}>TIPO DE OBSERVACIÓN</Text>
            <View style={styles.tiposRow}>
              {tiposObservacion.map((tipo) => {
                const isActive = tipo.id === tipoSeleccionado;
                return (
                  <TouchableOpacity
                    key={tipo.id}
                    style={[
                      styles.tipoCard,
                      isActive && { borderColor: tipo.color, backgroundColor: tipo.color + '10' },
                    ]}
                    onPress={() => setTipoSeleccionado(tipo.id)}
                    activeOpacity={0.75}
                  >
                    <MaterialIcons
                      name={tipo.icono}
                      size={26}
                      color={isActive ? tipo.color : Colors.outline}
                    />
                    <Text style={[styles.tipoLabel, isActive && { color: tipo.color }]}>
                      {tipo.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Descripción ───────────────────── */}
            <Text style={styles.sectionLabel}>DESCRIPCIÓN</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describa brevemente la observación..."
              placeholderTextColor={Colors.outline}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* ── Materia / Contexto ───────────── */}
            <Text style={styles.sectionLabel}>MATERIA / CONTEXTO</Text>
            <TextInput
              style={styles.inputField}
              value={materiaContexto}
              onChangeText={setMateriaContexto}
              placeholderTextColor={Colors.outline}
            />

            {/* ── Visibilidad ──────────────────── */}
            <Text style={styles.sectionLabel}>¿QUIÉN PUEDE VER ESTO?</Text>
            <View style={styles.visibilidadCard}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Visible para Tutores/Padres</Text>
                <Switch
                  value={visibleTutores}
                  onValueChange={setVisibleTutores}
                  trackColor={{ false: '#E0E0E0', true: PRIMARY + '80' }}
                  thumbColor={visibleTutores ? PRIMARY : '#BDBDBD'}
                />
              </View>
              <View style={styles.switchDivider} />
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Visible para Dirección</Text>
                <Switch
                  value={visibleDireccion}
                  onValueChange={setVisibleDireccion}
                  trackColor={{ false: '#E0E0E0', true: PRIMARY + '80' }}
                  thumbColor={visibleDireccion ? PRIMARY : '#BDBDBD'}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* ── Botón Guardar fijo abajo ──────────── */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar} activeOpacity={0.85}>
            <MaterialIcons name="save" size={20} color={Colors.white} />
            <Text style={styles.saveButtonText}>Guardar Observación</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral,
    paddingVertical: 0,
  },
  chipsRow: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 0.6,
    marginTop: 10,
    marginBottom: 6,
  },
  tiposRow: {
    flexDirection: 'row',
    gap: 10,
  },
  tipoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  tipoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
  },
  textArea: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.neutral,
    minHeight: 100,
    lineHeight: 20,
  },
  inputField: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.neutral,
  },
  visibilidadCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  switchLabel: {
    fontSize: 14,
    color: Colors.neutral,
    fontWeight: '500',
  },
  switchDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
