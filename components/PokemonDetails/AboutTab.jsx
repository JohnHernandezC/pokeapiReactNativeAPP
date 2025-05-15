import { ScrollView, View, Text, StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export function AboutTab({ pokemon, backgroundColor }) {
  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContainer}>
        <Text style={styles.descriptionText}>
          {pokemon.species_info.flavor_text?.replace(/\f/g, '\n')}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <View style={styles.statIconContainer}>
            <Feather name="ruler" size={20} color="rgba(255,255,255,0.6)" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={[styles.statValue, { color: backgroundColor }]}>{pokemon.height / 10} m</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statRow}>
          <View style={styles.statIconContainer}>
            <Feather name="box" size={20} color="rgba(255,255,255,0.6)" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={[styles.statValue, { color: backgroundColor }]}>{pokemon.weight / 10} kg</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Generation</Text>
            <Text style={[styles.infoValue, { color: backgroundColor }]}>
              {pokemon.species_info.generation.replace('generation-', '').toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Habitat</Text>
            <Text style={[styles.infoValue, { color: backgroundColor }]}>
              {pokemon.species_info.habitat || 'Unknown'}
            </Text>
          </View>
        </View>

        {(pokemon.species_info.is_legendary || pokemon.species_info.is_mythical) && (
          <View style={styles.specialContainer}>
            {pokemon.species_info.is_legendary && (
              <View style={[styles.specialTag, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                <Feather name="star" size={16} color="#FFD700" />
                <Text style={styles.specialText}>Legendary</Text>
              </View>
            )}
            {pokemon.species_info.is_mythical && (
              <View style={[styles.specialTag, { backgroundColor: 'rgba(255, 105, 180, 0.2)' }]}>
                <Feather name="moon" size={16} color="#FF69B4" />
                <Text style={styles.specialText}>Mythical</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        <View style={styles.abilitiesContainer}>
          {pokemon.abilities.map((ability) => (
            <View 
              key={ability.ability.name} 
              style={[
                styles.abilityTag,
                { backgroundColor: ability.is_hidden ? 'rgba(255,255,255,0.1)' : `${backgroundColor}20` }
              ]}
            >
              <Text style={[
                styles.abilityText,
                { color: ability.is_hidden ? 'rgba(255,255,255,0.8)' : backgroundColor }
              ]}>
                {ability.ability.name.replace('-', ' ')}
                {ability.is_hidden && (
                  <Text style={styles.hiddenText}> (Hidden)</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  descriptionText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  statsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 24,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  specialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  specialText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  abilityText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  hiddenText: {
    fontSize: 12,
    opacity: 0.7,
  },
}); 