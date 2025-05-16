import Image from "next/image";
import { Button } from "@/components/button";
import { client } from "@/lib/axios";
import Link from "next/link";

export default function HomePage() {
  const onClick = () => fetch("/api/game/start", {
    method: "POST",
    body: JSON.stringify({ mode: "easy" }),
    headers: {
      "Content-Type": "application/json",
    },
  })


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

      <p className="font-light">Try matching the WillowTree employee to their photo.</p>

      <Button as={Link} href="/game" className="w-full max-w-[16rem]">
        Play!
      </Button>
    </div>
  );
}