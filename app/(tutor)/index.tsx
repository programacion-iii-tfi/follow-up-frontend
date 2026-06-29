import { Colors } from '@/constants/Colors';
import { ActividadesList } from '@/components/organisms/ActividadesList';
import { AlumnosSelector } from '@/components/organisms/AlumnosSelector';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import DrawerMenu, { DrawerMenuItem } from '@/components/organisms/DrawerMenu';
import { InfoGrid } from '@/components/organisms/InfoGrid';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const alumnos = [
  { id: '1', nombre: 'Alegre Fabricio' },
  { id: '2', nombre: 'Ramirez Damian' },
  { id: '3', nombre: 'Ramirez Pablo' },
  { id: '4', nombre: 'Lautaro Hofer' },
  { id: '5', nombre: 'Vicentin Erick' },
];

const infoCards = [
  { id: '1', titulo: 'Inasistencias', valor: '3', subtitulo: 'este mes', icono: 'event-busy' as const, color: '#B3261E' },
  { id: '2', titulo: 'Boletín', valor: '7.8', subtitulo: 'promedio general', icono: 'menu-book' as const, color: '#6750A4' },
  { id: '3', titulo: 'Actividades', valor: '5', subtitulo: 'pendientes', icono: 'assignment' as const, color: '#625B71' },
  { id: '4', titulo: 'Asistencia', valor: '87%', subtitulo: 'del ciclo lectivo', icono: 'check-circle-outline' as const, color: '#386A20' },
];

const actividades = [
  { id: '1', materia: 'Matemática', tipo: 'Examen', fecha: 'Lun 23 Jun', icono: 'school' as const, color: '#B3261E' },
  { id: '2', materia: 'Lengua', tipo: 'Entrega de trabajo', fecha: 'Mié 25 Jun', icono: 'assignment' as const, color: '#6750A4' },
  { id: '3', materia: 'Historia', tipo: 'Exposición oral', fecha: 'Vie 27 Jun', icono: 'record-voice-over' as const, color: '#625B71' },
  { id: '4', materia: 'Física', tipo: 'Laboratorio', fecha: 'Lun 30 Jun', icono: 'science' as const, color: '#386A20' },
];

export default function TutorDashboard() {
  const router = useRouter();
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('1');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const drawerItems: DrawerMenuItem[] = [
    { icon: 'dashboard', label: 'Panel Principal' },
    { icon: 'people', label: 'Mis Alumnos' },
    { icon: 'event', label: 'Próximas Actividades' },
    { icon: 'trending-up', label: 'Resumen de Notas' },
    { icon: 'notifications', label: 'Notificaciones' },
    { icon: 'chat', label: 'Contactar Docente' },
  ];

  const handleLogout = () => {
    router.dismissAll();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <DashboardHeader
            nombreTutor="Tutor"
            onMenuPress={() => setDrawerVisible(true)}
          />
          <AlumnosSelector
            alumnos={alumnos}
            selectedId={alumnoSeleccionado}
            onSelect={setAlumnoSeleccionado}
          />
          <InfoGrid cards={infoCards} />
          <ActividadesList actividades={actividades} />
        </ScrollView>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="home" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="people-outline" size={24} color={Colors.outline} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="calendar-today" size={24} color={Colors.outline} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="person-outline" size={24} color={Colors.outline} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <MaterialIcons name="add" size={28} color={Colors.onPrimary} />
      </TouchableOpacity>
      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        nombre="Tutor Usuario"
        rol="Tutor"
        rolColor="#386A20"
        items={drawerItems}
        activeLabel="Panel Principal"
        onLogout={handleLogout}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 4,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
});
