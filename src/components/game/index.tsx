"use client";
import { client } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Game() {
  const mutation = useMutation({
    mutationFn: () => client.post("/game/start", { mode: "practice" }),
    onSuccess: (data) => {
      console.log("Game started successfully", data);
    },
  })

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <header className="bg-primary w-full min-h-[4rem]">
      </header>
      <div className="flex-full-center flex-col gap-12 text-primary">
        <h1 className="text-4xl font-bold">Game Page</h1>
        <p className="font-light">This is the game page.</p>
      </div>
    </div>
  );
}