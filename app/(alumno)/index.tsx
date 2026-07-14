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
import { mockAvisos } from './aviso';

const PRIMARY = '#6750A4';

export default function AlumnoDashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const drawerItems: DrawerMenuItem[] = [
    { icon: 'dashboard', label: 'Mi Portal', onPress: () => {} },
    { icon: 'class', label: 'Boletín de Notas', onPress: () => router.push('/(alumno)/notas') },
    { icon: 'calendar-today', label: 'Horarios', onPress: () => router.push('/(alumno)/horarios') },
    { icon: 'fact-check', label: 'Asistencia', onPress: () => router.push('/(alumno)/asistencia') },
    { icon: 'edit-note', label: 'Observaciones', onPress: () => router.push('/(alumno)/observaciones') },
    { icon: 'person', label: 'Mi Perfil', onPress: () => router.push('/(alumno)/perfil') },
  ];

  const handleLogout = () => {
    router.replace('/login');
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
            <Text style={styles.greetingMain}>Hola, Lucas Estrada</Text>
            <Text style={styles.greetingRole}>Alumno - 4to Año B</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => router.push('/(alumno)/notificaciones')}
            >
              <MaterialIcons name="notifications-none" size={26} color={Colors.neutral} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/(alumno)/perfil')}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>LE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Paginador / Carrusel Indicator ────────────── */}
        <View style={styles.carouselIndicator}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 16) + 68 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Ahora / Próxima Clase ────────────────────── */}
          <Text style={styles.sectionLabel}>AHORA/ PROXIMA CLASE</Text>
          <TouchableOpacity
            style={styles.proximaClaseCard}
            onPress={() => router.push('/(alumno)/horarios')}
            activeOpacity={0.8}
          >
            <View style={styles.clockIconContainer}>
              <MaterialIcons name="access-alarm" size={24} color={PRIMARY} />
            </View>
            <View style={styles.claseInfo}>
              <Text style={styles.claseMateria}>Matemáticas Avanzadas</Text>
              <Text style={styles.claseHorario}>Comienza en 30 min</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={Colors.outline} />
          </TouchableOpacity>

          {/* ── Por Entregar / Pendiente ─────────────────── */}
          <Text style={styles.sectionLabel}>POR ENTREGAR/ PENDIENTE</Text>
          <View style={styles.pendientesRow}>
            <TouchableOpacity style={styles.pendienteCard} activeOpacity={0.8}>
              <View style={styles.pendienteIconBg}>
                <MaterialIcons name="assignment-turned-in" size={28} color={PRIMARY} />
              </View>
              <Text style={styles.pendienteLabel}>Tareas Pendientes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pendienteCard} activeOpacity={0.8}>
              <View style={styles.pendienteIconBg}>
                <MaterialIcons name="event-note" size={28} color={PRIMARY} />
              </View>
              <Text style={styles.pendienteLabel}>Exámenes Próximos</Text>
            </TouchableOpacity>
          </View>

          {/* ── Mi Espacio ──────────────────────────────── */}
          <Text style={styles.sectionLabel}>MI ESPACIO</Text>
          <View style={styles.espacioGrid}>
            <TouchableOpacity
              style={styles.espacioBtn}
              onPress={() => router.push('/(alumno)/notas')}
              activeOpacity={0.75}
            >
              <MaterialIcons name="menu-book" size={20} color={PRIMARY} />
              <Text style={styles.espacioBtnText}>Boletín</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.espacioBtn}
              onPress={() => router.push('/(alumno)/horarios')}
              activeOpacity={0.75}
            >
              <MaterialIcons name="calendar-today" size={20} color={PRIMARY} />
              <Text style={styles.espacioBtnText}>Horarios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.espacioBtn}
              onPress={() => router.push('/(alumno)/asistencia')}
              activeOpacity={0.75}
            >
              <MaterialIcons name="fact-check" size={20} color={PRIMARY} />
              <Text style={styles.espacioBtnText}>Asistencia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.espacioBtn}
              onPress={() => router.push('/(alumno)/observaciones')}
              activeOpacity={0.75}
            >
              <MaterialIcons name="edit-note" size={20} color={PRIMARY} />
              <Text style={styles.espacioBtnText}>Observaciones</Text>
            </TouchableOpacity>
          </View>

          {/* ── Aviso ───────────────────────────────────── */}
          <Text style={styles.sectionLabel}>AVISOS RECIENTES</Text>
          {mockAvisos.slice(0, 2).map((aviso) => (
            <TouchableOpacity 
              key={aviso.id}
              style={[styles.avisoCard, { marginBottom: 12 }]} 
              onPress={() => router.push({ pathname: '/(alumno)/aviso', params: { id: aviso.id } })} 
              activeOpacity={0.8}
            >
              <View style={styles.avisoTextCol}>
                <Text style={styles.avisoTitle} numberOfLines={1}>{aviso.titulo}</Text>
                <Text style={styles.avisoSubtitle}>{aviso.remitente}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={PRIMARY} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Bottom Bar ───────────────────────────────── */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 4) }]}>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="space-dashboard" size={24} color={PRIMARY} />
            <Text style={[styles.bottomBarText, { color: PRIMARY }]}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(alumno)/horarios')} activeOpacity={0.7}>
            <MaterialIcons name="calendar-today" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Horarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.push('/(alumno)/notas')} activeOpacity={0.7}>
            <MaterialIcons name="grade" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Notas</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>

      {/* ── Drawer lateral ────────────────────────────── */}
      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        nombre="Lucas Estrada"
        rol="Alumno"
        rolColor={PRIMARY}
        items={drawerItems}
        activeLabel="Mi Portal"
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
    paddingBottom: 10,
    gap: 12,
  },
  headerGreeting: {
    flex: 1,
  },
  greetingMain: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.neutral,
    lineHeight: 22,
  },
  greetingRole: {
    fontSize: 12,
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
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  carouselIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neutral,
  },
  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1CBD7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 6,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.secondary,
    letterSpacing: 0.6,
    marginTop: 16,
    marginBottom: 8,
  },
  proximaClaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FC',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  clockIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E8DDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claseInfo: {
    flex: 1,
  },
  claseMateria: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 2,
  },
  claseHorario: {
    fontSize: 12,
    color: Colors.secondary,
  },
  pendientesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pendienteCard: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  pendienteIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendienteLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.neutral,
    textAlign: 'center',
  },
  espacioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  espacioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#F1F1F6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  espacioBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.neutral,
  },
  avisoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  avisoTextCol: {
    gap: 2,
  },
  avisoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.neutral,
  },
  avisoSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
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
