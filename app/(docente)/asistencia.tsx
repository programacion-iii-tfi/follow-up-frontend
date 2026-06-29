import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#4A6FA5';

type EstadoAsistencia = 'P' | 'A' | 'J' | null;

interface Alumno {
  id: string;
  nombre: string;
  legajo: string;
  iniciales: string;
  avatarColor: string;
  estado: EstadoAsistencia;
}

const materias = [
  'Matemáticas Avanzadas - 5° A',
  'Álgebra - 4° B',
  'Física - 3° A',
  'Cálculo - 6° A',
];

const alumnosIniciales: Alumno[] = [
  { id: '1', nombre: 'Alonso, Mateo', legajo: '#29402', iniciales: 'AM', avatarColor: '#6750A4', estado: null },
  { id: '2', nombre: 'Benítez, Rosa', legajo: '#29405', iniciales: 'BR', avatarColor: '#B3261E', estado: null },
  { id: '3', nombre: 'Castillo, Juan', legajo: '#29410', iniciales: 'CJ', avatarColor: '#386A20', estado: null },
  { id: '4', nombre: 'Díaz, Martina', legajo: '#29412', iniciales: 'DM', avatarColor: '#625B71', estado: null },
  { id: '5', nombre: 'Estrada, Lucas', legajo: '#29415', iniciales: 'EL', avatarColor: '#E65100', estado: null },
  { id: '6', nombre: 'Fernández, Ana', legajo: '#29420', iniciales: 'FA', avatarColor: '#4A6FA5', estado: null },
  { id: '7', nombre: 'García, Pablo', legajo: '#29423', iniciales: 'GP', avatarColor: '#6750A4', estado: null },
  { id: '8', nombre: 'Herrera, Sofía', legajo: '#29428', iniciales: 'HS', avatarColor: '#B3261E', estado: null },
];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const estadoConfig = {
  P: { label: 'P', color: '#386A20', bg: '#386A20' },
  A: { label: 'A', color: '#B3261E', bg: '#B3261E' },
  J: { label: 'J', color: '#E65100', bg: '#E65100' },
};

