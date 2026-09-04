import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeScreenProps {
  onSolo: () => void;
  onPlayer: () => void;
}

export default function HomeScreen({ onSolo, onPlayer }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Two Truths</Text>
          <Text style={styles.subtitle}>and a lie</Text>
        </View>

        <TouchableOpacity style={[styles.mode, styles.solo]} activeOpacity={0.85} onPress={onSolo}>
          <Text style={styles.modeTitle}>Solo</Text>
          <Text style={styles.modeDesc}>Play curated rounds across many categories. Spot the lie.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.mode, styles.player]} activeOpacity={0.85} onPress={onPlayer}>
          <Text style={styles.modeTitle}>Player</Text>
          <Text style={styles.modeDesc}>Write your own two truths and a lie. Play them, share the phone around.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0f1226',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 20,
    color: '#a3a8c3',
    marginTop: 2,
  },
  mode: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 18,
  },
  solo: {
    backgroundColor: '#1c2044',
    borderWidth: 1,
    borderColor: '#2a2f5a',
  },
  player: {
    backgroundColor: '#4361ee',
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  modeDesc: {
    fontSize: 15,
    lineHeight: 21,
    color: '#c7ccec',
  },
});
