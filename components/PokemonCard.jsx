import { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View, Animated, Dimensions, Pressable } from "react-native";
import { Link } from "expo-router";

const getTypeColor = (type) => {
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return typeColors[type.toLowerCase()] || "#888888";
};

export { getTypeColor };

export function PokemonCard({ pokemon }) {
  const mainType = pokemon?.types[0]?.toLowerCase() || "normal";

  return (
    <Link href={`/${pokemon?.id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              {pokemon?.image ? (
                <Image
                  source={{
                    uri: pokemon.image,
                    cache: 'force-cache',
                  }}
                  style={styles.image}
                  resizeMode="contain"
                  defaultSource={require('../assets/pokeball-placeholder.jpg')}
                />
              ) : (
                <View style={[styles.image, styles.placeholderImage]} />
              )}
              <View style={[styles.glowEffect, { backgroundColor: getTypeColor(mainType) }]} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.number}>#{String(pokemon?.id).padStart(3, '0')}</Text>
              <Text style={styles.name}>{pokemon?.name}</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Weight</Text>
                  <Text style={styles.statValue}>{pokemon?.weight / 10} kg</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Height</Text>
                  <Text style={styles.statValue}>{pokemon?.height / 10} m</Text>
                </View>
              </View>
              <View style={styles.typeContainer}>
                {pokemon?.types.map((type) => (
                  <View key={type} style={[styles.typeTag, { backgroundColor: getTypeColor(type) }]}>
                    <Text style={styles.typeText}>{type}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function AnimatedPokemonCard({ pokemon, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, index]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <PokemonCard pokemon={pokemon} />
    </Animated.View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1C1C1C',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 12,
    height: width * 0.35,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    top: '50%',
    right: -width * 0.2,
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    opacity: 0.15,
    zIndex: 1,
  },
  placeholderImage: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  infoContainer: {
    alignItems: "flex-start",
  },
  number: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
    gap: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
  },
  typeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
