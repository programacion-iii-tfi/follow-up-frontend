import AdminHeader from '@/components/organisms/AdminHeader';
import EstadoGrid, { StatCardData } from '@/components/organisms/EstadoGrid';
import ModulosList, { ModuloItemData } from '@/components/organisms/ModulosList';
import ResumenCard from '@/components/organisms/ResumenCard';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const statsData: StatCardData[] = [
    { id: '1', label: 'Alumnos', value: '450', icon: 'people', iconColor: '#6750A4' },
    { id: '2', label: 'Docentes', value: '28/30', icon: 'school', iconColor: '#625B71' },
    { id: '3', label: 'Asistencia', value: '94%', icon: 'check-circle', iconColor: '#386A20' },
    { id: '4', label: 'Alertas', value: '5% (Normal)', icon: 'warning', iconColor: '#B3261E', valueColor: '#B3261E' },
];

const modulosData: ModuloItemData[] = [
    { id: '1', icon: 'person-add', label: 'Cargar Alumno', onPress: () => console.log('Cargar Alumno') },
    { id: '2', icon: 'supervisor-account', label: 'Cargar Docente', onPress: () => console.log('Cargar Docente') },
    { id: '3', icon: 'domain', label: 'Cargar Curso / División', onPress: () => console.log('Cargar Curso') },
    { id: '4', icon: 'assessment', label: 'Reportes y Estadísticas', onPress: () => console.log('Reportes') },
];

export default function AdminDashboard() {
    const handleMenuPress = () => {
        console.log('Menu pressed');
    };

    const handleNotificationsPress = () => {
        console.log('Notifications pressed');
    };

    const handleAvatarPress = () => {
        console.log('Avatar pressed');
    };

    const handleReportPress = () => {
        console.log('Ver reporte presionado');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AdminHeader
                nombreAdmin="Fabricio"
                onMenuPress={handleMenuPress}
                onNotificationsPress={handleNotificationsPress}
                onAvatarPress={handleAvatarPress}
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
                    onButtonPress={handleReportPress}
                />
            </ScrollView>
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
