import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#6750A4';

export const mockAvisos = [
  {
    id: '1',
    titulo: 'Circular Fin de Mes',
    remitente: 'Dirección Académica',
    fecha: 'Hoy, 09:30 AM',
    urgente: true,
    cuerpo: 'Estimados alumnos y familias:\n\nNos dirigimos a ustedes para informarles que el próximo viernes 30 de noviembre se llevará a cabo el acto de cierre del mes. Por este motivo, las actividades extracurriculares de la tarde quedarán suspendidas.\n\nAsimismo, les recordamos que ya se encuentran disponibles las calificaciones parciales del trimestre en la sección "Notas" de esta misma aplicación.\n\nCualquier consulta, por favor dirigirse al departamento de alumnos.\n\nSaludos cordiales,\nLa Dirección.',
  },
  {
    id: '2',
    titulo: 'Convocatoria Feria de Ciencias',
    remitente: 'Depto. de Ciencias',
    fecha: 'Ayer, 14:15 PM',
    urgente: false,
    cuerpo: 'Se invita a todos los alumnos a participar en la Feria de Ciencias Anual que se realizará la segunda semana de noviembre.\n\nLos equipos interesados deberán inscribir sus proyectos antes del viernes en la preceptoría. Habrá premios para los proyectos más innovadores en robótica y sustentabilidad.\n\n¡Esperamos contar con su participación!',
  },
  {
    id: '3',
    titulo: 'Cambio de Aula - Biología',
    remitente: 'Preceptoría',
    fecha: 'Lunes, 08:00 AM',
    urgente: false,
    cuerpo: 'Informamos a todos los alumnos de 4to Año B que las clases de Biología Celular de esta semana se dictarán excepcionalmente en el Laboratorio 2, ya que el aula habitual se encuentra en tareas de mantenimiento.\n\nPor favor dirigirse directamente al laboratorio en el horario de clase correspondiente.',
  }
];

export default function AvisoDetalleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Buscar el aviso por ID o mostrar el primero por defecto
  const aviso = mockAvisos.find(a => a.id === id) || mockAvisos[0];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* ── Top App Bar ───────────────────────────────── */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Comunicado</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/(alumno)/perfil')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>LE</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Cabecera del Aviso */}
            <View style={styles.cardHeader}>
              <View style={styles.senderInfo}>
                <View style={styles.senderAvatar}>
                  <MaterialIcons name="business" size={20} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.senderName}>{aviso.remitente}</Text>
                  <Text style={styles.senderDate}>{aviso.fecha}</Text>
                </View>
              </View>
              {aviso.urgente && (
                <View style={styles.badgeUrgent}>
                  <Text style={styles.badgeText}>Importante</Text>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            {/* Contenido del Aviso */}
            <Text style={styles.title}>{aviso.titulo}</Text>
            <Text style={styles.bodyText}>{aviso.cuerpo}</Text>

            {/* Acciones */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => router.back()}>
                <Text style={styles.primaryButtonText}>Marcar como leído</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  safeArea: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: PRIMARY,
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8DDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: PRIMARY,
    fontWeight: '700',
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  senderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 2,
  },
  senderDate: {
    fontSize: 12,
    color: Colors.secondary,
  },
  badgeUrgent: {
    backgroundColor: '#FCE8E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#B3261E',
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.neutral,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 15,
    color: Colors.neutral,
    lineHeight: 24,
  },
  actionRow: {
    marginTop: 24,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});
