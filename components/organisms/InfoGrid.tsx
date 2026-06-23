import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { InfoCard } from '@/components/molecules/InfoCard';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

interface InfoCardData {
  id: string;
  titulo: string;
  valor: string;
  subtitulo: string;
  icono: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

interface InfoGridProps {
  cards: InfoCardData[];
  onCardPress?: (id: string) => void;
}

export const InfoGrid = ({ cards, onCardPress }: InfoGridProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <View style={styles.grid}>
        {cards.map((card) => (
          <InfoCard
            key={card.id}
            titulo={card.titulo}
            valor={card.valor}
            subtitulo={card.subtitulo}
            icono={card.icono}
            color={card.color}
            onPress={() => onCardPress?.(card.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
});
