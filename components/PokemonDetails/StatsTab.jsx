import { ScrollView, View, Text, StyleSheet } from "react-native";

const statNames = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  'speed': 'Speed'
};

export function StatsTab({ pokemon, backgroundColor }) {
  const getStatPercentage = (value) => {
    return (value / 255) * 100;
  };

  const getStatColor = (percentage) => {
    if (percentage >= 70) return '#4CAF50';
    if (percentage >= 50) return '#FFC107';
    return '#FF5722';
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.statsContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={[styles.totalValue, { color: backgroundColor }]}>
            {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
          </Text>
        </View>

        {pokemon.stats.map((stat) => {
          const percentage = getStatPercentage(stat.base_stat);
          const statColor = getStatColor(percentage);
          
          return (
            <View key={stat.stat.name} style={styles.statRow}>
              <View style={styles.statHeader}>
                <Text style={styles.statName}>
                  {statNames[stat.stat.name] || stat.stat.name}
                </Text>
                <Text style={[styles.statValue, { color: backgroundColor }]}>
                  {stat.base_stat}
                </Text>
              </View>
              <View style={styles.statBarContainer}>
                <View style={styles.statBarBackground}>
                  <View
                    style={[
                      styles.statBar,
                      {
                        width: `${percentage}%`,
                        backgroundColor: statColor,
                      },
                    ]}
                  />
                </View>
                <View style={styles.statMarkers}>
                  <View style={styles.marker} />
                  <View style={styles.marker} />
                  <View style={styles.marker} />
                  <View style={styles.marker} />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>High (70-100)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFC107' }]} />
          <Text style={styles.legendText}>Medium (50-69)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF5722' }]} />
          <Text style={styles.legendText}>Low (0-49)</Text>
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
  statsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statRow: {
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
    width: 100,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  statBarContainer: {
    position: 'relative',
  },
  statBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 4,
  },
  statMarkers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '12.5%',
  },
  marker: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
}); 