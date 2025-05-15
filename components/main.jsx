import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  Easing,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPokemonList } from "../lib/pokemon";
import { AnimatedPokemonCard } from "./PokemonCard";
import { Pokeball } from "./Pokeball"; // asegúrate de importar correctamente
import Feather from '@expo/vector-icons/Feather';

const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

export function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const LIMIT = 20;
  
  const insets = useSafeAreaInsets();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Iniciar animación al montar
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Cargar datos iniciales
  useEffect(() => {
    loadInitialPokemon();
  }, []);

  // Efecto para filtrar Pokémon
  useEffect(() => {
    filterPokemon();
  }, [searchText, selectedTypes, pokemonList]);

  const loadInitialPokemon = async () => {
    try {
      const pokemons = await getPokemonList(LIMIT, 0);
      setPokemonList(pokemons);
      setLoading(false);
    } catch (error) {
      console.error("Error loading initial pokemon:", error);
      setLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    if (loadingMore) return;
    
    try {
      setLoadingMore(true);
      const newOffset = offset + LIMIT;
      const morePokemon = await getPokemonList(LIMIT, newOffset);
      
      setPokemonList(currentList => [...currentList, ...morePokemon]);
      setOffset(newOffset);
    } catch (error) {
      console.error("Error loading more pokemon:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const filterPokemon = () => {
    let filtered = [...pokemonList];

    // Filtrar por texto de búsqueda
    if (searchText) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
        pokemon.id.toString().includes(searchText)
      );
    }

    // Filtrar por tipos seleccionados
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => selectedTypes.includes(type))
      );
    }

    setFilteredPokemonList(filtered);
  };

  const toggleType = (type) => {
    setSelectedTypes(current =>
      current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    );
  };

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
    return typeColors[type] || "#888888";
  };

  // Interpolación para rotación
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }
      ]}
    >
      <Stack.Screen 
        options={{
          headerShown: false,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1C" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <Link href="/about" asChild>
          <TouchableOpacity style={styles.infoButton} hitSlop={20}>
            <Feather name="info" size={24} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={20} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o número..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.typeFiltersContainer}
          contentContainerStyle={styles.typeFiltersContent}
        >
          {POKEMON_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeFilter,
                { backgroundColor: selectedTypes.includes(type) ? getTypeColor(type) : 'rgba(255,255,255,0.1)' }
              ]}
              onPress={() => toggleType(type)}
            >
              <Text style={[
                styles.typeFilterText,
                { color: selectedTypes.includes(type) ? '#fff' : 'rgba(255,255,255,0.6)' }
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>  
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Pokeball width={80} height={80} />
          </Animated.View>
        </View>
      ) : (
        <FlatList
          data={filteredPokemonList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <AnimatedPokemonCard pokemon={item} index={index} />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMorePokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron Pokémon</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  infoButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#fff',
    fontSize: 16,
  },
  typeFiltersContainer: {
    flexDirection: 'row',
  },
  typeFiltersContent: {
    paddingVertical: 8,
    gap: 8,
  },
  typeFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  typeFilterText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
});
