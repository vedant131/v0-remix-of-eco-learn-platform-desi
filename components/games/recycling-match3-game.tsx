"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GamePiece {
  id: number
  type: "plastic" | "glass" | "paper" | "metal" | "organic"
  emoji: string
  row: number
  col: number
}

const pieceTypes = [
  { type: "plastic" as const, emoji: "🥤" },
  { type: "glass" as const, emoji: "🍼" },
  { type: "paper" as const, emoji: "📰" },
  { type: "metal" as const, emoji: "🥫" },
  { type: "organic" as const, emoji: "🍎" },
]

interface RecyclingMatch3GameProps {
  onComplete: (score: number) => void
  onClose: () => void
}

export function RecyclingMatch3Game({ onComplete, onClose }: RecyclingMatch3GameProps) {
  const [board, setBoard] = useState<GamePiece[][]>([])
  const [score, setScore] = useState(0)
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null)
  const [matches, setMatches] = useState<{ row: number; col: number }[]>([])
  const [gameMessage, setGameMessage] = useState("Match 3 or more recyclables to clear them!")
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)

  // Initialize board
  useEffect(() => {
    const newBoard: GamePiece[][] = []
    let id = 0

    for (let row = 0; row < 8; row++) {
      newBoard[row] = []
      for (let col = 0; col < 8; col++) {
        const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
        newBoard[row][col] = {
          id: id++,
          type: randomType.type,
          emoji: randomType.emoji,
          row,
          col,
        }
      }
    }
    setBoard(newBoard)
  }, [])

  // Game timer
  useEffect(() => {
    if (!gameStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameMessage(`Time's up! Final score: ${score}`)
          setTimeout(() => onComplete(score), 2000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, timeLeft, score, onComplete])

  // Check for matches
  const checkMatches = (currentBoard: GamePiece[][]) => {
    const newMatches: { row: number; col: number }[] = []

    // Check horizontal matches
    for (let row = 0; row < 8; row++) {
      let count = 1
      let currentType = currentBoard[row][0].type

      for (let col = 1; col < 8; col++) {
        if (currentBoard[row][col].type === currentType) {
          count++
        } else {
          if (count >= 3) {
            for (let i = col - count; i < col; i++) {
              newMatches.push({ row, col: i })
            }
          }
          count = 1
          currentType = currentBoard[row][col].type
        }
      }

      if (count >= 3) {
        for (let i = 8 - count; i < 8; i++) {
          newMatches.push({ row, col: i })
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < 8; col++) {
      let count = 1
      let currentType = currentBoard[0][col].type

      for (let row = 1; row < 8; row++) {
        if (currentBoard[row][col].type === currentType) {
          count++
        } else {
          if (count >= 3) {
            for (let i = row - count; i < row; i++) {
              newMatches.push({ row: i, col })
            }
          }
          count = 1
          currentType = currentBoard[row][col].type
        }
      }

      if (count >= 3) {
        for (let i = 8 - count; i < 8; i++) {
          newMatches.push({ row: i, col })
        }
      }
    }

    return newMatches
  }

  // Handle piece selection and swapping
  const handlePieceClick = (row: number, col: number) => {
    if (!gameStarted) return

    if (!selectedPiece) {
      setSelectedPiece({ row, col })
      return
    }

    // Check if pieces are adjacent
    const rowDiff = Math.abs(selectedPiece.row - row)
    const colDiff = Math.abs(selectedPiece.col - col)

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Swap pieces
      const newBoard = board.map((r) => [...r])
      const temp = newBoard[selectedPiece.row][selectedPiece.col]
      newBoard[selectedPiece.row][selectedPiece.col] = newBoard[row][col]
      newBoard[row][col] = temp

      // Update positions
      newBoard[selectedPiece.row][selectedPiece.col].row = selectedPiece.row
      newBoard[selectedPiece.row][selectedPiece.col].col = selectedPiece.col
      newBoard[row][col].row = row
      newBoard[row][col].col = col

      // Check for matches
      const foundMatches = checkMatches(newBoard)

      if (foundMatches.length > 0) {
        setBoard(newBoard)
        setMatches(foundMatches)
        setScore((prev) => prev + foundMatches.length * 10)
        setGameMessage(`Great match! +${foundMatches.length * 10} points! 🌟`)

        // Remove matches and drop pieces after a delay
        setTimeout(() => {
          removeMatches(newBoard, foundMatches)
        }, 1000)
      } else {
        // No matches, swap back
        setGameMessage("No matches found! Try again.")
      }
    }

    setSelectedPiece(null)
  }

  // Remove matched pieces and drop remaining ones
  const removeMatches = (currentBoard: GamePiece[][], matchesToRemove: { row: number; col: number }[]) => {
    const newBoard = currentBoard.map((r) => [...r])

    // Mark matched pieces for removal
    matchesToRemove.forEach(({ row, col }) => {
      // Replace with new random piece from top
      const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
      newBoard[row][col] = {
        id: Date.now() + Math.random(),
        type: randomType.type,
        emoji: randomType.emoji,
        row,
        col,
      }
    })

    setBoard(newBoard)
    setMatches([])

    // Check for new matches after dropping
    setTimeout(() => {
      const newMatches = checkMatches(newBoard)
      if (newMatches.length > 0) {
        setMatches(newMatches)
        setScore((prev) => prev + newMatches.length * 10)
        setTimeout(() => removeMatches(newBoard, newMatches), 1000)
      }
    }, 500)
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setScore(0)
    setGameMessage("Match 3 or more recyclables to clear them!")
  }

  const isMatched = (row: number, col: number) => {
    return matches.some((match) => match.row === row && match.col === col)
  }

  const isSelected = (row: number, col: number) => {
    return selectedPiece?.row === row && selectedPiece?.col === col
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl p-8 glass border-accent/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Recycling Match-3</h2>
          <p className="text-muted-foreground">Match 3 or more recyclables to clear them!</p>
          <div className="mt-4 flex justify-center gap-8">
            <span className="text-xl font-bold text-accent">Score: {score}</span>
            <span className="text-xl font-bold text-primary">Time: {timeLeft}s</span>
          </div>
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <div className="text-6xl mb-4">♻️</div>
            <p className="text-lg text-muted-foreground mb-6">
              Swap adjacent pieces to create matches of 3 or more identical recyclables!
            </p>
            <Button
              onClick={startGame}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-8 py-3 font-semibold"
            >
              Start Game
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-center text-lg font-semibold text-foreground animate-pulse">{gameMessage}</p>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-8 gap-1 max-w-md mx-auto mb-6 bg-background/20 p-4 rounded-xl">
              {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handlePieceClick(rowIndex, colIndex)}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all duration-200
                      ${isSelected(rowIndex, colIndex) ? "bg-primary/50 scale-110" : "bg-background/50 hover:bg-background/70"}
                      ${isMatched(rowIndex, colIndex) ? "animate-pulse bg-accent/50" : ""}
                      hover:scale-105
                    `}
                  >
                    {piece.emoji}
                  </button>
                )),
              )}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 mb-6 text-sm">
              {pieceTypes.map((type) => (
                <div key={type.type} className="flex items-center gap-1">
                  <span>{type.emoji}</span>
                  <span className="text-muted-foreground capitalize">{type.type}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center">
          <Button onClick={onClose} variant="outline" className="border-border hover:bg-muted bg-transparent">
            Close Game
          </Button>
        </div>
      </Card>
    </div>
  )
}
