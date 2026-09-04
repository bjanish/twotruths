import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Round } from './types';
import { loadCustomRounds, deleteCustomRound } from './storage';

interface MyRoundsScreenProps {
  onBack: () => void;
  onCreate: () => void;
  /** Play the given custom rounds through the game screen. */
  onPlay: (rounds: Round[]) => void;
  /** Bumped by the parent whenever rounds may have changed, to trigger a reload. */
  reloadKey: number;
}

export default function MyRoundsScreen({ onBack, onCreate, onPlay, reloadKey }: MyRoundsScreenProps) {
  const [rounds, setRounds] = useState<Round[] | null>(null);

  useEffect(() => {
    let active = true;
    loadCustomRounds().then((r) => {
      if (active) setRounds(r);
    });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  function confirmDelete(round: Round) {
    Alert.alert('Delete round?', `"${round.topic}" will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const next = await deleteCustomRound(round.id);
          setRounds(next);
        },
      },
    ]);
  }

  const hasRounds = rounds !== null && rounds.length > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.8} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹ Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Player Mode</Text>
        <Text style={styles.help}>Your own rounds. Create as many as you like, then play them.</Text>

        <TouchableOpacity style={styles.createButton} onPress={onCreate} activeOpacity={0.85}>
          <Text style={styles.createButtonText}>+ Create a round</Text>
        </TouchableOpacity>

        {hasRounds && (
          <TouchableOpacity
            style={styles.playAllButton}
            onPress={() => onPlay(rounds as Round[])}
            activeOpacity={0.85}
          >
            <Text style={styles.playAllButtonText}>
              Play {rounds!.length} {rounds!.length === 1 ? 'round' : 'rounds'}
            </Text>
          </TouchableOpacity>
        )}

        {rounds === null && (
          <View style={styles.loading}>
            <ActivityIndicator color="#8ea2ff" />
          </View>
        )}

        {rounds !== null && rounds.length === 0 && (
          <Text style={styles.empty}>
            No rounds yet. Tap "Create a round" to write your first two truths and a lie.
          </Text>
        )}

        {hasRounds &&
          rounds!.map((round) => {
            const lie = round.statements.find((s) => s.isLie);
            return (
              <View key={round.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {round.topic}
                  </Text>
                  <TouchableOpacity onPress={() => confirmDelete(round)} activeOpacity={0.7}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardPreview} numberOfLines={2}>
                  Lie: {lie ? lie.text : '(unknown)'}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f1226' },
  container: { padding: 24, paddingTop: 32 },
  backButton: { alignSelf: 'flex-start', marginBottom: 12, paddingVertical: 6 },
  backButtonText: { color: '#8ea2ff', fontSize: 15, fontWeight: '700' },
  title: { fontSize: 28, fontWeight: '800', color: '#ffffff', marginBottom: 8 },
  help: { fontSize: 15, lineHeight: 21, color: '#a3a8c3', marginBottom: 24 },
  createButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 12,
  },
  createButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '800' },
  playAllButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 24,
  },
  playAllButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '800' },
  loading: { paddingVertical: 32 },
  empty: {
    color: '#7c82a8',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 24,
  },
  card: {
    backgroundColor: '#1c2044',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2a2f5a',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#e8eaf6', flex: 1, marginRight: 12 },
  deleteText: { color: '#f87171', fontSize: 14, fontWeight: '700' },
  cardPreview: { color: '#7c82a8', fontSize: 14, lineHeight: 20 },
});
