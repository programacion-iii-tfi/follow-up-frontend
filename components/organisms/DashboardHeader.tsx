import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DashboardHeaderProps {
  nombreTutor: string;
  onNotificationsPress?: () => void;
  onAvatarPress?: () => void;
}

export const DashboardHeader = ({ nombreTutor, onNotificationsPress, onAvatarPress }: DashboardHeaderProps) => {
  const initials = nombreTutor.charAt(0).toUpperCase();

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <Text style={styles.logo}>FollowUp</Text>
        <Text style={styles.greeting}>Hola, {nombreTutor}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={onNotificationsPress}>
          <MaterialIcons name="notifications-none" size={26} color={Colors.neutral} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onAvatarPress}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  left: {
    gap: 2,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  greeting: {
    fontSize: 13,
    color: Colors.secondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.onPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
});
