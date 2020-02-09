import * as User from "../user";
import { Hand } from "./cards/hand";
import { Game } from "./game";

/**
 * A player containing only state all users can see.
 */
export interface Public {
  score: Score;
  likes: Likes;
  presence: Presence;
}

/**
 * The role the player currently has in the game.
 */
export type Role = "Czar" | "Player";

/**
 * How many points the player has scored.
 * @TJS-type integer
 * @minimum 0
 */
export type Score = number;

/**
 * How many likes the player has received.
 * @TJS-type integer
 * @minimum 0
 */
export type Likes = number;

/**
 * If the player is active in the game or has been marked as away.
 */
export type Presence = "Active" | "Away";

/**
 * A player in the game.
 */
export class Player {
  public hand: Hand;
  public score: Score;
  public presence: Presence;
  public likes: Likes;

  public constructor(hand: Hand) {
    this.hand = hand;
    this.score = 0;
    this.likes = 0;
    this.presence = "Active";
  }

  public public(): Public {
    return {
      score: this.score,
      presence: this.presence,
      likes: this.likes
    };
  }
}

/**
 * Get the given player's role in the current round, or null if they are not
 * in the round.
 * @param id The player's id.
 * @param game The game.
 */
export function role(id: User.Id, game: Game): Role | null {
  if (game.round.czar === id) {
    return "Czar";
  } else if (game.round.players.has(id)) {
    return "Player";
  } else {
    return null;
  }
}