import AlertListItem from '@/components/molecules/AlertListItem';
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
import { SafeAreaView } from 'react-native-safe-area-context';

type Severity = 'ALTA' | 'MEDIA' | 'BAJA';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const CURSOS_FILTRO = ['Todos los cursos', '1° A', '1° B', '2° A', '3° A', '4° A'];
const TIPOS = ['Académico', 'Disciplinario', 'Asistencia', 'Todos'];

const alertasData: { id: string; nombre: string; descripcion: string; severity: Severity }[] = [
  { id: '1', nombre: 'Matías Arancibia', descripcion: 'Inasistencia reiterada (3 días)', severity: 'ALTA' },
  { id: '2', nombre: 'Sofía Valenzuela', descripcion: 'Bajo rendimiento en Matemática', severity: 'MEDIA' },
  { id: '3', nombre: 'Lucas Morales', descripcion: 'Atraso en entrada principal', severity: 'BAJA' },
];

export default function ReportesScreen() {
  const router = useRouter();
  const [mes, setMes] = useState('Marzo 2024');
  const [curso, setCurso] = useState('Todos los cursos');
  const [tipo, setTipo] = useState('Académico');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.neutral} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reportes</Text>
        <View style={styles.avatarSmall}>
          <MaterialIcons name="person" size={18} color={Colors.onPrimary} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filtersRow}>
          <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
            <Text style={styles.filterChipText}>{mes}</Text>
            <MaterialIcons name="expand-more" size={16} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
            <Text style={styles.filterChipText}>{curso}</Text>
            <MaterialIcons name="filter-list" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.filterChip, styles.tipoChip]} activeOpacity={0.7}>
          <Text style={styles.filterChipText}>Tipo: {tipo}</Text>
          <MaterialIcons name="close" size={14} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.statCard}>
          <View style={styles.statCardTop}>
            <View style={[styles.statIcon, { backgroundColor: `${Colors.primary}15` }]}>
              <MaterialIcons name="event-available" size={22} color={Colors.primary} />
            </View>
            <View style={[styles.trendBadge, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.trendText, { color: '#2E7D32' }]}>+2.4% vs mes anterior</Text>
            </View>
          </View>
          <Text style={styles.statLabel}>ASISTENCIA TOTAL</Text>
          <Text style={styles.statValue}>94.2%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '94.2%' }]} />
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statCardTop}>
            <View style={[styles.statIcon, { backgroundColor: `${Colors.error}15` }]}>
              <MaterialIcons name="person-off" size={22} color={Colors.error} />
            </View>
            <View style={[styles.trendBadge, { backgroundColor: `${Colors.error}15` }]}>
              <Text style={[styles.trendText, { color: Colors.error }]}>Ojo este mes</Text>
            </View>
          </View>
          <Text style={styles.statLabel}>INASISTENCIAS</Text>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statSubtitle}>Promedio de 4.2 por día lectivo.</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statCardTop}>
            <View style={[styles.statIcon, { backgroundColor: `${Colors.primary}15` }]}>
              <MaterialIcons name="notifications-active" size={22} color={Colors.primary} />
            </View>
            <View style={[styles.trendBadge, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[styles.trendText, { color: '#2E7D32' }]}>Actualizado hoy</Text>
            </View>
          </View>
          <Text style={styles.statLabel}>ALERTAS GENERADAS</Text>
          <Text style={styles.statValue}>15</Text>
          <View style={styles.alertChipRow}>
            <View style={styles.alertChip}>
              <View style={styles.alertDot} />
              <Text style={styles.alertChipText}>+12</Text>
            </View>
          </View>
        </View>

        <View style={styles.alertsSection}>
          <View style={styles.alertsSectionHeader}>
            <Text style={styles.alertsSectionTitle}>Alertas Recientes</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.verTodas}>Ver todas ›</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alertsList}>
            {alertasData.map((alerta, index) => (
              <View key={alerta.id}>
                <AlertListItem
                  nombre={alerta.nombre}
                  descripcion={alerta.descripcion}
                  severity={alerta.severity}
                />
                {index < alertasData.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.exportButton} activeOpacity={0.8}>
          <MaterialIcons name="download" size={20} color={Colors.primary} />
          <Text style={styles.exportButtonText}>Exportar Reporte</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
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
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  tipoChip: {
    marginBottom: 20,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: Colors.neutral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.neutral,
    lineHeight: 40,
    marginBottom: 10,
  },
  statSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  alertChipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  alertChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${Colors.error}15`,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  alertChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.error,
  },
  alertsSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: Colors.neutral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  alertsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral,
  },
  verTodas: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  alertsList: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceVariant,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  exportButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
});
