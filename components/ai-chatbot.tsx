"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm Eco-Bot, your friendly environmental learning assistant! I can help you with questions about nature, climate change, pollution, and all things eco-friendly. What would you like to learn about today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response with environmental knowledge
      const response = await generateEcoResponse(input.trim())

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble right now. Please try asking your question again!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateEcoResponse = async (userInput: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const input = userInput.toLowerCase()

    // India-specific environmental responses
    if (input.includes("pollution") || input.includes("air quality")) {
      return "Air pollution is a major concern in India! Cities like Delhi and Mumbai face serious air quality issues. You can help by using public transport, planting trees, and avoiding burning waste. Did you know that a single tree can absorb 22kg of CO2 per year?"
    }

    if (input.includes("water") || input.includes("river")) {
      return "Water conservation is crucial in India! The Ganges, Yamuna, and other rivers face pollution challenges. Simple actions like fixing leaky taps, rainwater harvesting, and not throwing waste in water bodies can make a big difference. Every drop counts!"
    }

    if (input.includes("plastic") || input.includes("waste")) {
      return "India generates about 26,000 tonnes of plastic waste daily! You can help by using reusable bags, avoiding single-use plastics, and participating in clean-up drives. Remember the 3 R's: Reduce, Reuse, Recycle!"
    }

    if (input.includes("climate") || input.includes("global warming")) {
      return "Climate change affects India through extreme weather, monsoon changes, and rising sea levels. You can fight climate change by saving energy, using renewable sources like solar power, and spreading awareness. Small actions create big changes!"
    }

    if (input.includes("forest") || input.includes("tree")) {
      return "India has lost significant forest cover, but we can help! Trees provide oxygen, prevent soil erosion, and support wildlife. You can plant native trees, support afforestation programs, and avoid paper waste. One tree can support 2 people's oxygen needs!"
    }

    if (input.includes("energy") || input.includes("electricity")) {
      return "India is moving towards renewable energy! Solar and wind power are growing fast. You can save energy by using LED bulbs, unplugging devices, and using natural light. Energy conservation helps reduce pollution and saves money too!"
    }

    if (input.includes("animal") || input.includes("wildlife")) {
      return "India has amazing biodiversity with tigers, elephants, and many unique species! Habitat loss threatens wildlife. You can help by supporting conservation efforts, not buying products from endangered animals, and creating wildlife-friendly spaces."
    }

    if (input.includes("food") || input.includes("agriculture")) {
      return "Sustainable farming is important for India's future! Organic farming, reducing food waste, and eating local produce helps the environment. Did you know that food waste contributes to greenhouse gases? Let's not waste food!"
    }

    // General encouraging responses
    const generalResponses = [
      "That's a great question about the environment! Every small action you take helps protect our planet. What specific area would you like to explore more?",
      "I love your curiosity about environmental issues! Learning is the first step to making a positive change. How can I help you learn more?",
      "Environmental protection starts with awareness, and you're already on the right path by asking questions! What would you like to discover next?",
      "Your interest in environmental topics is wonderful! Together, we can learn how to make our planet healthier. What aspect interests you most?",
    ]

    return generalResponses[Math.floor(Math.random() * generalResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg animate-bounce-gentle z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 flex flex-col shadow-2xl z-50 glass">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 animate-pulse-glow" />
              <span className="font-semibold">Eco-Bot</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-secondary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-card-foreground border"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-3 w-3 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-secondary-foreground animate-pulse" />
                  </div>
                  <div className="bg-card text-card-foreground border p-3 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about the environment..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
