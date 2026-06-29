import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#4A6FA5';

type TipoEval = 'Examen' | 'Trabajo Práctico' | 'Participación' | 'Laboratorio';

const materias = [
  'Matemáticas Avanzadas',
  'Álgebra',
  'Física Cuántica',
  'Cálculo',
];

const tiposEval: { id: TipoEval; icono: keyof typeof MaterialIcons.glyphMap }[] = [
  { id: 'Examen', icono: 'assignment' },
  { id: 'Trabajo Práctico', icono: 'edit-document' },
  { id: 'Participación', icono: 'record-voice-over' },
  { id: 'Laboratorio', icono: 'science' },
];

interface AlumnoNota {
  id: string;
  nombre: string;
  idAlumno: string;
  iniciales: string;
  avatarColor: string;
  nota: string;
}

const alumnosBase: AlumnoNota[] = [
  { id: '1', nombre: 'Alba Martínez', idAlumno: 'ID: 2024-001', iniciales: 'AM', avatarColor: '#6750A4', nota: '9' },
  { id: '2', nombre: 'Bruno González', idAlumno: 'ID: 2024-012', iniciales: 'BG', avatarColor: '#B3261E', nota: '3' },
  { id: '3', nombre: 'Clara Rodríguez', idAlumno: 'ID: 2024-045', iniciales: 'CR', avatarColor: '#386A20', nota: '' },
  { id: '4', nombre: 'Diego López', idAlumno: 'ID: 2024-089', iniciales: 'DL', avatarColor: '#625B71', nota: '7,5' },
  { id: '5', nombre: 'Elena Sánchez', idAlumno: 'ID: 2024-102', iniciales: 'ES', avatarColor: '#E65100', nota: '' },
  { id: '6', nombre: 'Fabián Torres', idAlumno: 'ID: 2024-115', iniciales: 'FT', avatarColor: PRIMARY, nota: '6' },
  { id: '7', nombre: 'Gloria Vega', idAlumno: 'ID: 2024-128', iniciales: 'GV', avatarColor: '#6750A4', nota: '10' },
  { id: '8', nombre: 'Hugo Méndez', idAlumno: 'ID: 2024-134', iniciales: 'HM', avatarColor: '#386A20', nota: '4' },
];

function getBorderColor(nota: string): string | undefined {
  if (nota === '') return undefined;
  const num = parseFloat(nota.replace(',', '.'));
  if (isNaN(num)) return undefined;
  return num >= 6 ? '#386A20' : '#B3261E';
}

