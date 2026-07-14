import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AdminHeaderProps {
    nombreAdmin: string;
    onMenuPress?: () => void;
    onNotificationsPress?: () => void;
    onAvatarPress?: () => void;
}

export default function AdminHeader({
    nombreAdmin,
    onMenuPress,
    onNotificationsPress,
    onAvatarPress,
}: AdminHeaderProps) {
    const initials = nombreAdmin ? nombreAdmin.charAt(0).toUpperCase() : 'A';

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7} onPress={onMenuPress}>
                    <MaterialIcons name="menu" size={26} color={Colors.neutral} />
                </TouchableOpacity>
                <Text style={styles.logo}>FollowUp</Text>
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
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: Colors.background,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primary,
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
