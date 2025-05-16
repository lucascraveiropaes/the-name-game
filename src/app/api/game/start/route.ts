import { NextRequest, NextResponse } from "next/server";
import { getRandomProfiles } from "@/lib/utils";
import { GameAttempt, GameSessionJWT } from "@/types";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import ENV from "@/env";

export async function POST(req: NextRequest) {
  const [{ selected, target }, { mode }] = await Promise.all([
    getRandomProfiles(),
    req.json(),
  ]);

  const session: GameSessionJWT = {
    sessionId: uuidv4(),
    createdAt: new Date(),
    mode: mode,
    targetName: `${target.firstName} ${target.lastName}`,
    attempts: [],
    options: selected.map((p: any) => ({
      id: p.id,
      imageUrl: p.headshot.url,
      alt: p.headshot.alt,
    })),
  };

  const token = jwt.sign(session, ENV.JWT_SECRET!, { expiresIn: "10m" });

  return NextResponse.json(session, {
    headers: {
      "Set-Cookie": `game-token=${token}; Path=/; Max-Age=600; SameSite=Lax; Secure`,
    },
  });
}
