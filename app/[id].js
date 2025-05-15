import { View, Text, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator, useWindowDimensions, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getTypeColor } from "../components/PokemonCard";
import { getPokemonDetails } from "../lib/pokemon";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AboutTab } from "../components/PokemonDetails/AboutTab";
import { EvolutionsTab } from "../components/PokemonDetails/EvolutionsTab";
import { StatsTab } from "../components/PokemonDetails/StatsTab";
import { MovesTab } from "../components/PokemonDetails/MovesTab";
import Feather from '@expo/vector-icons/Feather';

const Tab = createMaterialTopTabNavigator();

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  const fetchPokemonDetails = async () => {
    try {
      const data = await getPokemonDetails(id);
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPreferredImage = () => {
    if (!pokemon) return null;
    
    const images = [
      pokemon.sprites?.other?.['official-artwork']?.front_default,
      pokemon.sprites?.other?.home?.front_default,
      pokemon.sprites?.front_default
    ];
    
    return images.find(img => img) || null;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading Pokemon details</Text>
      </View>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = getTypeColor(mainType);
  const imageUrl = getPreferredImage();

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <Pressable style={styles.backButton} hitSlop={20}>
              <Feather name="arrow-left" size={28} color="white" />
            </Pressable>
          </Link>
          <View style={styles.headerInfo}>
            <Text style={styles.number}>#{String(pokemon.id).padStart(3, '0')}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
          </View>
        </View>

        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={{
                uri: imageUrl,
                cache: 'force-cache',
              }}
              style={[styles.image, { width: width * 0.5, height: width * 0.5 }]}
              resizeMode="contain"
              defaultSource={require('../assets/pokeball-placeholder.jpg')}
              onError={() => setImageError(true)}
            />
            <View style={[styles.glowEffect, { backgroundColor }]} />
          </View>
          
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <View
                key={type.type.name}
                style={[styles.typeTag, { backgroundColor: getTypeColor(type.type.name) }]}
              >
                <Text style={styles.typeText}>{type.type.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsQuickView}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight</Text>
              <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Height</Text>
              <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
            </View>
          </View>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: { color: '#fff', fontSize: 14, textTransform: 'capitalize' },
            tabBarIndicatorStyle: { backgroundColor: backgroundColor },
            tabBarPressColor: 'rgba(255,255,255,0.1)',
          }}
        >
          <Tab.Screen 
            name="About" 
            options={{ title: 'Information' }}
            children={() => <AboutTab pokemon={pokemon} backgroundColor={backgroundColor} />}
          />
          <Tab.Screen 
            name="Evolution" 
            options={{ title: 'Evolution' }}
            children={({ navigation }) => (
              <EvolutionsTab 
                pokemon={pokemon} 
                navigation={navigation} 
                backgroundColor={backgroundColor}
              />
            )}
          />
          <Tab.Screen 
            name="Stats" 
            options={{ title: 'Stats' }}
            children={() => <StatsTab pokemon={pokemon} backgroundColor={backgroundColor} />}
          />
          <Tab.Screen 
            name="Moves" 
            options={{ title: 'Moves' }}
            children={() => <MovesTab pokemon={pokemon} backgroundColor={backgroundColor} />}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    top: '50%',
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.15,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeTag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statsQuickView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    width: '80%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#1C1C1C',
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
});
