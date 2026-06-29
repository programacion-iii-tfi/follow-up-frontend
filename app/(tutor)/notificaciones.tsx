import { NotificationItem, NotificationsView } from '@/components/organisms/NotificationsView';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    titulo: 'Ausencia Injustificada',
    mensaje: 'Mateo no asistió a la clase de Matemáticas hoy. Por favor, justifique la falta.',
    tiempo: 'Hace 2 horas',
    urgente: true,
    icono: 'error' as const,
    iconoColor: '#B3261E',
    tipoAccion: 'boton',
    textoAccion: 'Acción Requerida',
    leido: false,
  },
  {
    id: '2',
    titulo: 'Calificación publicada',
    mensaje: 'Se ha publicado la nota del examen de Historia: 9.5/10',
    tiempo: 'Hace 4 horas',
    urgente: false,
    icono: 'star' as const,
    iconoColor: '#6750A4',
    leido: false,
  },
  {
    id: '3',
    titulo: 'Mensaje de Directora',
    mensaje: 'Estimados padres, les recordamos que mañana no habrá clases por jornada técnica...',
    tiempo: 'Hace 1 día',
    urgente: false,
    icono: 'chat' as const,
    iconoColor: '#6750A4',
    leido: false,
  },
  {
    id: '4',
    titulo: 'Alerta de Rendimiento',
    mensaje: 'El promedio de Sofía en Ciencias ha bajado de 6.0. Se sugiere programar una tutoría.',
    tiempo: 'Hace 2 días',
    urgente: true,
    icono: 'warning' as const,
    iconoColor: '#B3261E',
    tipoAccion: 'link',
    textoAccion: 'Ver detalles',
    leido: false,
  },
  {
    id: '5',
    titulo: 'Reunión de Padres',
    mensaje: 'Recordatorio: La reunión trimestral será este viernes a las 17:00 en el Salón de Actos.',
    tiempo: 'Hace 3 días',
    urgente: false,
    icono: 'calendar-today' as const,
    iconoColor: '#B3261E',
    leido: false,
  },
];

export default function NotificacionesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <NotificationsView notifications={mockNotifications} />
      </SafeAreaView>
      
      {/* Bottom Bar specific to Tutor */}
      <SafeAreaView edges={[]} style={[styles.bottomBarContainer, { paddingBottom: Math.max(insets.bottom, 4) }]}>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(tutor)')} activeOpacity={0.7}>
            <MaterialIcons name="home" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="chat-bubble-outline" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Contacto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(tutor)/agenda')} activeOpacity={0.7}>
            <MaterialIcons name="calendar-today" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(tutor)/notas')} activeOpacity={0.7}>
            <MaterialIcons name="grade" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Notas</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  bottomBarContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bottomBar: {
    flexDirection: 'row',
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
