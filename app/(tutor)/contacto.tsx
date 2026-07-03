import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Tab = 'Mensajes' | 'Directorio';

const mensajes = [
  {
    id: '1',
    nombre: 'Prof. Elena Martínez',
    preview: 'Hola, quería comentarte s...',
    hora: '10:45 AM',
    sinLeer: 2,
    iniciales: 'EM',
    avatarColor: '#6750A4',
    online: true,
  },
  {
    id: '2',
    nombre: 'Dr. Ricardo Silva',
    preview: 'La lista de materiales para...',
    hora: 'Ayer',
    sinLeer: 0,
    iniciales: 'RS',
    avatarColor: '#386A20',
    online: false,
  },
  {
    id: '3',
    nombre: 'Administración Central',
    preview: 'Confirmamos la recepción...',
    hora: 'Lun',
    sinLeer: 0,
    iniciales: 'AC',
    avatarColor: '#625B71',
    online: false,
    esAdmin: true,
  },
];

const directorio = [
  { id: '1', nombre: 'Prof. Elena Martínez', materia: 'Matemáticas', iniciales: 'EM', avatarColor: '#6750A4' },
  { id: '2', nombre: 'Dr. Ricardo Silva', materia: 'Biología', iniciales: 'RS', avatarColor: '#386A20' },
  { id: '3', nombre: 'Prof. Silvia Rossi', materia: 'Lengua y Literatura', iniciales: 'SR', avatarColor: '#B3261E' },
  { id: '4', nombre: 'Prof. Carlos Weber', materia: 'Física', iniciales: 'CW', avatarColor: '#E65100' },
  { id: '5', nombre: 'Prof. Roberto Domínguez', materia: 'Historia', iniciales: 'RD', avatarColor: '#625B71' },
];

export default function ContactoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tabActiva, setTabActiva] = useState<Tab>('Mensajes');
  const [busqueda, setBusqueda] = useState('');

  const directorioFiltrado = directorio.filter((d) =>
    d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.materia.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comunicaciones</Text>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>T</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {(['Mensajes', 'Directorio'] as Tab[]).map((tab) => {
            const isActive = tabActiva === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setTabActiva(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        {tabActiva === 'Mensajes' ? (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {mensajes.map((msg, index) => (
              <TouchableOpacity key={msg.id} style={styles.chatRow} activeOpacity={0.7}>
                <View style={styles.avatarWrapper}>
                  <View style={[styles.chatAvatar, { backgroundColor: msg.avatarColor }]}>
                    <Text style={styles.chatAvatarText}>{msg.iniciales}</Text>
                  </View>
                  {msg.online && <View style={styles.onlineDot} />}
                </View>

                <View style={styles.chatBody}>
                  <View style={styles.chatHeaderRow}>
                    <Text style={styles.chatNombre}>{msg.nombre}</Text>
                    <Text style={[styles.chatHora, msg.sinLeer > 0 && styles.chatHoraUnread]}>{msg.hora}</Text>
                  </View>
                  <View style={styles.chatFooterRow}>
                    <Text style={styles.chatPreview} numberOfLines={1}>{msg.preview}</Text>
                    {msg.sinLeer > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{msg.sinLeer}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.directorioContainer}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <MaterialIcons name="search" size={20} color={Colors.outline} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar docente o materia..."
                placeholderTextColor={Colors.outline}
                value={busqueda}
                onChangeText={setBusqueda}
              />
              {busqueda.length > 0 && (
                <TouchableOpacity onPress={() => setBusqueda('')}>
                  <MaterialIcons name="close" size={18} color={Colors.outline} />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {directorioFiltrado.map((docente) => (
                <View key={docente.id} style={styles.docenteRow}>
                  <View style={[styles.chatAvatar, { backgroundColor: docente.avatarColor }]}>
                    <Text style={styles.chatAvatarText}>{docente.iniciales}</Text>
                  </View>
                  <View style={styles.docenteInfo}>
                    <Text style={styles.docenteNombre}>{docente.nombre}</Text>
                    <Text style={styles.docenteMateria}>{docente.materia}</Text>
                  </View>
                  <TouchableOpacity style={styles.chatButton} activeOpacity={0.7}>
                    <MaterialIcons name="chat-bubble" size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Bottom Bar */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 4) }]}>
          <TouchableOpacity style={styles.bottomBarItem} onPress={() => router.replace('/(tutor)')} activeOpacity={0.7}>
            <MaterialIcons name="home" size={24} color={Colors.outline} />
            <Text style={styles.bottomBarText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBarItem} activeOpacity={0.7}>
            <MaterialIcons name="chat-bubble-outline" size={24} color={Colors.primary} />
            <Text style={[styles.bottomBarText, { color: Colors.primary }]}>Contacto</Text>
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
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  tabTextActive: {
    color: Colors.neutral,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarWrapper: {
    position: 'relative',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatAvatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  chatBody: {
    flex: 1,
    gap: 4,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatNombre: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.neutral,
  },
  chatHora: {
    fontSize: 12,
    color: Colors.outline,
  },
  chatHoraUnread: {
    color: '#6750A4',
    fontWeight: '700',
  },
  chatFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatPreview: {
    fontSize: 13,
    color: Colors.secondary,
    flex: 1,
  },
  badge: {
    backgroundColor: '#6750A4',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  directorioContainer: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral,
    paddingVertical: 0,
  },
  docenteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  docenteInfo: {
    flex: 1,
  },
  docenteNombre: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
    marginBottom: 2,
  },
  docenteMateria: {
    fontSize: 12,
    color: Colors.secondary,
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
