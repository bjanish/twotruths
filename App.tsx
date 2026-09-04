import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/HomeScreen';
import CategoryScreen from './src/CategoryScreen';
import GameScreen from './src/GameScreen';
import MyRoundsScreen from './src/MyRoundsScreen';
import CreateRoundScreen from './src/CreateRoundScreen';
import { Round } from './src/types';
import { ALL_ROUNDS, roundsForCategory } from './src/rounds';

type Screen =
  | { name: 'home' }
  | { name: 'soloCategories' }
  | { name: 'myRounds' }
  | { name: 'create' }
  | { name: 'game'; rounds: Round[]; label: string; returnTo: 'soloCategories' | 'myRounds' };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  // Bumped whenever custom rounds change, so MyRoundsScreen reloads.
  const [roundsVersion, setRoundsVersion] = useState(0);

  function renderScreen() {
    switch (screen.name) {
      case 'home':
        return (
          <HomeScreen
            onSolo={() => setScreen({ name: 'soloCategories' })}
            onPlayer={() => setScreen({ name: 'myRounds' })}
          />
        );

      case 'soloCategories':
        return (
          <CategoryScreen
            totalRounds={ALL_ROUNDS.length}
            onBack={() => setScreen({ name: 'home' })}
            onSelect={(category) =>
              setScreen({
                name: 'game',
                rounds: category === null ? ALL_ROUNDS : roundsForCategory(category),
                label: category === null ? 'All Categories' : category,
                returnTo: 'soloCategories',
              })
            }
          />
        );

      case 'myRounds':
        return (
          <MyRoundsScreen
            reloadKey={roundsVersion}
            onBack={() => setScreen({ name: 'home' })}
            onCreate={() => setScreen({ name: 'create' })}
            onPlay={(rounds) =>
              setScreen({ name: 'game', rounds, label: 'Your Rounds', returnTo: 'myRounds' })
            }
          />
        );

      case 'create':
        return (
          <CreateRoundScreen
            onCancel={() => setScreen({ name: 'myRounds' })}
            onSaved={() => {
              setRoundsVersion((v) => v + 1); // trigger MyRounds reload
              setScreen({ name: 'myRounds' });
            }}
          />
        );

      case 'game':
        return (
          <GameScreen
            rounds={screen.rounds}
            categoryLabel={screen.label}
            onExit={() => {
              const returnTo = screen.returnTo;
              setScreen({ name: returnTo } as Screen);
            }}
          />
        );
    }
  }

  return (
    <>
      <StatusBar style="light" />
      {renderScreen()}
    </>
  );
}
