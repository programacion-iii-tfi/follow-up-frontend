import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#4A6FA5';

interface DiaSemana {
  nombre: string;
  numero: number;
  id: string;
}

interface ActividadAgenda {
  id: string;
  horaInicio: string;
  horaFin: string;
  titulo: string;
  contexto: string;
  tipo: 'Clase' | 'Examen' | 'Reunión';
  colorBorde: string;
  participantes?: string[];
}

const diasSemana: DiaSemana[] = [
  { nombre: 'Lun', numero: 14, id: '14' },
  { nombre: 'Mar', numero: 15, id: '15' },
  { nombre: 'Mié', numero: 16, id: '16' },
  { nombre: 'Jue', numero: 17, id: '17' },
  { nombre: 'Vie', numero: 18, id: '18' },
  { nombre: 'Sáb', numero: 19, id: '19' },
];

const actividadesData: Record<string, ActividadAgenda[]> = {
  '15': [
    {
      id: '1',
      horaInicio: '08:00',
      horaFin: '09:30',
      titulo: 'Clase de Matemáticas II',
      contexto: "4to Año \"B\" - Aula 102",
      tipo: 'Clase',
      colorBorde: '#386A20',
    },
    {
      id: '2',
      horaInicio: '10:00',
      horaFin: '11:30',
      titulo: 'Parcial de Geometría',
      contexto: "5to Año \"A\" - Salón de Actos",
      tipo: 'Examen',
      colorBorde: '#B3261E',
    },
    {
      id: '3',
      horaInicio: '12:00',
      horaFin: '13:00',
      titulo: 'Reunión de Departamento',
      contexto: 'Sala de Profesores',
      tipo: 'Reunión',
      colorBorde: '#6750A4',
      participantes: ['P', 'L'],
    },
    {
      id: '4',
      horaInicio: '14:00',
      horaFin: '15:30',
      titulo: 'Clase de Física I',
      contexto: "3er Año \"C\" - Laboratorio",
      tipo: 'Clase',
      colorBorde: '#386A20',
    },
  ],
  '14': [
    {
      id: '5',
      horaInicio: '08:30',
      horaFin: '10:00',
      titulo: 'Clase de Álgebra',
      contexto: "4to Año \"A\" - Aula 101",
      tipo: 'Clase',
      colorBorde: '#386A20',
    },
  ],
};

const filtroTipos = [
  { id: 'Todas', label: 'Todas', icono: null },
  { id: 'Clases', label: 'Clases', icono: 'class' as const },
  { id: 'Exámenes', label: 'Exámenes', icono: 'assignment' as const },
  { id: 'Reuniones', label: 'Reuniones', icono: 'groups' as const },
];

