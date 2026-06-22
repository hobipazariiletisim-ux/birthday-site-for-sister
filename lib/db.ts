import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export type Question = {
  id: number
  question_text: string
  answer_text: string | null
  created_at: string
}
