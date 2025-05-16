import { NextRequest, NextResponse } from "next/server";
import { differenceInSeconds } from "date-fns";
import { GameSessionJWT } from "@/types";
import jwt from "jsonwebtoken";
import ENV from "@/env";

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

  const total = session.attempts.length;
  const correct = session.attempts.filter((h: any) => h.correct).length;
  const incorrect = total - correct;
  const avgTime = session.attempts.reduce((acc: number, h: any) => acc + h.duration, 0) / total;

  return NextResponse.json({
    sessionId: session.sessionId,
    createdAt: session.createdAt,
    score: `${correct}/${total}`,
    correctPercentage: Math.round((correct / total) * 100),
    incorrectPercentage: Math.round((incorrect / total) * 100),
    avgTime: Number(avgTime.toFixed(1)),
  });
}
