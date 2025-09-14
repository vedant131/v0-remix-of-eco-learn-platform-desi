"use client"

interface EcoCharacterProps {
  type: "sapling" | "droplet" | "recycle"
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function EcoCharacter({ type, size = "md", animated = true }: EcoCharacterProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const animationClass = animated ? "animate-bounce-gentle" : ""

  if (type === "sapling") {
    return (
      <div className={`${sizeClasses[size]} ${animationClass} relative`}>
        {/* Pot */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-amber-600 rounded-b-lg" />
        {/* Stem */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-green-600" />
        {/* Leaves */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1">
          <div className="w-4 h-3 bg-secondary rounded-full transform -rotate-45 -translate-x-2" />
          <div className="w-4 h-3 bg-secondary rounded-full transform rotate-45 translate-x-1 -translate-y-2" />
        </div>
        {/* Face */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-1 bg-foreground rounded-full -translate-x-1" />
          <div className="w-1 h-1 bg-foreground rounded-full translate-x-1 -translate-y-1" />
          <div className="w-2 h-1 bg-foreground/50 rounded-full -translate-y-1" />
        </div>
      </div>
    )
  }

  if (type === "droplet") {
    return (
      <div className={`${sizeClasses[size]} ${animationClass} relative`}>
        {/* Water droplet shape */}
        <div className="w-full h-full bg-primary rounded-full relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-4 bg-primary rounded-t-full" />
          {/* Face */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-1 bg-white rounded-full -translate-x-1" />
            <div className="w-1 h-1 bg-white rounded-full translate-x-1 -translate-y-1" />
            <div className="w-2 h-1 bg-white/70 rounded-full -translate-y-1" />
          </div>
          {/* Shine */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    )
  }

  if (type === "recycle") {
    return (
      <div className={`${sizeClasses[size]} ${animationClass} relative`}>
        {/* Recycle symbol */}
        <div className="w-full h-full relative">
          <svg viewBox="0 0 24 24" className="w-full h-full text-secondary">
            <path
              fill="currentColor"
              d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2M12 4.5L11.5 7.5L8.5 7.5L11.5 7.5L12 4.5M12 10.5L11.5 13.5L8.5 13.5L11.5 13.5L12 10.5Z"
            />
          </svg>
          {/* Face */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1 h-1 bg-foreground rounded-full -translate-x-1 -translate-y-1" />
            <div className="w-1 h-1 bg-foreground rounded-full translate-x-1 -translate-y-2" />
            <div className="w-2 h-1 bg-foreground/50 rounded-full -translate-y-1" />
          </div>
        </div>
      </div>
    )
  }

  return null
}
