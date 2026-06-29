import AdminHeader from '@/components/organisms/AdminHeader';
import DrawerMenu, { DrawerMenuItem } from '@/components/organisms/DrawerMenu';
import EstadoGrid, { StatCardData } from '@/components/organisms/EstadoGrid';
import ModulosList, { ModuloItemData } from '@/components/organisms/ModulosList';
import ResumenCard from '@/components/organisms/ResumenCard';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const statsData: StatCardData[] = [
    { id: '1', label: 'Alumnos', value: '450', icon: 'people', iconColor: '#6750A4' },
    { id: '2', label: 'Docentes', value: '28/30', icon: 'school', iconColor: '#625B71' },
    { id: '3', label: 'Asistencia', value: '94%', icon: 'check-circle', iconColor: '#386A20' },
    { id: '4', label: 'Alertas', value: '5% (Normal)', icon: 'warning', iconColor: '#B3261E', valueColor: '#B3261E' },
];

export default function AdminDashboard() {
    const router = useRouter();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const modulosData: ModuloItemData[] = [
        { id: '1', icon: 'person-add', label: 'Cargar Alumno', onPress: () => router.push('/(admin)/cargar-alumno' as any) },
        { id: '2', icon: 'supervisor-account', label: 'Cargar Docente', onPress: () => router.push('/(admin)/cargar-docente' as any) },
        { id: '3', icon: 'domain', label: 'Cargar Curso / División', onPress: () => router.push('/(admin)/cargar-curso' as any) },
        { id: '4', icon: 'assessment', label: 'Reportes y Estadísticas', onPress: () => router.push('/(admin)/reportes' as any) },
    ];

    const drawerItems: DrawerMenuItem[] = [
        { icon: 'dashboard', label: 'Panel Principal' },
        { icon: 'person-add', label: 'Cargar Alumno', onPress: () => router.push('/(admin)/cargar-alumno' as any) },
        { icon: 'supervisor-account', label: 'Cargar Docente', onPress: () => router.push('/(admin)/cargar-docente' as any) },
        { icon: 'domain', label: 'Cargar Curso / División', onPress: () => router.push('/(admin)/cargar-curso' as any) },
        { icon: 'assessment', label: 'Reportes y Estadísticas', onPress: () => router.push('/(admin)/reportes' as any) },
        { icon: 'settings', label: 'Configuración del Sistema' },
    ];

    const handleLogout = () => {
        router.dismissAll();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AdminHeader
                nombreAdmin="Fabricio"
                onMenuPress={() => setDrawerVisible(true)}
                onNotificationsPress={() => {}}
                onAvatarPress={() => {}}
            />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Panel Administrador</Text>
                    <Text style={styles.subtitle}>Centro de control y gestión escolar.</Text>
                    <View style={styles.divider} />
                </View>

                <EstadoGrid stats={statsData} />

                <ModulosList modulos={modulosData} />

                <ResumenCard
                    title="Alertas Críticas Recientes"
                    description="Esta semana se registraron 12 alertas de inasistencias reiteradas. Se recomienda revisar el reporte y notificar a los tutores correspondientes."
                    buttonText="Ver Reporte Detallado"
                    icon="assignment-late"
                    onButtonPress={() => router.push('/(admin)/reportes' as any)}
                />
            </ScrollView>

            <DrawerMenu
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                nombre="Admin Usuario"
                rol="Administrador"
                rolColor={Colors.primary}
                items={drawerItems}
                activeLabel="Panel Principal"
                onLogout={handleLogout}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    titleSection: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.neutral,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.secondary,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.surfaceVariant,
        width: '100%',
    },
});
