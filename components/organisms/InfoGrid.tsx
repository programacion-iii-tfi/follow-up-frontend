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
      <Text style={styles.title}>INFORMACIÓN</Text>
      <View style={styles.infoContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
    paddingHorizontal: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoContainer: {
    backgroundColor: '#F8F8FA', // The greyish background
    marginHorizontal: 12,
    borderRadius: 16,
    padding: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
