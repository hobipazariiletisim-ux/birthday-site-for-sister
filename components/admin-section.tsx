"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Lock, Plus, Trash2, LogOut } from "lucide-react"
import { login, addQuestion, logout, deleteQuestion } from "@/app/actions"
import type { Question } from "@/lib/db"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="emirasafsimsek2577@gmail.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Şifre</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  )
}

function AddQuestionForm() {
  const [state, formAction, pending] = useActionState(addQuestion, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="question_text">Soru</Label>
        <Input
          id="question_text"
          name="question_text"
          placeholder="Ör: Ablamızın en sevdiği yemek nedir?"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="answer_text">Doğru cevap (isteğe bağlı)</Label>
        <Textarea
          id="answer_text"
          name="answer_text"
          placeholder="Cevabı yazarsan ziyaretçiler 'doğru cevabı gör' ile görebilir."
          rows={2}
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-primary">Soru eklendi.</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        {pending ? "Ekleniyor..." : "Soru Ekle"}
      </button>
    </form>
  )
}

export function AdminSection({
  isAdmin,
  questions,
}: {
  isAdmin: boolean
  questions: Question[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        {!isAdmin ? (
          <>
            {!open ? (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  Yönetici Girişi
                </button>
              </div>
            ) : (
              <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <h2 className="mb-1 font-serif text-xl font-semibold">
                  Yönetici Girişi
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  Soru ekleyebilmek için giriş yap.
                </p>
                <LoginForm />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold">Yönetici Paneli</h2>
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Çıkış
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h3 className="mb-5 text-lg font-medium">Yeni Soru Ekle</h3>
              <AddQuestionForm />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h3 className="mb-5 text-lg font-medium">
                Mevcut Sorular ({questions.length})
              </h3>
              {questions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Henüz soru yok.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {questions.map((q) => (
                    <li
                      key={q.id}
                      className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium leading-snug">{q.question_text}</p>
                        {q.answer_text ? (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Cevap: {q.answer_text}
                          </p>
                        ) : null}
                      </div>
                      <form action={deleteQuestion}>
                        <input type="hidden" name="id" value={q.id} />
                        <button
                          type="submit"
                          aria-label="Soruyu sil"
                          className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
