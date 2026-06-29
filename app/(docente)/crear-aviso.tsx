import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY = '#4A6FA5';
const VIOLET = '#7C4DFF';

const destinatariosOp = [
  'Todos los contactos',
  'Padres de 5° A - Matemáticas',
  'Padres de 4° B - Álgebra',
  'Directivos y Preceptores',
];

export default function CrearAvisoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [destinatario, setDestinatario] = useState(destinatariosOp[0]);
  const [mostrarDestDropdown, setMostrarDestDropdown] = useState(false);
  const [urgencia, setUrgencia] = useState<'Normal' | 'Urgente'>('Normal');
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEnviar = () => {
    // TODO: integrate with backend
    router.back();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>

        {/* ── Header ─────────────────────────────── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color={PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Comunicado</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialIcons name="notifications-none" size={24} color={Colors.neutral} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 16) + 80 }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── Destinatarios ─────────────────── */}
            <View style={[styles.fieldContainer, { zIndex: mostrarDestDropdown ? 10 : 1 }]}>
              <Text style={styles.fieldLabel}>Destinatarios</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setMostrarDestDropdown(!mostrarDestDropdown)}
                activeOpacity={0.7}
              >
                <Text style={styles.dropdownText} numberOfLines={1}>{destinatario}</Text>
                <MaterialIcons
                  name={mostrarDestDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={20}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
              {mostrarDestDropdown && (
                <View style={styles.dropdownMenu}>
                  {destinatariosOp.map((op) => (
                    <TouchableOpacity
                      key={op}
                      style={[styles.dropdownItem, op === destinatario && styles.dropdownItemActive]}
                      onPress={() => { setDestinatario(op); setMostrarDestDropdown(false); }}
                    >
                      <Text style={[styles.dropdownItemText, op === destinatario && styles.dropdownItemTextActive]}>
                        {op}
                      </Text>
                      {op === destinatario && <MaterialIcons name="check" size={16} color={PRIMARY} />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* ── Nivel de Urgencia ─────────────── */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Nivel de Urgencia</Text>
              <View style={styles.urgenciaRow}>
                <TouchableOpacity
                  style={[
                    styles.urgenciaBtn,
                    urgencia === 'Normal' ? styles.urgenciaBtnActive : styles.urgenciaBtnInactive,
                  ]}
                  onPress={() => setUrgencia('Normal')}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="info-outline"
                    size={18}
                    color={urgencia === 'Normal' ? PRIMARY : Colors.secondary}
                  />
                  <Text
                    style={[
                      styles.urgenciaText,
                      urgencia === 'Normal' ? styles.urgenciaTextActive : styles.urgenciaTextInactive,
                    ]}
                  >
                    Normal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.urgenciaBtn,
                    urgencia === 'Urgente' ? styles.urgenciaBtnUrgenteActive : styles.urgenciaBtnInactive,
                  ]}
                  onPress={() => setUrgencia('Urgente')}
                  activeOpacity={0.8}
                >
                  <MaterialIcons
                    name="priority-high"
                    size={18}
                    color={urgencia === 'Urgente' ? '#B3261E' : Colors.secondary}
                  />
                  <Text
                    style={[
                      styles.urgenciaText,
                      urgencia === 'Urgente' ? styles.urgenciaTextUrgenteActive : styles.urgenciaTextInactive,
                    ]}
                  >
                    Urgente
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Título del Aviso ──────────────── */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Título del Aviso</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ej: Reunión de padres"
                placeholderTextColor={Colors.outline}
                value={titulo}
                onChangeText={setTitulo}
              />
            </View>

            {/* ── Mensaje ───────────────────────── */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Mensaje</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Escriba aquí el contenido detallado del comunicado..."
                placeholderTextColor={Colors.outline}
                value={mensaje}
                onChangeText={setMensaje}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            {/* ── Banner Informativo ────────────── */}
            <View style={styles.bannerCard}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerTitle}>Comunicación Efectiva</Text>
                <Text style={styles.bannerSubtitle}>
                  Los avisos urgentes se notifican instantáneamente a los tutores.
                </Text>
              </View>
              <View style={styles.bannerGraphicContainer}>
                <View style={styles.bannerBackgroundGlow} />
                <MaterialIcons name="phonelink-ring" size={56} color="#7C4DFF" style={styles.bannerIcon} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* ── Botón Enviar Fijo Abajo ─────────── */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.sendButton} onPress={handleEnviar} activeOpacity={0.85}>
            <MaterialIcons name="send" size={20} color={Colors.white} style={styles.sendIcon} />
            <Text style={styles.sendButtonText}>Enviar Comunicado</Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  fieldContainer: {
    width: '100%',
    zIndex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.neutral,
    fontWeight: '500',
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownItemActive: {
    backgroundColor: PRIMARY + '08',
  },
  dropdownItemText: {
    fontSize: 13,
    color: Colors.secondary,
  },
  dropdownItemTextActive: {
    color: PRIMARY,
    fontWeight: '700',
  },
  urgenciaRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F6',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  urgenciaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  urgenciaBtnInactive: {
    backgroundColor: 'transparent',
  },
  urgenciaBtnActive: {
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  urgenciaBtnUrgenteActive: {
    backgroundColor: '#B3261E15',
    borderWidth: 1,
    borderColor: '#B3261E30',
  },
  urgenciaText: {
    fontSize: 13,
    fontWeight: '700',
  },
  urgenciaTextInactive: {
    color: Colors.secondary,
  },
  urgenciaTextActive: {
    color: PRIMARY,
  },
  urgenciaTextUrgenteActive: {
    color: '#B3261E',
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.neutral,
  },
  textArea: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.neutral,
    minHeight: 120,
    lineHeight: 20,
  },
  bannerCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F3FF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4E0FC',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: VIOLET,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 17,
  },
  bannerGraphicContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerBackgroundGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8DDFF',
    opacity: 0.6,
  },
  bannerIcon: {
    transform: [{ rotate: '-10deg' }],
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VIOLET,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    elevation: 3,
    shadowColor: VIOLET,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sendIcon: {
    transform: [{ rotate: '-20deg' }],
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
