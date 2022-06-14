export enum AllowedGames{
  SOLO = 'solo',
  RUF = 'ruf',
  GEIER = 'geier',
  WENZ = 'wenz'
}
export interface Match {
  name: string;
  allowedGames: AllowedGames[];
  isRanked: boolean
}