import { JwtPayload } from 'jsonwebtoken';

declare interface GameSessionJWT extends JwtPayload, GameSession { }

declare type GameOption = {
  id: string;
  imageUrl: string;
  alt: string;
};

declare type GameAttempt = {
  selectedId: string;
  correct: boolean;
  duration: number;
};

declare type GameSession = {
  sessionId: string;
  mode: string;
  targetName: string;
  options: GameOption[];
  attempts: GameAttempt[];
  createdAt: Date;
};
