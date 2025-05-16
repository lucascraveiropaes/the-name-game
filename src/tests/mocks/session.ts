import { GameSessionJWT } from "@/types";
import jwt from "jsonwebtoken";
import ENV from "@/env";

export function createMockToken(overrides?: Partial<GameSessionJWT>): string {
  const payload = {
    sessionId: "mock-session",
    createdAt: new Date(),
    mode: "easy",
    targetName: "John Doe",
    options: [
      { id: "1", alt: "John Doe", imageUrl: "", },
      { id: "2", alt: "Jane Smith", imageUrl: "", },
    ],
    attempts: [],
    ...overrides,
  };

  return jwt.sign(payload, ENV.JWT_SECRET!, { expiresIn: "10m" });
}
