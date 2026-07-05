import { ActividadesList } from '@/components/organisms/ActividadesList';
import { AlumnosSelector } from '@/components/organisms/AlumnosSelector';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import DrawerMenu, { DrawerMenuItem } from '@/components/organisms/DrawerMenu';
import { InfoGrid } from '@/components/organisms/InfoGrid';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const alumnos = [
  { id: '1', nombre: 'Alegre Fabricio' },
  { id: '2', nombre: 'Ramirez Damian' },
  { id: '3', nombre: 'Ramirez Pablo' },
  { id: '4', nombre: 'Lautaro Hofer' },
  { id: '5', nombre: 'Vicentin Erick' },
];

const infoCards = [
  { id: '1', titulo: 'inasistencia', valor: '', subtitulo: '3 días', icono: 'person-off' as const, color: '#B3261E' },
  { id: '2', titulo: 'Boletín', valor: '', subtitulo: 'Ciclo 1', icono: 'menu-book' as const, color: '#6750A4' },
  { id: '3', titulo: 'Comunicados', valor: '', subtitulo: '2 nuevos', icono: 'mark-email-unread' as const, color: '#E65100' },
  { id: '4', titulo: 'Horarios', valor: '', subtitulo: 'Ver grilla', icono: 'schedule' as const, color: '#6750A4' },
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
  const insets = useSafeAreaInsets();

  const drawerItems: DrawerMenuItem[] = [
    { icon: 'dashboard', label: 'Panel Principal', onPress: () => router.replace('/(tutor)') },
    { icon: 'people', label: 'Mis Alumnos' },
    { icon: 'event', label: 'Próximas Actividades', onPress: () => router.push('/(tutor)/agenda') },
    { icon: 'trending-up', label: 'Resumen de Notas', onPress: () => router.push('/(tutor)/notas') },
    { icon: 'notifications', label: 'Notificaciones', onPress: () => router.push('/(tutor)/notificaciones') },
    { icon: 'chat', label: 'Contactar Docente' },
  ];

  const handleLogout = () => {
    if (router.dismissAll) { router.dismissAll(); } router.replace({ pathname: '/' });
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <DashboardHeader
            nombreTutor="Tutor"
            onMenuPress={() => setDrawerVisible(true)}
            onNotificationsPress={() => router.push('/(tutor)/notificaciones')}
            onAvatarPress={() => router.push('/(tutor)/perfil')}
          />
          <AlumnosSelector
            alumnos={alumnos}
            selectedId={alumnoSeleccionado}
            onSelect={setAlumnoSeleccionado}
          />
          <InfoGrid cards={infoCards} />
          <ActividadesList actividades={actividades} />
        </ScrollView>
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 4) }]}>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="home" size={24} color={Colors.primary} />
            <Text style={[styles.bottomBarText, { color: Colors.primary }]}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(tutor)/contacto')} activeOpacity={0.7}>
            <MaterialIcons name="chat-bubble-outline" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(tutor)/agenda')} activeOpacity={0.7}>
            <MaterialIcons name="calendar-today" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(tutor)/notas')} activeOpacity={0.7}>
            <MaterialIcons name="grade" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Notas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
