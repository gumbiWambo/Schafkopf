export enum AllowedGames{
  SOLO = 'solo',
  RUF = 'ruf',
  GEIER = 'geier',
  WENZ = 'wenz'
}
export interface MatchConfig {
  name: string;
  allowedGames: AllowedGames[];
  isRanked: boolean;
}