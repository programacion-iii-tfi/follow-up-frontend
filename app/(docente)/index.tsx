import DrawerMenu, { DrawerMenuItem } from '@/components/organisms/DrawerMenu';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Theme colors for Docente ───────────────────────────────────────────────
const PRIMARY = '#4A6FA5';

// ─── Mock data ───────────────────────────────────────────────────────────────
const resumenHoy = [
  { id: '1', label: 'clases hoy', valor: '4', icono: 'access-time' as const, color: '#E65100' },
  { id: '2', label: 'Asistencia', valor: '94%', icono: 'fact-check' as const, color: '#6750A4' },
  { id: '3', label: 'Ver Notas', valor: '', icono: 'grade' as const, color: '#386A20' },
];

const acciones = [
  { id: '1', label: 'tomar asistencia', icono: 'group' as const, bg: '#EDE7F6', iconColor: '#6750A4', route: '/(docente)/asistencia' },
  { id: '2', label: 'cargar notas', icono: 'assignment' as const, bg: '#D1C4E9', iconColor: '#4527A0', route: '/(docente)/notas' },
  { id: '3', label: 'crear aviso', icono: 'campaign' as const, bg: '#FCE4EC', iconColor: '#C62828', route: '/(docente)/crear-aviso' },
  { id: '4', label: 'ver agenda', icono: 'calendar-month' as const, bg: '#ECEFF1', iconColor: '#546E7A', route: '/(docente)/agenda' },
];

const proximasActividades = [
  { id: '1', titulo: 'Reunión de Departamento', subtitulo: 'Hoy • 15:30 • Sala 4', icono: 'groups' as const, iconColor: '#6750A4' },
  { id: '2', titulo: 'Entrega de Calificaciones', subtitulo: 'Mañana • Todo el día', icono: 'assignment-turned-in' as const, iconColor: '#E65100' },
  { id: '3', titulo: 'Examen de Matemáticas II', subtitulo: 'Viernes • 08:00 • Aula Magna', icono: 'school' as const, iconColor: '#6750A4' },
];

export default function DocenteDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const drawerItems: DrawerMenuItem[] = [
    { icon: 'dashboard', label: 'Panel Principal', onPress: () => {} },
    { icon: 'class', label: 'Mis Materias', onPress: () => router.push('/(docente)/materias') },
    { icon: 'fact-check', label: 'Tomar Asistencia', onPress: () => router.push('/(docente)/asistencia') },
    { icon: 'assignment', label: 'Cargar Notas', onPress: () => router.push('/(docente)/notas') },
    { icon: 'campaign', label: 'Crear Aviso', onPress: () => router.push('/(docente)/crear-aviso') },
    { icon: 'notifications', label: 'Notificaciones', onPress: () => router.push('/(docente)/notificaciones') },
  ];

  const handleLogout = () => {
    router.dismissAll();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ────────────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="menu" size={26} color={Colors.neutral} />
          </TouchableOpacity>
          <View style={styles.headerGreeting}>
            <Text style={styles.greetingMain}>Hola,</Text>
            <Text style={styles.greetingRole}>Docente</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.push('/(docente)/notificaciones')}
            >
              <MaterialIcons name="notifications-none" size={26} color={Colors.neutral} />
            </TouchableOpacity>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>D</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 16) + 68 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Resumen de Hoy ────────────────────────── */}
          <Text style={styles.sectionLabel}>RESUMEN DE HOY</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resumenScroll}
          >
            {resumenHoy.map((item) => (
              <View key={item.id} style={styles.resumenCard}>
                <MaterialIcons name={item.icono} size={28} color={item.color} />
                <Text style={[styles.resumenLabel, { color: item.color }]}>{item.label}</Text>
                {item.valor ? <Text style={styles.resumenValor}>{item.valor}</Text> : null}
              </View>
            ))}
          </ScrollView>

          {/* ── Acciones ─────────────────────────────── */}
          <Text style={styles.sectionLabel}>ACCIONES</Text>
          <View style={styles.accionesGrid}>
            {acciones.map((accion) => (
              <TouchableOpacity
                key={accion.id}
                style={[styles.accionCard, { backgroundColor: accion.bg }]}
                onPress={() => router.push(accion.route as any)}
                activeOpacity={0.8}
              >
                <MaterialIcons name={accion.icono} size={30} color={accion.iconColor} />
                <Text style={[styles.accionLabel, { color: accion.iconColor }]}>{accion.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Próximas Actividades ──────────────────── */}
          <View style={styles.actividadesHeader}>
            <Text style={styles.sectionLabel}>PRÓXIMAS ACTIVIDADES</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.verTodo}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actividadesList}>
            {proximasActividades.map((act) => (
              <TouchableOpacity key={act.id} style={styles.actividadRow} activeOpacity={0.7}>
                <View style={[styles.actividadIcon, { backgroundColor: act.iconColor + '15' }]}>
                  <MaterialIcons name={act.icono} size={20} color={act.iconColor} />
                </View>
                <View style={styles.actividadInfo}>
                  <Text style={styles.actividadTitulo}>{act.titulo}</Text>
                  <Text style={styles.actividadSub}>{act.subtitulo}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color={Colors.outline} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* ── FAB ──────────────────────────────────────── */}
        <TouchableOpacity
          style={[styles.fab, { bottom: Math.max(insets.bottom, 4) + 68 }]}
          activeOpacity={0.85}
          onPress={() => router.push('/(docente)/observacion')}
        >
          <MaterialIcons name="edit-note" size={28} color={Colors.white} />
        </TouchableOpacity>

        {/* ── Bottom Bar ───────────────────────────────── */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 4) }]}>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="space-dashboard" size={24} color={PRIMARY} />
            <Text style={[styles.bottomBarText, { color: PRIMARY }]}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(docente)/materias')} activeOpacity={0.7}>
            <MaterialIcons name="class" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="person-outline" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Perfil</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      {/* ── Drawer ────────────────────────────────────── */}
      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        nombre="Docente Usuario"
        rol="Docente"
        rolColor={PRIMARY}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  headerGreeting: {
    flex: 1,
  },
  greetingMain: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.neutral,
    lineHeight: 26,
  },
  greetingRole: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A6FA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 0.8,
    marginTop: 16,
    marginBottom: 10,
  },
  resumenScroll: {
    gap: 12,
  },
  resumenCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    gap: 6,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  resumenLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  resumenValor: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.neutral,
  },
  accionesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accionCard: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    minHeight: 100,
    gap: 10,
  },
  accionLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  actividadesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  verTodo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A6FA5',
  },
  actividadesList: {
    gap: 10,
  },
  actividadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  actividadIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actividadInfo: {
    flex: 1,
  },
  actividadTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A6FA5',
    marginBottom: 2,
  },
  actividadSub: {
    fontSize: 12,
    color: Colors.secondary,
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
