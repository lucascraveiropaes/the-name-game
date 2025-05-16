import { POST as attemptHandler } from "@/app/api/game/attempt/route";
import { test, expect, vi } from "vitest";
import { createMockToken } from "@/tests/mocks/session";
import { NextRequest } from "next/server";

vi.stubGlobal("fetch", vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: "1", firstName: "John", lastName: "Doe", headshot: { url: "", alt: "John Doe" } },
      ]),
  })
));

test("correct answer should continue game", async () => {
  const token = createMockToken();
  const req = new Request("http://localhost", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedId: "1", duration: 300 }),
  });

  const res = await attemptHandler(req as unknown as NextRequest);
  const json = await res.json();

  expect(json.correct).toBe(true);
  expect(json.gameOver).toBe(false);
});
