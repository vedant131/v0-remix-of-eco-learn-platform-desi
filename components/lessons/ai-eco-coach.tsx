"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EcoCharacter } from "@/components/eco-characters"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function AIEcoCoach() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there, eco-hero! I'm your AI Eco-Coach. Ask me anything about the environment, sustainability, or your lessons!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const ecoResponses = [
    "That's a great question! Remember, every small action counts towards helping our planet.",
    "Trees are amazing! They clean our air, provide oxygen, and are home to many animals.",
    "Water conservation is super important. Try taking shorter showers and turning off taps when not needed!",
    "Recycling helps reduce waste! Remember to sort your recyclables properly.",
    "Solar energy is a clean, renewable source of power that comes from the sun!",
    "Composting turns food scraps into nutrient-rich soil for plants. It's like magic!",
    "Biodiversity means having many different types of plants and animals in our ecosystems.",
    "Climate change is when Earth's weather patterns change due to human activities. But we can help by making eco-friendly choices!",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: ecoResponses[Math.floor(Math.random() * ecoResponses.length)],
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg z-40 p-0"
      >
        {isOpen ? "✕" : "🤖"}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 glass border-secondary/20 flex flex-col z-40">
          {/* Header */}
          <div className="p-4 border-b border-border/20 flex items-center gap-3">
            <div className="animate-bounce-gentle">
              <EcoCharacter type="sapling" size="sm" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Eco-Coach</h3>
              <p className="text-xs text-muted-foreground">Your AI learning buddy</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.isBot ? "bg-secondary/20 text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary/20 text-foreground p-3 rounded-xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/20">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me about the environment..."
                className="rounded-xl border-secondary/30 focus:border-secondary focus:ring-secondary/20"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl px-3"
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
