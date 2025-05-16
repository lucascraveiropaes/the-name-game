"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="flex-full-center flex-col gap-12 bg-primary text-white">
      <Image
        src="/icon.svg"
        alt="The Game Name Logo"
        width={500}
        height={500}
        className="!w-[18rem]"
        priority
      />

      <p className="font-light">{t("homepage.heading")}</p>

      <Button as={Link} href="/game" className="w-full max-w-[16rem]">
        {t("homepage.button")}
      </Button>
    </div>
  );
}
