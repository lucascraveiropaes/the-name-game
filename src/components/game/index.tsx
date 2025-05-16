"use client";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { client } from "@/lib/axios";
import { Header } from "@/components/game/header";

export default function Game() {
  const t = useTranslations();
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
      <Header />
      <div className="flex-full-center flex-col gap-12 text-primary">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
      </div>
    </div>
  );
}