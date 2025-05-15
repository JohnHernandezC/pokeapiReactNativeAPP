import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, Pressable, View, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Link asChild href="/">
          <Pressable style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </Pressable>
        </Link>
        <Text style={styles.headerTitle}>Acerca de PokéExplorer</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png' }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Tu Compañero Pokémon Definitivo
        </Text>

        <Text style={styles.subtitle}>
          Explora, Aprende, ¡Conviértete en Maestro!
        </Text>

        <Text style={styles.paragraph}>
          Bienvenido a PokéExplorer, tu guía completa en el mundo Pokémon. Utilizando la potente PokéAPI, te brindamos acceso a una extensa base de datos con información detallada sobre todas las especies Pokémon, sus habilidades, movimientos y mucho más.
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statLabel}>Pokémon</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>900+</Text>
            <Text style={styles.statLabel}>Movimientos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>250+</Text>
            <Text style={styles.statLabel}>Habilidades</Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          Nuestra aplicación está diseñada para entrenadores de todos los niveles, desde novatos hasta veteranos. Aprovechamos la PokéAPI para ofrecerte la información más precisa y actualizada del mundo Pokémon.
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <AntDesign name="search1" size={24} color="#FF5350" />
            <Text style={styles.featureText}>Búsqueda Avanzada de Pokémon</Text>
          </View>
          <View style={styles.featureItem}>
            <AntDesign name="bars" size={24} color="#3B4CCA" />
            <Text style={styles.featureText}>Detalles de Estadísticas</Text>
          </View>
          <View style={styles.featureItem}>
            <AntDesign name="heart" size={24} color="#FFDE00" />
            <Text style={styles.featureText}>Guarda tus Favoritos</Text>
          </View>
        </View>

        <Text style={[styles.paragraph, styles.attribution]}>
          Powered by PokéAPI - La API RESTful de Pokémon
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5350', // Pokémon Red
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#3B4CCA', // Pokémon Blue
    marginBottom: 24,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 24,
    textAlign: 'justify',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5350', // Pokémon Red
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  featuresContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  attribution: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
