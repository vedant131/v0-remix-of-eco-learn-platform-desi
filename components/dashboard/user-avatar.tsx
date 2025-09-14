"use client"

import { useEffect, useState } from "react"
import { EcoCharacter } from "@/components/eco-characters"

export function UserAvatar() {
  const [avatar, setAvatar] = useState<"sapling" | "droplet" | "recycle">("sapling")

  useEffect(() => {
    const savedAvatar = localStorage.getItem("ecolearn-avatar")
    if (savedAvatar && ["sapling", "droplet", "recycle"].includes(savedAvatar)) {
      setAvatar(savedAvatar as "sapling" | "droplet" | "recycle")
    }
  }, [])

  return (
    <div className="flex items-center justify-center">
      <EcoCharacter type={avatar} size="lg" animated />
    </div>
  )
}
