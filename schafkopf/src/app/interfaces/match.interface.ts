import { AllowedGames } from "./match-config.interface";

export interface Match {
  id: string;
  name: string;
  allowedGames: AllowedGames[];
  isRanked: boolean;
  joinedPlayers: number;
}