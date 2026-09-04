import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Round } from './types';

interface GameScreenProps {
  rounds: Round[];
  /** Label shown for the current selection, e.g. "Star Trek" or "All Categories". */
  categoryLabel: string;
  /** Called when the player wants to go back to the category picker. */
  onExit: () => void;
}

/** Fisher-Yates shuffle that returns a new array (does not mutate input). */
function shuffle<T>(input: T[]): T[] {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GameScreen({ rounds, categoryLabel, onExit }: GameScreenProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  // Running tallies for the current game.
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  // Index of the statement the player tapped this round, or null if unanswered.
  const [selected, setSelected] = useState<number | null>(null);
  // Shuffle the round ORDER once per game so sessions don't always start the
  // same way. `gameSeed` changes on "Play again" to reshuffle.
  const [gameSeed, setGameSeed] = useState(0);
  // True once the player has finished the last round (show the summary).
  const [finished, setFinished] = useState(false);
  const orderedRounds = useMemo(() => shuffle(rounds), [rounds, gameSeed]);

  const round = orderedRounds[roundIndex];

  // Shuffle statement order per round so the lie isn't always in the same spot.
  // Recomputed whenever the round changes.
  const statements = useMemo(() => shuffle(round.statements), [round]);

  const isAnswered = selected !== null;
  const isLastRound = roundIndex === orderedRounds.length - 1;

  function handleSelect(index: number) {
    if (isAnswered) return; // lock in the first guess for the round
    setSelected(index);
    if (statements[index].isLie) {
      setCorrect((c) => c + 1);
    } else {
      setIncorrect((n) => n + 1);
    }
  }

  function handleNext() {
    if (isLastRound) {
      setFinished(true); // show the end-of-game summary
    } else {
      setRoundIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function handlePlayAgain() {
    setRoundIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setSelected(null);
    setFinished(false);
    setGameSeed((s) => s + 1); // reshuffle round order
  }

  const guessedCorrectly = isAnswered && statements[selected].isLie;

  // End-of-game summary screen.
  if (finished) {
    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    let verdict = 'Nice work!';
    if (accuracy === 100) verdict = 'Perfect! You spotted every lie.';
    else if (accuracy >= 70) verdict = 'Great eye for a lie.';
    else if (accuracy >= 40) verdict = 'Not bad, keep practicing.';
    else verdict = 'The lies got you this time.';

    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={[styles.container, styles.summaryContainer]}>
          <Text style={styles.summaryHeading}>Game Over</Text>
          <Text style={styles.summaryVerdict}>{verdict}</Text>

          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, styles.tallyCorrect]}>{correct}</Text>
              <Text style={styles.summaryStatLabel}>correct</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, styles.tallyIncorrect]}>{incorrect}</Text>
              <Text style={styles.summaryStatLabel}>wrong</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, styles.summaryAccuracy]}>{accuracy}%</Text>
              <Text style={styles.summaryStatLabel}>accuracy</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handlePlayAgain} activeOpacity={0.85}>
            <Text style={styles.nextButtonText}>Play again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summarySecondary} onPress={onExit} activeOpacity={0.7}>
            <Text style={styles.summarySecondaryText}>Pick a different category</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onExit} activeOpacity={0.8} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Change category</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Two Truths</Text>
          <Text style={styles.subtitle}>{categoryLabel}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            Round {roundIndex + 1} / {orderedRounds.length}
          </Text>
          <View style={styles.tallies}>
            <View style={styles.tally}>
              <Text style={[styles.tallyValue, styles.tallyCorrect]}>{correct}</Text>
              <Text style={styles.tallyLabel}>correct</Text>
            </View>
            <View style={styles.tally}>
              <Text style={[styles.tallyValue, styles.tallyIncorrect]}>{incorrect}</Text>
              <Text style={styles.tallyLabel}>wrong</Text>
            </View>
          </View>
        </View>

        <Text style={styles.topic}>{round.topic}</Text>

        <View style={styles.cards}>
          {statements.map((statement, index) => {
            const isThisSelected = selected === index;
            // The lie the player correctly found -> green (success).
            const showAsCorrect = isAnswered && statement.isLie && guessedCorrectly;
            // The lie the player missed -> revealed so they learn the answer.
            const showAsMissedLie = isAnswered && statement.isLie && !guessedCorrectly;
            // A truth the player wrongly tapped -> red (their mistake).
            const showAsWrongPick = isAnswered && isThisSelected && !statement.isLie;

            // Only the solid-filled cards (green correct, red wrong pick) need
            // white bold text. The missed-lie card is a dark outline, so it
            // keeps normal text.
            const onColor = showAsCorrect || showAsWrongPick;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                disabled={isAnswered}
                onPress={() => handleSelect(index)}
                style={[
                  styles.card,
                  showAsCorrect && styles.cardCorrect,
                  showAsWrongPick && styles.cardWrong,
                  showAsMissedLie && styles.cardMissedLie,
                ]}
              >
                <Text style={[styles.cardText, onColor && styles.cardTextOnColor]}>
                  {statement.text}
                </Text>
                {showAsCorrect && <Text style={styles.tag}>THE LIE ✓</Text>}
                {showAsMissedLie && (
                  <Text style={[styles.tag, styles.tagMissedLie]}>THIS WAS THE LIE</Text>
                )}
                {showAsWrongPick && <Text style={styles.tag}>YOUR PICK</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered && (
          <View style={styles.result}>
            <View
              style={[
                styles.resultBanner,
                guessedCorrectly ? styles.resultBannerCorrect : styles.resultBannerWrong,
              ]}
            >
              <Text style={styles.resultText}>
                {guessedCorrectly ? 'Nice, you found the lie!' : 'Not quite. That was a truth.'}
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
              <Text style={styles.nextButtonText}>
                {isLastRound ? 'See results' : 'Next round'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeCategoryLink} onPress={onExit} activeOpacity={0.7}>
              <Text style={styles.changeCategoryLinkText}>Change category</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isAnswered && (
          <Text style={styles.hint}>Tap the statement you think is the lie.</Text>
        )}
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
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    backgroundColor: '#1c2044',
    borderWidth: 1,
    borderColor: '#4361ee',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: '#8ea2ff',
    fontSize: 15,
    fontWeight: '700',
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  meta: {
    fontSize: 14,
    color: '#a3a8c3',
    fontWeight: '600',
  },
  tallies: {
    flexDirection: 'row',
    gap: 18,
  },
  tally: {
    alignItems: 'center',
  },
  tallyValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  tallyCorrect: {
    color: '#4ade80',
  },
  tallyIncorrect: {
    color: '#f87171',
  },
  tallyLabel: {
    fontSize: 11,
    color: '#7c82a8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  topic: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffd166',
    marginBottom: 16,
  },
  cards: {
    gap: 14,
  },
  card: {
    backgroundColor: '#1c2044',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2f5a',
  },
  cardCorrect: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  cardWrong: {
    backgroundColor: '#e63946',
    borderColor: '#e63946',
  },
  cardMissedLie: {
    backgroundColor: '#1c2044',
    borderColor: '#22c55e',
    borderWidth: 2,
  },
  cardText: {
    fontSize: 17,
    lineHeight: 24,
    color: '#e8eaf6',
  },
  cardTextOnColor: {
    color: '#ffffff',
    fontWeight: '600',
  },
  tag: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#ffffff',
  },
  tagMissedLie: {
    color: '#4ade80',
  },
  result: {
    marginTop: 28,
    alignItems: 'center',
  },
  resultBanner: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultBannerCorrect: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  resultBannerWrong: {
    backgroundColor: 'rgba(230, 57, 70, 0.18)',
    borderWidth: 1,
    borderColor: '#e63946',
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  summaryHeading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  summaryVerdict: {
    fontSize: 17,
    color: '#a3a8c3',
    textAlign: 'center',
    marginBottom: 32,
  },
  summaryStats: {
    flexDirection: 'row',
    gap: 28,
    marginBottom: 40,
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 34,
    fontWeight: '800',
  },
  summaryAccuracy: {
    color: '#ffd166',
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#7c82a8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  summarySecondary: {
    marginTop: 16,
    paddingVertical: 10,
  },
  summarySecondaryText: {
    color: '#7c82a8',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  changeCategoryLink: {
    marginTop: 14,
    paddingVertical: 8,
  },
  changeCategoryLinkText: {
    color: '#8ea2ff',
    fontSize: 15,
    fontWeight: '600',
  },
  hint: {
    marginTop: 28,
    textAlign: 'center',
    color: '#7c82a8',
    fontSize: 14,
  },
});
