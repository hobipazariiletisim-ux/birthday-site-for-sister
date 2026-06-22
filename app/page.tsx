import { HeroSection } from "@/components/hero-section"
import { MessagesSection } from "@/components/messages-section"
import { QuizSection } from "@/components/quiz-section"
import { AdminSection } from "@/components/admin-section"
import { getQuestions, isAdmin } from "@/app/actions"

export const dynamic = "force-dynamic"

export default async function Page() {
  const [questions, admin] = await Promise.all([getQuestions(), isAdmin()])

  return (
    <main className="min-h-dvh bg-background">
      <HeroSection />
      <MessagesSection />
      <QuizSection questions={questions} />
      <AdminSection isAdmin={admin} questions={questions} />
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Sevgiyle hazırlandı · Canım ablamıza
        </p>
      </footer>
    </main>
  )
}
