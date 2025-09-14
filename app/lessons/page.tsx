"use client"

import { useState } from "react"
import { LessonCard } from "@/components/lessons/lesson-card"
import { LessonContent } from "@/components/lessons/lesson-content"
import { QuizComponent } from "@/components/lessons/quiz-component"
import { AIEcoCoach } from "@/components/lessons/ai-eco-coach"
import { EcoBackground } from "@/components/eco-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ProgressTracker } from "@/components/lessons/progress-tracker"
import { LessonRecommendations } from "@/components/lessons/lesson-recommendations"

interface Lesson {
  id: string
  title: string
  description: string
  icon: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  completed: boolean
  locked: boolean
  category: "basics" | "advanced" | "action"
}

const sampleLessons: Lesson[] = [
  {
    id: "1",
    title: "What is Climate Change?",
    description: "Learn about climate change and how it affects our planet",
    icon: "🌡️",
    duration: "10 min",
    difficulty: "Beginner",
    progress: 100,
    completed: true,
    locked: false,
    category: "basics",
  },
  {
    id: "2",
    title: "The Water Cycle",
    description: "Discover how water moves through our environment",
    icon: "💧",
    duration: "8 min",
    difficulty: "Beginner",
    progress: 60,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "3",
    title: "Renewable Energy",
    description: "Explore clean energy sources like solar and wind power",
    icon: "⚡",
    duration: "12 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "advanced",
  },
  {
    id: "4",
    title: "Biodiversity & Ecosystems",
    description: "Understanding the variety of life on Earth",
    icon: "🦋",
    duration: "15 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    locked: true,
    category: "advanced",
  },
  {
    id: "5",
    title: "Reduce, Reuse, Recycle",
    description: "Learn the 3 R's of environmental protection",
    icon: "♻️",
    duration: "6 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "6",
    title: "Sustainable Living",
    description: "How to live in harmony with nature",
    icon: "🏡",
    duration: "20 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: true,
    category: "action",
  },
  {
    id: "7",
    title: "Ocean Conservation",
    description: "Protecting our seas and marine life from pollution",
    icon: "🌊",
    duration: "14 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "8",
    title: "Forest Ecosystems",
    description: "Understanding how forests support life on Earth",
    icon: "🌲",
    duration: "16 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "9",
    title: "Carbon Footprint",
    description: "Learn how your daily choices impact the environment",
    icon: "👣",
    duration: "11 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "advanced",
  },
  {
    id: "10",
    title: "Green Transportation",
    description: "Eco-friendly ways to travel and reduce emissions",
    icon: "🚲",
    duration: "9 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "11",
    title: "Wildlife Protection",
    description: "How to help endangered species and protect habitats",
    icon: "🐾",
    duration: "18 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "12",
    title: "Monsoon & Water Conservation",
    description: "Learn about India's monsoon season and traditional water harvesting methods",
    icon: "🌧️",
    duration: "12 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "13",
    title: "Sacred Groves & Biodiversity",
    description: "Discover how India's sacred groves protect unique ecosystems and wildlife",
    icon: "🕉️",
    duration: "15 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "advanced",
  },
  {
    id: "14",
    title: "Ganges River Restoration",
    description: "Understanding the challenges and solutions for cleaning India's sacred river",
    icon: "🏞️",
    duration: "18 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "15",
    title: "Traditional Indian Farming",
    description: "Explore sustainable farming practices used in India for thousands of years",
    icon: "🌾",
    duration: "14 min",
    difficulty: "Beginner",
    progress: 0,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "16",
    title: "Urban Air Quality in Indian Cities",
    description: "Learn about air pollution challenges in Indian cities and solutions",
    icon: "🏙️",
    duration: "16 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "17",
    title: "Himalayan Glaciers & Climate Impact",
    description: "Understand how melting Himalayan glaciers affect India's water security and climate",
    icon: "🏔️",
    duration: "17 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    locked: false,
    category: "advanced",
  },
  {
    id: "18",
    title: "Plastic Pollution in Indian Rivers",
    description: "Learn about plastic waste crisis in India's rivers and coastal areas",
    icon: "🥤",
    duration: "13 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "basics",
  },
  {
    id: "19",
    title: "India's Renewable Energy Revolution",
    description: "Discover India's solar and wind energy initiatives transforming the nation",
    icon: "☀️",
    duration: "15 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "advanced",
  },
  {
    id: "20",
    title: "Protecting India's Tigers & Wildlife",
    description: "Learn about conservation efforts for India's endangered species and national parks",
    icon: "🐅",
    duration: "19 min",
    difficulty: "Advanced",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
  {
    id: "21",
    title: "Sustainable Cities: Smart India Mission",
    description: "Explore how Indian cities are becoming more sustainable and eco-friendly",
    icon: "🏙️",
    duration: "14 min",
    difficulty: "Intermediate",
    progress: 0,
    completed: false,
    locked: false,
    category: "action",
  },
]

const sampleQuizQuestions = [
  {
    id: 1,
    question: "What is the main cause of climate change?",
    options: [
      "Natural weather patterns",
      "Greenhouse gas emissions from human activities",
      "Solar radiation changes",
      "Ocean currents",
    ],
    correctAnswer: 1,
    explanation:
      "Human activities like burning fossil fuels release greenhouse gases that trap heat in our atmosphere.",
  },
  {
    id: 2,
    question: "Which of these is a renewable energy source?",
    options: ["Coal", "Oil", "Solar power", "Natural gas"],
    correctAnswer: 2,
    explanation: "Solar power comes from the sun and will never run out, making it a renewable energy source!",
  },
  {
    id: 3,
    question: "What does the 'R' in the 3 R's stand for?",
    options: ["Reduce, Reuse, Recycle", "Read, Run, Rest", "Red, Round, Rough", "Rain, River, Rock"],
    correctAnswer: 0,
    explanation: "The 3 R's are Reduce (use less), Reuse (use again), and Recycle (make into something new)!",
  },
  {
    id: 4,
    question: "When does the monsoon season typically occur in India?",
    options: ["December to February", "March to May", "June to September", "October to November"],
    correctAnswer: 2,
    explanation:
      "The monsoon season in India typically occurs from June to September, bringing vital rainfall for agriculture and water resources.",
  },
  {
    id: 5,
    question: "What are sacred groves in India?",
    options: [
      "Modern parks in cities",
      "Traditional forest patches protected by local communities",
      "Government wildlife reserves",
      "Tourist destinations",
    ],
    correctAnswer: 1,
    explanation:
      "Sacred groves are traditional forest patches protected by local communities for religious and cultural reasons, preserving unique biodiversity.",
  },
  {
    id: 6,
    question: "Which river is considered the most sacred in India?",
    options: ["Yamuna", "Narmada", "Ganges", "Godavari"],
    correctAnswer: 2,
    explanation:
      "The Ganges River is considered the most sacred river in India and is worshipped as a goddess by millions of people.",
  },
  {
    id: 7,
    question: "What is crop rotation in traditional Indian farming?",
    options: [
      "Growing the same crop every season",
      "Growing different crops in sequence on the same land",
      "Moving crops to different locations",
      "Harvesting crops at different times",
    ],
    correctAnswer: 1,
    explanation:
      "Crop rotation involves growing different crops in sequence on the same land to maintain soil fertility and reduce pests naturally.",
  },
  {
    id: 8,
    question: "What is the main cause of air pollution in Indian cities?",
    options: ["Natural dust storms", "Vehicle emissions and industrial activities", "Ocean winds", "Forest fires only"],
    correctAnswer: 1,
    explanation:
      "Vehicle emissions, industrial activities, and burning of fossil fuels are the main causes of air pollution in Indian cities.",
  },
  {
    id: 9,
    question: "Why are Himalayan glaciers important for India?",
    options: [
      "They provide tourism revenue",
      "They are the source of major Indian rivers",
      "They control the weather",
      "They prevent earthquakes",
    ],
    correctAnswer: 1,
    explanation:
      "Himalayan glaciers are the source of major Indian rivers like Ganges, Yamuna, and Brahmaputra, providing water to millions of people.",
  },
  {
    id: 10,
    question: "What is the biggest source of plastic pollution in Indian rivers?",
    options: ["Industrial waste", "Single-use plastics and packaging", "Agricultural runoff", "Natural disasters"],
    correctAnswer: 1,
    explanation:
      "Single-use plastics like bottles, bags, and food packaging are the biggest contributors to plastic pollution in Indian rivers.",
  },
  {
    id: 11,
    question: "Which state in India leads in solar energy production?",
    options: ["Maharashtra", "Tamil Nadu", "Rajasthan", "Gujarat"],
    correctAnswer: 2,
    explanation:
      "Rajasthan leads India in solar energy production due to its abundant sunshine and large solar parks like Bhadla Solar Park.",
  },
  {
    id: 12,
    question: "How many tigers are estimated to live in India currently?",
    options: ["Around 1,000", "Around 2,000", "Around 3,000", "Around 4,000"],
    correctAnswer: 2,
    explanation:
      "India is home to approximately 3,000 tigers, which is about 70% of the world's tiger population, thanks to conservation efforts.",
  },
  {
    id: 13,
    question: "What is the Smart Cities Mission in India focused on?",
    options: [
      "Building more shopping malls",
      "Creating sustainable and technology-enabled urban areas",
      "Increasing car ownership",
      "Building more factories",
    ],
    correctAnswer: 1,
    explanation:
      "The Smart Cities Mission focuses on creating sustainable, technology-enabled urban areas with better infrastructure, waste management, and quality of life.",
  },
]

export default function LessonsPage() {
  const [lessons, setLessons] = useState(sampleLessons)
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizResults, setQuizResults] = useState<{ score: number; total: number } | null>(null)

  const handleStartLesson = (lessonId: string) => {
    setActiveLesson(lessonId)
  }

  const handleCompleteLesson = () => {
    if (activeLesson) {
      setLessons((prev) =>
        prev.map((lesson) => (lesson.id === activeLesson ? { ...lesson, completed: true, progress: 100 } : lesson)),
      )
    }
    setActiveLesson(null)
    setShowQuiz(true)
  }

  const handleQuizComplete = (score: number) => {
    setQuizResults({ score, total: sampleQuizQuestions.length })
    setShowQuiz(false)
  }

  const closeQuizResults = () => {
    setQuizResults(null)
  }

  const basicLessons = lessons.filter((l) => l.category === "basics")
  const advancedLessons = lessons.filter((l) => l.category === "advanced")
  const actionLessons = lessons.filter((l) => l.category === "action")

  const completedCount = lessons.filter((l) => l.completed).length
  const totalLessons = lessons.length

  const currentLesson = lessons.find((l) => l.id === activeLesson)

  const lessonSections = [
    {
      id: 1,
      title: "Introduction",
      content: `Welcome to this exciting lesson about our environment!\n\nIn this lesson, you'll discover amazing facts about our planet and learn how you can help protect it. We'll explore both global environmental issues and specific challenges and solutions from India.\n\nEvery small action you take makes a big difference! Let's start this eco-adventure together! 🌱`,
      illustration: "🌍",
    },
    {
      id: 2,
      title: "Key Concepts",
      content: `Here are the important things to remember:\n\n• Our planet is home to millions of different species\n• Clean air and water are essential for all life\n• Traditional knowledge and modern science can work together\n• India has unique environmental challenges and solutions\n• Every person can make a positive impact\n\nThese concepts will help you understand how everything in nature is connected! 🔗`,
      illustration: "🧠",
    },
    {
      id: 3,
      title: "Take Action",
      content: `Now that you've learned the basics, here's how you can help:\n\n• Conserve water during monsoon and dry seasons\n• Support local and traditional farming practices\n• Use public transport or cycle to reduce air pollution\n• Participate in river and community cleanup drives\n• Plant native trees and protect local ecosystems\n• Share what you've learned with friends and family\n\nRemember: You're never too young to be an environmental hero! 🦸‍♀️`,
      illustration: "🌟",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <EcoBackground />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">📚 Eco Lessons</h1>
            <p className="text-muted-foreground">Learn about our environment through interactive lessons!</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <section className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <ProgressTracker
                completedLessons={completedCount}
                totalLessons={totalLessons}
                knowledgePoints={completedCount * 25}
                currentLevel={completedCount < 2 ? "Beginner" : completedCount < 4 ? "Explorer" : "Expert"}
                streakDays={Math.min(completedCount * 2, 14)}
              />
            </div>

            <div className="lg:col-span-2">
              <LessonRecommendations
                lessons={lessons.filter((l) => !l.completed && !l.locked)}
                onStartLesson={handleStartLesson}
              />
            </div>
          </section>

          {/* Lesson Categories */}
          <section>
            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="action">Take Action</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Environmental Basics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {basicLessons.map((lesson) => (
                    <LessonCard key={lesson.id} {...lesson} onStart={handleStartLesson} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Advanced Topics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {advancedLessons.map((lesson) => (
                    <LessonCard key={lesson.id} {...lesson} onStart={handleStartLesson} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="action" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Take Action</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {actionLessons.map((lesson) => (
                    <LessonCard key={lesson.id} {...lesson} onStart={handleStartLesson} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {/* Lesson Content Modal */}
      {activeLesson && currentLesson && (
        <LessonContent
          lessonId={activeLesson}
          title={currentLesson.title}
          sections={lessonSections}
          onComplete={handleCompleteLesson}
          onClose={() => setActiveLesson(null)}
        />
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizComponent
          questions={sampleQuizQuestions}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {/* Quiz Results Modal */}
      {quizResults && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-8 glass border-primary/20 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground mb-4">Great job on completing the lesson!</p>
            <div className="text-3xl font-bold text-primary mb-6">
              {quizResults.score}/{quizResults.total} Correct
            </div>
            <Button
              onClick={closeQuizResults}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold"
            >
              Continue Learning!
            </Button>
          </Card>
        </div>
      )}

      {/* AI Eco-Coach */}
      <AIEcoCoach />
    </div>
  )
}
