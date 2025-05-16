import { NextRequest, NextResponse } from "next/server";
import { GameSessionJWT } from "@/types";
import { z } from "zod";
import jwt from "jsonwebtoken";
import ENV from "@/env";

export const schema = z.object({
  selectedId: z.string(),
  duration: z.number().positive(),
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = authHeader.replace("Bearer ", "");
  let session: GameSessionJWT;

  try {
    session = jwt.verify(token, ENV.JWT_SECRET!) as GameSessionJWT;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { selectedId, duration } = schema.parse(await req.json());

  const correct = session.options.find((o: any) => `${o.alt}` === session.targetName)?.id === selectedId;

  session.attempts.push({ selectedId, correct, duration });

  const profiles = await fetch(ENV.API_URL + "/profiles").then(res => res.json());
  const selected = profiles.sort(() => 0.5 - Math.random()).slice(0, 6);
  const target = selected[Math.floor(Math.random() * selected.length)];

  session.targetName = `${target.firstName} ${target.lastName}`;
  session.options = selected.map((p: any) => ({
    id: p.id,
    imageUrl: p.headshot.url,
    alt: p.headshot.alt,
  }));

  const { exp, iat, ...cleanSession } = session;
  const newToken = jwt.sign(cleanSession, ENV.JWT_SECRET!, { expiresIn: "10m" });


  return NextResponse.json(
    {
      correct,
      gameOver: false,
      targetName: session.targetName,
      options: session.options,
    },
    {
      headers: {
        "Set-Cookie": `game-token=${newToken}; Path=/; Max-Age=600; SameSite=Lax; Secure`,
      },
    }
  );
}
