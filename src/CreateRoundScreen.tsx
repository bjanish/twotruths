import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Round } from './types';
import { addCustomRound, makeRoundId } from './storage';

interface CreateRoundScreenProps {
  /** Called after a round is successfully saved. */
  onSaved: () => void;
  /** Called to go back without saving. */
  onCancel: () => void;
}

export default function CreateRoundScreen({ onSaved, onCancel }: CreateRoundScreenProps) {
  const [name, setName] = useState('');
  const [texts, setTexts] = useState(['', '', '']);
  // Index (0-2) of the statement marked as the lie, or null if not chosen yet.
  const [lieIndex, setLieIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateText(index: number, value: string) {
    setTexts((prev) => prev.map((t, i) => (i === index ? value : t)));
  }

  function validate(): string | null {
    const trimmed = texts.map((t) => t.trim());
    if (trimmed.some((t) => t.length === 0)) {
      return 'Fill in all three statements.';
    }
    if (lieIndex === null) {
      return 'Mark which statement is the lie.';
    }
    return null;
  }

  async function handleSave() {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSaving(true);
    const round: Round = {
      id: makeRoundId(),
      topic: name.trim() || 'My Round',
      statements: texts.map((t, i) => ({ text: t.trim(), isLie: i === lieIndex })),
    };
    try {
      await addCustomRound(round);
      onSaved();
    } catch {
      setError('Could not save. Please try again.');
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={onCancel} activeOpacity={0.8} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Create a round</Text>
          <Text style={styles.help}>
            Write three statements. Two should be true, one a lie. Then tap the star on the lie.
          </Text>

          <Text style={styles.label}>Round name (optional)</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="e.g. About Me"
            placeholderTextColor="#5b6088"
            value={name}
            onChangeText={setName}
            maxLength={40}
          />

          {texts.map((text, index) => {
            const isLie = lieIndex === index;
            return (
              <View key={index} style={styles.statementBlock}>
                <View style={styles.statementHeader}>
                  <Text style={styles.label}>Statement {index + 1}</Text>
                  <TouchableOpacity
                    onPress={() => setLieIndex(index)}
                    activeOpacity={0.8}
                    style={[styles.lieToggle, isLie && styles.lieToggleActive]}
                  >
                    <Text style={[styles.lieToggleText, isLie && styles.lieToggleTextActive]}>
                      {isLie ? '★ This is the lie' : '☆ Mark as lie'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={[styles.statementInput, isLie && styles.statementInputLie]}
                  placeholder={`Statement ${index + 1}`}
                  placeholderTextColor="#5b6088"
                  value={text}
                  onChangeText={(v) => updateText(index, v)}
                  multiline
                />
              </View>
            );
          })}

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            activeOpacity={0.85}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>{saving ? 'Saving…' : 'Save round'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f1226' },
  flex: { flex: 1 },
  container: { padding: 24, paddingTop: 32 },
  backButton: { alignSelf: 'flex-start', marginBottom: 12, paddingVertical: 6 },
  backButtonText: { color: '#8ea2ff', fontSize: 15, fontWeight: '700' },
  title: { fontSize: 28, fontWeight: '800', color: '#ffffff', marginBottom: 8 },
  help: { fontSize: 15, lineHeight: 21, color: '#a3a8c3', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '700', color: '#a3a8c3', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  nameInput: {
    backgroundColor: '#1c2044',
    borderWidth: 1,
    borderColor: '#2a2f5a',
    borderRadius: 12,
    padding: 14,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 24,
  },
  statementBlock: { marginBottom: 20 },
  statementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lieToggle: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2a2f5a',
  },
  lieToggleActive: {
    backgroundColor: '#e63946',
    borderColor: '#e63946',
  },
  lieToggleText: { color: '#a3a8c3', fontSize: 13, fontWeight: '700' },
  lieToggleTextActive: { color: '#ffffff' },
  statementInput: {
    backgroundColor: '#1c2044',
    borderWidth: 1,
    borderColor: '#2a2f5a',
    borderRadius: 12,
    padding: 14,
    color: '#ffffff',
    fontSize: 16,
    minHeight: 56,
    textAlignVertical: 'top',
  },
  statementInputLie: { borderColor: '#e63946' },
  error: { color: '#f87171', fontSize: 15, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  saveButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '800' },
});
