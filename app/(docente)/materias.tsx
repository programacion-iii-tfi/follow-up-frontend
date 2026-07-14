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

interface MateriaInfo {
  id: string;
  nombre: string;
  subtitulo: string;
  categoria: string;
  categoriaColor: string;
  categoriaBg: string;
  alumnosCount: number;
  horario: string;
  alumnosAvatars: string[];
}

const materiasData: MateriaInfo[] = [
  {
    id: '1',
    nombre: 'Matemáticas II',
    subtitulo: "4to Año \"B\"",
    categoria: 'Ciencias Exactas',
    categoriaColor: '#21005D',
    categoriaBg: '#E8DDFF',
    alumnosCount: 28,
    horario: 'Lun y Mie 08:00 - 09:30',
    alumnosAvatars: ['A', 'B'],
  },
  {
    id: '2',
    nombre: 'Física I',
    subtitulo: "3er Año \"A\"",
    categoria: 'Ciencias Naturales',
    categoriaColor: '#C62828',
    categoriaBg: '#FCE4EC',
    alumnosCount: 24,
    horario: 'Mar y Jue 10:45 - 12:15',
    alumnosAvatars: ['C'],
  },
  {
    id: '3',
    nombre: 'Geometría Analítica',
    subtitulo: "5to Año \"C\"",
    categoria: 'Ciencias Exactas',
    categoriaColor: '#21005D',
    categoriaBg: '#E8DDFF',
    alumnosCount: 31,
    horario: 'Viernes 07:30 - 10:30',
    alumnosAvatars: ['D'],
  },
  {
    id: '4',
    nombre: 'Taller de Robótica',
    subtitulo: 'Ciclo Superior',
    categoria: 'Tecnología',
    categoriaColor: '#37474F',
    categoriaBg: '#ECEFF1',
    alumnosCount: 15,
    horario: 'Miércoles 14:00 - 16:00',
    alumnosAvatars: ['E'],
  },
];

const categorias = ['Todas', 'Ciencias Exactas', 'Ciencias Naturales', 'Tecnología'];

export default function MateriasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [categoriaFiltrada, setCategoriaFiltrada] = useState('Todas');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const materiasFiltradas = categoriaFiltrada === 'Todas'
    ? materiasData
    : materiasData.filter((m) => m.categoria === categoriaFiltrada);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Materias</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.neutral} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {/* ── Ciclo Lectivo & Descripción ────────── */}
          <Text style={styles.cicloTitle}>Ciclo Lectivo 2024</Text>
          <Text style={styles.cicloSubtitle}>
            Gestiona tus clases y realiza el seguimiento de tus alumnos.
          </Text>

          {/* ── Botón / Barra de Filtro ────────────── */}
          <View style={styles.filtrosRow}>
            <TouchableOpacity
              style={[styles.filtrarButton, mostrarFiltros && styles.filtrarButtonActive]}
              onPress={() => setMostrarFiltros(!mostrarFiltros)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="tune" size={16} color={mostrarFiltros ? PRIMARY : Colors.secondary} />
              <Text style={[styles.filtrarText, mostrarFiltros && styles.filtrarTextActive]}>Filtrar</Text>
            </TouchableOpacity>
          </View>

          {mostrarFiltros && (
            <View style={styles.filtrosContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtrosScroll}>
                {categorias.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.filtroChip, categoriaFiltrada === cat && styles.filtroChipActive]}
                    onPress={() => setCategoriaFiltrada(cat)}
                  >
                    <Text style={[styles.filtroChipText, categoriaFiltrada === cat && styles.filtroChipTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* ── Lista de Materias ──────────────────── */}
          <FlatList
            data={materiasFiltradas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 16) + 88 }]}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.materiaCard}
                activeOpacity={0.8}
                onPress={() => router.push({
                  pathname: '/(docente)/materia/[id]' as any,
                  params: { id: item.id, nombre: item.nombre, curso: item.subtitulo }
                })}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.categoriaChip, { backgroundColor: item.categoriaBg }]}>
                    <Text style={[styles.categoriaChipText, { color: item.categoriaColor }]}>
                      {item.categoria}
                    </Text>
                  </View>
                  <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <MaterialIcons name="more-vert" size={20} color={Colors.outline} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.materiaNombre}>{item.nombre}</Text>
                <Text style={styles.materiaCurso}>{item.subtitulo}</Text>

                <View style={styles.materiaDetails}>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="group" size={16} color={Colors.outline} />
                    <Text style={styles.detailText}>{item.alumnosCount} alumnos inscriptos</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="access-time" size={16} color={Colors.outline} />
                    <Text style={styles.detailText}>{item.horario}</Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.cardFooter}>
                  <View style={styles.avatarsRow}>
                    {item.alumnosAvatars.map((av, index) => (
                      <View
                        key={index}
                        style={[
                          styles.avatarItem,
                          {
                            backgroundColor: index === 0 ? '#6750A4' : '#E65100',
                            zIndex: 10 - index,
                          },
                        ]}
                      >
                        <Text style={styles.avatarText}>{av}</Text>
                      </View>
                    ))}
                    <View style={[styles.avatarMore, { zIndex: 0 }]}>
                      <Text style={styles.avatarMoreText}>+{item.alumnosCount - item.alumnosAvatars.length}</Text>
                    </View>
                  </View>
                  <View style={styles.actionArrow}>
                    <MaterialIcons name="arrow-forward" size={18} color={PRIMARY} />
                  </View>
                </View>
              </TouchableOpacity>
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
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(docente)')} activeOpacity={0.7}>
            <MaterialIcons name="space-dashboard" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="class" size={24} color={PRIMARY} />
            <Text style={[styles.bottomBarText, { color: PRIMARY }]}>Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(docente)/perfil')} activeOpacity={0.7}>
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cicloTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.neutral,
    marginBottom: 6,
  },
  cicloSubtitle: {
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  filtrosRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filtrarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F1F6',
    borderWidth: 1,
    borderColor: '#E0E0E6',
  },
  filtrarButtonActive: {
    backgroundColor: '#E8EEF7',
    borderColor: PRIMARY,
  },
  filtrarText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
  },
  filtrarTextActive: {
    color: PRIMARY,
  },
  filtrosContainer: {
    marginBottom: 14,
  },
  filtrosScroll: {
    gap: 8,
  },
  filtroChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filtroChipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  filtroChipText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '500',
  },
  filtroChipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  listContent: {
    gap: 14,
  },
  materiaCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoriaChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoriaChipText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  materiaNombre: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.neutral,
    marginBottom: 2,
  },
  materiaCurso: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 14,
  },
  materiaDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarItem: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    marginRight: -8,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 10,
  },
  avatarMore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  avatarMoreText: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 10,
  },
  actionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F1F6',
    alignItems: 'center',
    justifyContent: 'center',
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
