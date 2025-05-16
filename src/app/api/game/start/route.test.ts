// test/game/start.test.ts
import { POST as startHandler } from "@/app/api/game/start/route";
import { NextRequest } from "next/server";
import { test, expect } from "vitest";

test("should create session and return JWT token", async () => {
  const req = new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify({ mode: "practice" }),
    headers: { "Content-Type": "application/json" },
  });

  const res = await startHandler(req as unknown as NextRequest);
  const json = await res.json();

  expect(json.sessionId).toBeDefined();
  expect(json.options).toHaveLength(6);
  expect(res.headers.get("set-cookie")).toContain("game-token=");
});
