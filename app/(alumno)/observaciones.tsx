import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ObservacionesAlumnoScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.text}>Observaciones y Conducta – Próximamente</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
        <Text style={styles.btnText}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', gap: 20 },
  text: { fontSize: 18, fontWeight: '700', color: Colors.neutral },
  btn: { backgroundColor: '#6750A4', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  btnText: { color: Colors.white, fontWeight: '700' },
});
