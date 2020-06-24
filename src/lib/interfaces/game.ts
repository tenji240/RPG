export enum GameState {
  NAV,
  BATTLE,
  DIALOUGE,
}

export interface TurnState {
  heroDamageDealt: integer;
  enemyDamageDealt: integer;
  heroAccuracy?: integer;
  enemyAccuracy?: integer;
}
