"use client";
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation";
import Image from "next/image"

export const Header = () => {
  const router = useRouter();

  return (
    <header className="grid grid-cols-5 justify-center items-center p-4 w-full bg-primary">
      <button className="p-1.5 w-fit rounded-full hover:bg-white/20" onClick={router.back}>
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <Image
        src="/logo-text.png"
        alt="The Game Name Logo"
        width={500}
        height={500}
        className="max-w-[14rem] object-contain mx-auto col-span-3"
        priority
      />
    </header>
  )
}