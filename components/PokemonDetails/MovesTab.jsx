import { ScrollView, View, Text, StyleSheet } from "react-native";
// Componente de Movimientos
export function MovesTab({ pokemon, backgroundColor }) {
    return (
      <ScrollView style={styles.tabContent}>
        <View style={[styles.movesContainer, { borderColor: backgroundColor, borderWidth: 1 }]}>
          {pokemon.moves.map((move) => (
            <View key={move.move.name} style={styles.moveItem}>
              <Text style={[styles.moveName, { color: backgroundColor }]}>
                {move.move.name.replace('-', ' ')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    tabContent: {
      flex: 1,
      backgroundColor: '#222',
      padding: 16,
    },
    movesContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 12,
      padding: 16,
    },
    moveItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    moveName: {
      color: '#FFF',
      fontSize: 16,
      textTransform: 'capitalize',
    },
  });