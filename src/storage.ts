import AsyncStorage from '@react-native-async-storage/async-storage';
import { Round } from './types';

/**
 * On-device persistence for player-created rounds.
 *
 * Rounds are stored as a single JSON array under one key. This is plenty for
 * a personal collection; if this ever grows to thousands, we'd move to a more
 * structured store, but AsyncStorage is the right tool here.
 */

const STORAGE_KEY = 'two-truths/custom-rounds/v1';

/** Loads all player-created rounds. Returns [] if none or on parse error. */
export async function loadCustomRounds(): Promise<Round[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Basic shape guard so a corrupt entry can't crash the game.
    return parsed.filter(
      (r) =>
        r &&
        typeof r.id === 'string' &&
        Array.isArray(r.statements) &&
        r.statements.length === 3 &&
        r.statements.filter((s: { isLie: boolean }) => s.isLie).length === 1
    );
  } catch {
    return [];
  }
}

/** Persists the full list of custom rounds. */
async function saveAll(rounds: Round[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rounds));
}

/** Adds a new round and returns the updated list. */
export async function addCustomRound(round: Round): Promise<Round[]> {
  const current = await loadCustomRounds();
  const next = [round, ...current];
  await saveAll(next);
  return next;
}

/** Deletes a round by id and returns the updated list. */
export async function deleteCustomRound(id: string): Promise<Round[]> {
  const current = await loadCustomRounds();
  const next = current.filter((r) => r.id !== id);
  await saveAll(next);
  return next;
}

/** Generates a reasonably unique id for a new round. */
export function makeRoundId(): string {
  return `custom-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}
