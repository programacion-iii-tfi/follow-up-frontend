import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface NotificationItem {
  id: string;
  titulo: string;
  mensaje: string;
  tiempo: string;
  urgente: boolean;
  icono: keyof typeof MaterialIcons.glyphMap;
  iconoColor: string;
  tipoAccion?: 'boton' | 'link';
  textoAccion?: string;
  leido: boolean;
}

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onBackPress?: () => void;
}

export const NotificationsView = ({ notifications: initialNotifications, onBackPress }: NotificationsViewProps) => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, leido: true }))
    );
  };

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>U</Text>
        </View>
      </View>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>Recientes</Text>
        <TouchableOpacity style={styles.markAllButton} onPress={handleMarkAllAsRead} activeOpacity={0.7}>
          <MaterialIcons name="done-all" size={16} color="#6750A4" />
          <Text style={styles.markAllText}>Marcar todas como leídas</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable list of notifications */}
      <ScrollView style={styles.listScroll} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {notifications.map((notif) => {
          return (
            <View
              key={notif.id}
              style={[
                styles.card,
                notif.urgente && styles.cardUrgente,
                notif.leido && styles.cardLeida,
              ]}
            >
              <View style={[styles.circleIcon, { backgroundColor: notif.iconoColor + '15' }]}>
                <MaterialIcons name={notif.icono} size={20} color={notif.iconoColor} />
              </View>
              
              <View style={styles.cardBody}>
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.cardTitle, notif.urgente && styles.cardTitleUrgente]}>
                    {notif.titulo}
                  </Text>
                  <Text style={styles.timeText}>{notif.tiempo}</Text>
                </View>
                
                <Text style={styles.cardMessage}>{notif.mensaje}</Text>

                {/* Optional action triggers */}
                {notif.tipoAccion === 'boton' && (
                  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <Text style={styles.actionButtonText}>{notif.textoAccion}</Text>
                  </TouchableOpacity>
                )}

                {notif.tipoAccion === 'link' && (
                  <TouchableOpacity style={styles.actionLink} activeOpacity={0.7}>
                    <Text style={styles.actionLinkText}>{notif.textoAccion}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: Colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  subHeaderTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.neutral,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6750A4',
  },
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    gap: 12,
  },
  cardUrgente: {
    borderLeftWidth: 4,
    borderLeftColor: '#B3261E',
  },
  cardLeida: {
    opacity: 0.7,
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.neutral,
    flex: 1,
    paddingRight: 8,
  },
  cardTitleUrgente: {
    color: '#B3261E',
  },
  timeText: {
    fontSize: 11,
    color: Colors.outline,
    fontWeight: '600',
  },
  cardMessage: {
    fontSize: 13,
    color: Colors.secondary,
    lineHeight: 18,
  },
  actionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#B3261E10',
    borderColor: '#B3261E30',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B3261E',
  },
  actionLink: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  actionLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B3261E',
    textDecorationLine: 'underline',
  },
});
