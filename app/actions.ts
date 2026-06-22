"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { sql, type Question } from "@/lib/db"

const ADMIN_EMAIL = "emirasafsimsek2577@gmail.com"
const SESSION_COOKIE = "abla_admin"

export async function getQuestions(): Promise<Question[]> {
  const rows = await sql`
    SELECT id, question_text, answer_text, created_at
    FROM questions
    ORDER BY created_at ASC, id ASC
  `
  return rows as Question[]
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value === "1"
}

export async function login(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")

  if (email !== ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return { error: "E-posta veya şifre hatalı." }
  }

  const store = await cookies()
  store.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  revalidatePath("/")
  return {}
}

export async function logout(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  revalidatePath("/")
}

export async function addQuestion(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  if (!(await isAdmin())) {
    return { error: "Bu işlem için giriş yapmalısın." }
  }

  const question = String(formData.get("question_text") ?? "").trim()
  const answer = String(formData.get("answer_text") ?? "").trim()

  if (!question) {
    return { error: "Soru boş olamaz." }
  }

  await sql`
    INSERT INTO questions (question_text, answer_text)
    VALUES (${question}, ${answer || null})
  `
  revalidatePath("/")
  return { success: true }
}

export async function deleteQuestion(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return
  const id = Number(formData.get("id"))
  if (!Number.isFinite(id)) return
  await sql`DELETE FROM questions WHERE id = ${id}`
  revalidatePath("/")
}