export default function NotasDocenteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [materiaActiva, setMateriaActiva] = useState(materias[0]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [tipoActivo, setTipoActivo] = useState<TipoEval>('Examen');
  const [alumnos, setAlumnos] = useState<AlumnoNota[]>(alumnosBase);

  const setNota = (id: string, value: string) => {
    // Allow only numbers, comma and dot
    const cleaned = value.replace(/[^0-9.,]/g, '');
    setAlumnos((prev) => prev.map((a) => a.id === id ? { ...a, nota: cleaned } : a));
  };

  const handleGuardar = () => {
    router.back();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Calificaciones</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialIcons name="notifications-none" size={24} color={Colors.neutral} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>
          </View>
        </View>

        {/* ── Selector de Materia ───────────── */}
        <View style={styles.materiaContainer}>
          <View style={{ zIndex: 10 }}>
            <Text style={styles.materiaLabel}>MATERIA</Text>
            <View style={styles.materiaRow}>
              <Text style={styles.materiaNombre} numberOfLines={1}>{materiaActiva}</Text>
              <TouchableOpacity
                style={styles.cambiarButton}
                onPress={() => setMostrarDropdown(!mostrarDropdown)}
                activeOpacity={0.7}
              >
                <Text style={styles.cambiarText}>Cambiar</Text>
                <MaterialIcons
                  name={mostrarDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={18}
                  color={PRIMARY}
                />
              </TouchableOpacity>
            </View>
            {mostrarDropdown && (
              <View style={styles.dropdownMenu}>
                {materias.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.dropdownItem, m === materiaActiva && styles.dropdownItemActive]}
                    onPress={() => { setMateriaActiva(m); setMostrarDropdown(false); }}
                  >
                    <Text style={[styles.dropdownItemText, m === materiaActiva && styles.dropdownItemTextActive]}>{m}</Text>
                    {m === materiaActiva && <MaterialIcons name="check" size={16} color={PRIMARY} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ── Chips de Tipo de Evaluación ───── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
        >
          {tiposEval.map((tipo) => {
            const isActive = tipo.id === tipoActivo;
            return (
              <TouchableOpacity
                key={tipo.id}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => setTipoActivo(tipo.id)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={tipo.icono}
                  size={16}
                  color={isActive ? '#21005D' : '#49454F'}
                />
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {tipo.id}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Encabezado de lista ───────────── */}
        <View style={[styles.listHeader, styles.listHeaderPadded]}>
          <Text style={styles.listHeaderLeft}>Alumnos ({alumnos.length})</Text>
          <Text style={styles.listHeaderRight}>Nota (0-10)</Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            {/* ── Lista de Alumnos ──────────────── */}
            <FlatList
              data={alumnos}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 16) + 80 }]}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const borderColor = getBorderColor(item.nota);
                return (
                  <View style={[
                    styles.alumnoRow,
                    borderColor ? { borderLeftColor: borderColor, borderLeftWidth: 4 } : {},
                  ]}>
                    <View style={[styles.alumnoAvatar, { backgroundColor: item.avatarColor }]}>
                      <Text style={styles.alumnoAvatarText}>{item.iniciales}</Text>
                    </View>
                    <View style={styles.alumnoInfo}>
                      <Text style={styles.alumnoNombre}>{item.nombre}</Text>
                      <Text style={styles.alumnoId}>{item.idAlumno}</Text>
                    </View>
                    <TextInput
                      style={[
                        styles.notaInput,
                        borderColor === '#386A20' && styles.notaInputAprobado,
                        borderColor === '#B3261E' && styles.notaInputReprobado,
                      ]}
                      value={item.nota}
                      onChangeText={(v) => setNota(item.id, v)}
                      keyboardType="decimal-pad"
                      placeholder="–"
                      placeholderTextColor={Colors.outline}
                      maxLength={4}
                      textAlign="center"
                    />
                  </View>
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>

        {/* ── Botón Guardar fijo ────────────────── */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar} activeOpacity={0.85}>
            <MaterialIcons name="save" size={22} color={Colors.white} />
            <Text style={styles.saveButtonText}>Guardar Notas</Text>
          </TouchableOpacity>
        </View>

        {/* ── Bottom Bar ───────────────────────── */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 4) }]}>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(docente)/index')} activeOpacity={0.7}>
            <MaterialIcons name="space-dashboard" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(docente)/materias')} activeOpacity={0.7}>
            <MaterialIcons name="class" size={24} color={PRIMARY} />
            <Text style={[styles.bottomBarText, { color: PRIMARY }]}>Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="person-outline" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Perfil</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  materiaContainer: {
    marginBottom: 14,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  materiaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: PRIMARY,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  materiaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materiaNombre: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.neutral,
    flex: 1,
  },
  cambiarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cambiarText: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 56,
    right: 0,
    width: 220,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemActive: { backgroundColor: PRIMARY + '08' },
  dropdownItemText: { fontSize: 13, color: Colors.secondary },
  dropdownItemTextActive: { color: PRIMARY, fontWeight: '700' },
  chipsScroll: {
    flexShrink: 0,
    marginBottom: 14,
  },
  chipsRow: {
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#79747E',
  },
  chipActive: {
    backgroundColor: '#E8DDFF',
    borderColor: '#E8DDFF',
  },
  chipText: { fontSize: 12, fontWeight: '600', color: '#49454F' },
  chipTextActive: { color: '#21005D' },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listHeaderPadded: {
    paddingHorizontal: 20,
  },
  listHeaderLeft: { fontSize: 13, fontWeight: '700', color: Colors.secondary },
  listHeaderRight: { fontSize: 12, fontWeight: '700', color: Colors.outline },
  listContent: { gap: 10 },
  alumnoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    overflow: 'hidden',
  },
  alumnoAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alumnoAvatarText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  alumnoInfo: { flex: 1 },
  alumnoNombre: { fontSize: 14, fontWeight: '700', color: Colors.neutral, marginBottom: 2 },
  alumnoId: { fontSize: 12, color: Colors.secondary },
  notaInput: {
    width: 54,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8FA',
    fontSize: 16,
    fontWeight: '800',
    color: Colors.neutral,
    textAlign: 'center',
  },
  notaInputAprobado: {
    borderColor: '#386A20',
    backgroundColor: '#386A2010',
    color: '#386A20',
  },
  notaInputReprobado: {
    borderColor: '#B3261E',
    backgroundColor: '#B3261E10',
    color: '#B3261E',
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
  saveButtonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  bottomBarItem: { flex: 1, alignItems: 'center', paddingVertical: 6, gap: 4 },
  bottomBarText: { fontSize: 11, fontWeight: '500', color: Colors.outline },
});
