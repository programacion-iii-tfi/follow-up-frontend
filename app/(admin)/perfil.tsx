import { ProfileMenuItem, ProfileMetric, ProfileView } from '@/components/organisms/ProfileView';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilAdminScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  const metricas: ProfileMetric[] = [
    { id: '1', label: 'Sede', value: '1', icono: 'domain' },
    { id: '2', label: 'Docentes', value: '42', icono: 'supervisor-account' },
    { id: '3', label: 'Alumnos', value: '340', icono: 'school' },
  ];

  const menuItems: ProfileMenuItem[] = [
    {
      id: '1',
      label: 'Configuración del Sistema',
      sublabel: 'Variables académicas, períodos lectivos',
      icono: 'settings',
      onPress: () => {},
    },
    {
      id: '2',
      label: 'Auditoría de Logs',
      sublabel: 'Historial de modificaciones del sistema',
      icono: 'security',
      onPress: () => {},
    },
    {
      id: '3',
      label: 'Soporte Técnico',
      sublabel: 'Reportar errores o solicitar funciones',
      icono: 'help-outline',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProfileView
          nombre="Lic. Carlos Herrera"
          rol="Administrador de Sistema"
          avatarInicial="CH"
          primaryColor="#386A20"
          metricas={metricas}
          menuItems={menuItems}
          onLogout={handleLogout}
          onBackPress={() => router.back()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  safeArea: { flex: 1 },
});
