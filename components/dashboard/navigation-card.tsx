"use client"

import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"
import Link from "next/link"

interface NavigationCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  color: "primary" | "secondary" | "accent"
  stats?: string
}

export function NavigationCard({ title, description, icon, href, color, stats }: NavigationCardProps) {
  const colorClasses = {
    primary: "border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10",
    secondary: "border-secondary/20 hover:border-secondary/40 bg-secondary/5 hover:bg-secondary/10",
    accent: "border-accent/20 hover:border-accent/40 bg-accent/5 hover:bg-accent/10",
  }

  const iconBgClasses = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    accent: "bg-accent/20 text-accent",
  }

  return (
    <Link href={href}>
      <Card
        className={`p-6 glass hover:scale-105 transition-all duration-300 cursor-pointer group ${colorClasses[color]}`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:animate-bounce-gentle ${iconBgClasses[color]}`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              {stats && (
                <span className="text-sm font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                  {stats}
                </span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
