"use client"

import { useState } from "react"
import { Eye, EyeOff, HelpCircle } from "lucide-react"
import type { Question } from "@/lib/db"
import { Input } from "@/components/ui/input"

function QuizCard({ q, index }: { q: Question; index: number }) {
  const [answer, setAnswer] = useState("")
  const [revealed, setRevealed] = useState(false)

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-7">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
          aria-hidden="true"
        >
          {index + 1}
        </span>
        <h3 className="text-pretty text-lg font-medium leading-snug">
          {q.question_text}
        </h3>
      </div>

      <div className="mt-5 pl-10">
        <label htmlFor={`answer-${q.id}`} className="sr-only">
          Cevabın
        </label>
        <Input
          id={`answer-${q.id}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Senin tahminin..."
          className="bg-background"
        />

        {q.answer_text ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              {revealed ? (
                <>
                  <EyeOff className="h-4 w-4" aria-hidden="true" /> Cevabı gizle
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" aria-hidden="true" /> Doğru cevabı gör
                </>
              )}
            </button>
            {revealed && (
              <p className="mt-2 rounded-lg bg-accent px-4 py-3 text-sm leading-relaxed text-accent-foreground">
                {q.answer_text}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function QuizSection({ questions }: { questions: Question[] }) {
  return (
    <section id="quiz" className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Minik Test
        </p>
        <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
          Ablamı Ne Kadar Tanıyoruz?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Aşağıdaki soruları cevapla, bakalım onu ne kadar iyi tanıyorsun.
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <HelpCircle className="mb-3 h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-muted-foreground">
            Henüz soru eklenmemiş. Çok yakında burada sorular olacak.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {questions.map((q, i) => (
            <QuizCard key={q.id} q={q} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