export default function AsistenciaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const today = new Date();
  const [fecha, setFecha] = useState(today);
  const [materiaActiva, setMateriaActiva] = useState(materias[0]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [alumnos, setAlumnos] = useState<Alumno[]>(alumnosIniciales);

  const isToday =
    fecha.getDate() === today.getDate() &&
    fecha.getMonth() === today.getMonth() &&
    fecha.getFullYear() === today.getFullYear();

  const cambiarDia = (delta: number) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(fecha.getDate() + delta);
    setFecha(nuevaFecha);
  };

  const setEstado = (id: string, nuevoEstado: EstadoAsistencia) => {
    setAlumnos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, estado: a.estado === nuevoEstado ? null : nuevoEstado } : a
      )
    );
  };

  const presentes = alumnos.filter((a) => a.estado === 'P').length;
  const ausentes = alumnos.filter((a) => a.estado === 'A').length;
  const justificados = alumnos.filter((a) => a.estado === 'J').length;

  const fechaLabel = `${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]}`;

  const handleConfirmar = () => {
    // TODO: integrate with backend
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
          <Text style={styles.headerTitle}>Tomar Asistencia</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.neutral} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* ── Selector de Materia ───────────────── */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>Materia / Curso</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setMostrarDropdown(!mostrarDropdown)}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownText} numberOfLines={1}>{materiaActiva}</Text>
              <MaterialIcons
                name={mostrarDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={22}
                color={Colors.secondary}
              />
            </TouchableOpacity>
            {mostrarDropdown && (
              <View style={styles.dropdownMenu}>
                {materias.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.dropdownItem, m === materiaActiva && styles.dropdownItemActive]}
                    onPress={() => { setMateriaActiva(m); setMostrarDropdown(false); }}
                  >
                    <Text style={[styles.dropdownItemText, m === materiaActiva && styles.dropdownItemTextActive]}>
                      {m}
                    </Text>
                    {m === materiaActiva && <MaterialIcons name="check" size={16} color={PRIMARY} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* ── Navegador de Fecha ────────────────── */}
          <View style={styles.dateNavigator}>
            <TouchableOpacity onPress={() => cambiarDia(-1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialIcons name="chevron-left" size={26} color={PRIMARY} />
            </TouchableOpacity>
            <View style={styles.dateCenter}>
              <Text style={styles.dateText}>{fechaLabel}</Text>
              {isToday && <Text style={styles.dateSub}>HOY</Text>}
            </View>
            <TouchableOpacity onPress={() => cambiarDia(1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MaterialIcons name="chevron-right" size={26} color={PRIMARY} />
            </TouchableOpacity>
          </View>

          {/* ── Stats ────────────────────────────── */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#386A20' }]}>{presentes}</Text>
              <Text style={styles.statLabel}>Presentes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#B3261E' }]}>{ausentes}</Text>
              <Text style={styles.statLabel}>Ausentes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#E65100' }]}>{justificados}</Text>
              <Text style={styles.statLabel}>Justif.</Text>
            </View>
          </View>

          {/* ── Lista de Alumnos ──────────────────── */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Lista de Alumnos ({alumnos.length})</Text>
            <MaterialIcons name="sort-by-alpha" size={20} color={PRIMARY} />
          </View>

          <FlatList
            data={alumnos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 16) + 80 }]}
            ListFooterComponent={
              <Text style={styles.footerHint}>Deslice hacia abajo para cargar más alumnos...</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.alumnoRow}>
                <View style={[styles.alumnoAvatar, { backgroundColor: item.avatarColor }]}>
                  <Text style={styles.alumnoAvatarText}>{item.iniciales}</Text>
                </View>
                <View style={styles.alumnoInfo}>
                  <Text style={styles.alumnoNombre}>{item.nombre}</Text>
                  <Text style={styles.alumnoLegajo}>Legajo: {item.legajo}</Text>
                </View>
                <View style={styles.estadoButtons}>
                  {(['P', 'A', 'J'] as EstadoAsistencia[]).map((e) => {
                    const cfg = estadoConfig[e!];
                    const isActive = item.estado === e;
                    return (
                      <TouchableOpacity
                        key={e}
                        style={[
                          styles.estadoBtn,
                          isActive
                            ? { backgroundColor: cfg.bg, borderColor: cfg.bg }
                            : { backgroundColor: Colors.white, borderColor: '#DEDEDE' },
                        ]}
                        onPress={() => setEstado(item.id, e)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.estadoBtnText, { color: isActive ? Colors.white : '#ABABAB' }]}>
                          {cfg.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          />
        </View>

        {/* ── Botón Confirmar fijo ──────────────── */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar} activeOpacity={0.85}>
            <MaterialIcons name="how-to-reg" size={22} color={Colors.white} />
            <Text style={styles.confirmButtonText}>Confirmar Asistencia</Text>
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
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 14,
    zIndex: 10,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral,
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
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
  dropdownItemActive: {
    backgroundColor: PRIMARY + '08',
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  dropdownItemTextActive: {
    color: PRIMARY,
    fontWeight: '700',
  },
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8EEF7',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  dateCenter: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.neutral,
  },
  dateSub: {
    fontSize: 11,
    fontWeight: '700',
    color: PRIMARY,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.secondary,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.neutral,
  },
  listContent: {
    gap: 10,
  },
  alumnoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  alumnoAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alumnoAvatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  alumnoInfo: {
    flex: 1,
  },
  alumnoNombre: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 2,
  },
  alumnoLegajo: {
    fontSize: 12,
    color: Colors.secondary,
  },
  estadoButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  estadoBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  estadoBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  footerHint: {
    textAlign: 'center',
    color: Colors.outline,
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
