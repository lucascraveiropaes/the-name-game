import { POST as endHandler } from "@/app/api/game/end/route";
import { createMockToken } from "@/tests/mocks/session";
import { test, expect } from "vitest";
import { NextRequest } from "next/server";

test("should return game stats", async () => {
  const token = createMockToken({
    attempts: [
      { selectedId: "1", correct: true, duration: 2000 },
      { selectedId: "2", correct: false, duration: 3000 },
    ],
  });

  const req = new Request("http://localhost", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const res = await endHandler(req as unknown as NextRequest);
  const json = await res.json();

  expect(json.score).toBe("1/2");
  expect(json.correctPercentage).toBe(50);
});
