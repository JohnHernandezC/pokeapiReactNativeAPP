import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";

// Componente de Evoluciones
export function EvolutionsTab({ pokemon, navigation, backgroundColor }) {
  const renderEvolutionArrow = (evolution) => {
    let triggerText = "";
    if (evolution.min_level) {
      triggerText = `Nivel ${evolution.min_level}`;
    } else if (evolution.item) {
      triggerText = evolution.item.replace("-", " ");
    } else if (evolution.trigger) {
      triggerText = evolution.trigger.replace("-", " ");
    }

    return (
      <View style={styles.evolutionTrigger}>
        <Text style={[styles.evolutionTriggerText, { color: backgroundColor }]}>
          {triggerText || "Evoluciona"}
        </Text>
        <Text style={[styles.evolutionArrow, { color: backgroundColor }]}>
          ↓
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View
        style={[
          styles.evolutionContainer,
          { borderColor: backgroundColor, borderWidth: 1 },
        ]}
      >
        {pokemon.evolution_chain.map((evolution, index) => (
          <View key={evolution.id} style={styles.evolutionItem}>
            <Link href={`/${evolution?.id}`} asChild>
              <Pressable>
                <Image
                  source={{ uri: evolution.image, cache: "force-cache" }}
                  style={styles.evolutionImage}
                  resizeMode="contain"
                />
                <Text
                  style={[styles.evolutionName, { color: backgroundColor }]}
                >
                  {evolution.name}
                </Text>
              </Pressable>
            </Link>
            {index < pokemon.evolution_chain.length - 1 &&
              renderEvolutionArrow(pokemon.evolution_chain[index + 1])}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#222",
    padding: 16,
  },
  evolutionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
  },
  evolutionItem: {
    alignItems: "center",
    marginBottom: 16,
  },
  evolutionPokemon: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  currentEvolution: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  evolutionImage: {
    width: 120,
    height: 120,
  },
  evolutionName: {
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize",
    marginTop: 8,
  },
  evolutionTrigger: {
    alignItems: "center",
    marginVertical: 8,
  },
  evolutionTriggerText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  evolutionArrow: {
    color: "#fff",
    fontSize: 24,
  },
});
