import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORY_SUMMARIES } from './rounds';

interface CategoryScreenProps {
  /**
   * Called when the player picks a category. `null` means "All Categories"
   * (a mixed game across everything).
   */
  onSelect: (category: string | null) => void;
  totalRounds: number;
  /** Called to return to the home screen. */
  onBack: () => void;
}

export default function CategoryScreen({ onSelect, totalRounds, onBack }: CategoryScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.8} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Home</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Solo</Text>
          <Text style={styles.subtitle}>Pick a category</Text>
        </View>

        {/* Mixed game across all categories */}
        <TouchableOpacity
          style={[styles.card, styles.allCard]}
          activeOpacity={0.85}
          onPress={() => onSelect(null)}
        >
          <Text style={styles.allCardTitle}>All Categories</Text>
          <Text style={styles.allCardCount}>{totalRounds} rounds, mixed</Text>
        </TouchableOpacity>

        {CATEGORY_SUMMARIES.map((cat) => (
          <TouchableOpacity
            key={cat.name}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onSelect(cat.name)}
          >
            <Text style={styles.cardTitle}>{cat.name}</Text>
            <Text style={styles.cardCount}>
              {cat.count} {cat.count === 1 ? 'round' : 'rounds'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f1226',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    paddingVertical: 6,
  },
  backButtonText: {
    color: '#8ea2ff',
    fontSize: 15,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#a3a8c3',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#1c2044',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2f5a',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allCard: {
    backgroundColor: '#4361ee',
    borderColor: '#4361ee',
  },
  allCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  allCardCount: {
    fontSize: 14,
    color: '#dbe0ff',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8eaf6',
  },
  cardCount: {
    fontSize: 14,
    color: '#7c82a8',
    fontWeight: '600',
  },
});
