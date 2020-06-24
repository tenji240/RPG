// TODO: rename file

export interface PlayerCharacter {
  health: number;
  maxHealth: number;
  damage: number;
  accuracy: number;
  status: boolean;
  xp: number;
  level: number;
  avatar: any;
}

export interface NonPlayerCharacter extends PlayerCharacter {
  readonly: boolean;
}
