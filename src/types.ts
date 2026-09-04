/**
 * Core types for the Two Truths game.
 *
 * The game is a take on "Two Truths and a Lie": each round presents three
 * statements, exactly one of which is a lie. The player tries to spot the lie.
 */

export interface Statement {
  /** The text shown to the player. */
  text: string;
  /** Whether this statement is the lie for its round. */
  isLie: boolean;
}

export interface Round {
  /** Unique id for the round, useful as a list key. */
  id: string;
  /** An optional topic/category shown above the statements. */
  topic: string;
  /** Exactly three statements; exactly one has isLie === true. */
  statements: Statement[];
}