export default function AgendaDocenteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [diaActivo, setDiaActivo] = useState('15');
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const actividadesDelDia = actividadesData[diaActivo] || [];
  const actividadesFiltradas = filtroActivo === 'Todas'
    ? actividadesDelDia
    : actividadesDelDia.filter((a) => {
        if (filtroActivo === 'Clases') return a.tipo === 'Clase';
        if (filtroActivo === 'Exámenes') return a.tipo === 'Examen';
        if (filtroActivo === 'Reuniones') return a.tipo === 'Reunión';
        return true;
      });

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Agenda</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.neutral} />
          </TouchableOpacity>
        </View>

        {/* ── Calendar Strip ─────────────────────── */}
        <View style={styles.calendarStripContainer}>
          <View style={styles.calendarStrip}>
            {diasSemana.map((dia) => {
              const isActive = dia.id === diaActivo;
              return (
                <TouchableOpacity
                  key={dia.id}
                  style={[styles.diaBtn, isActive && styles.diaBtnActive]}
                  onPress={() => setDiaActivo(dia.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.diaNombre, isActive && styles.diaNombreActive]}>{dia.nombre}</Text>
                  <Text style={[styles.diaNumero, isActive && styles.diaNumeroActive]}>{dia.numero}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.mesLabel}>Octubre 2024</Text>
        </View>

        {/* ── Filtros ────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtrosRow}
          style={styles.filtrosScroll}
        >
          {filtroTipos.map((filtro) => {
            const isActive = filtro.id === filtroActivo;
            return (
              <TouchableOpacity
                key={filtro.id}
                style={[styles.filtroChip, isActive && styles.filtroChipActive]}
                onPress={() => setFiltroActivo(filtro.id)}
                activeOpacity={0.7}
              >
                {filtro.icono && (
                  <MaterialIcons
                    name={filtro.icono}
                    size={16}
                    color={isActive ? Colors.white : Colors.outline}
                  />
                )}
                <Text style={[styles.filtroChipText, isActive && styles.filtroChipTextActive]}>
                  {filtro.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Timeline de Actividades ────────────── */}
        <View style={styles.timelineContainer}>
          <FlatList
            data={actividadesFiltradas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 16) + 88 }]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialIcons name="event-busy" size={48} color={Colors.outline} />
                <Text style={styles.emptyText}>No hay actividades programadas</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.timelineRow}>
                <View style={styles.timeCol}>
                  <Text style={styles.timeText}>{item.horaInicio}</Text>
                  <Text style={styles.timeSubText}>{item.horaFin}</Text>
                </View>
                <View style={[styles.card, { borderLeftColor: item.colorBorde }]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                    {item.tipo === 'Examen' && (
                      <View style={styles.examenBadge}>
                        <Text style={styles.examenBadgeText}>EXAMEN</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardSub}>{item.contexto}</Text>

                  {item.participantes && (
                    <View style={styles.participantesRow}>
                      {item.participantes.map((part, index) => (
                        <View
                          key={index}
                          style={[
                            styles.participantAvatar,
                            {
                              backgroundColor: index === 0 ? '#49454F' : '#625B71',
                              zIndex: 10 - index,
                            },
                          ]}
                        >
                          <Text style={styles.participantText}>{part}</Text>
                        </View>
                      ))}
                      <View style={[styles.participantMore, { zIndex: 0 }]}>
                        <Text style={styles.participantMoreText}>+3</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        </View>

        {/* ── FAB ──────────────────────────────────────── */}
        <TouchableOpacity
          style={[styles.fab, { bottom: Math.max(insets.bottom, 4) + 68 }]}
          activeOpacity={0.85}
          onPress={() => router.push('/(docente)/crear-aviso')}
        >
          <MaterialIcons name="add" size={28} color={Colors.white} />
        </TouchableOpacity>

        {/* ── Bottom Bar ───────────────────────────────── */}
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
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.neutral,
  },
  calendarStripContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  diaBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    paddingVertical: 10,
    borderRadius: 22,
  },
  diaBtnActive: {
    backgroundColor: PRIMARY,
    elevation: 3,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  diaNombre: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  diaNombreActive: {
    color: Colors.white,
  },
  diaNumero: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
  },
  diaNumeroActive: {
    color: Colors.white,
  },
  mesLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: PRIMARY,
  },
  filtrosScroll: {
    flexGrow: 0,
    height: 36,
    marginBottom: 16,
  },
  filtrosRow: {
    gap: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filtroChip: {
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
  filtroChipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  filtroChipText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  filtroChipTextActive: {
    color: Colors.white,
  },
  timelineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    gap: 14,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 16,
  },
  timeCol: {
    width: 48,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
  },
  timeSubText: {
    fontSize: 12,
    color: Colors.outline,
    marginTop: 2,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderLeftWidth: 4,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
    flex: 1,
  },
  examenBadge: {
    backgroundColor: '#B3261E',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  examenBadgeText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardSub: {
    fontSize: 12,
    color: Colors.secondary,
  },
  participantesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  participantAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
    marginRight: -6,
  },
  participantText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 8,
  },
  participantMore: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6750A4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  participantMoreText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.outline,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6750A4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#6750A4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  bottomBarText: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.outline,
  },
});
