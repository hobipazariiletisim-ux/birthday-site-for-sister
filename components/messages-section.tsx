import { Heart } from "lucide-react"

type Message = {
  from: string
  role: string
  text: string
}

const messages: Message[] = [
  {
    from: "Emir",
    role: "Kardeşin",
    text: "Canım ablam, hayatım boyunca yanımda olduğun, beni her zaman koruyup kolladığın için sana minnettarım. Sen sadece ablam değil, en büyük şansımsın. İyi ki doğdun, iyi ki varsın.",
  },
  {
    from: "Öznur",
    role: "En Yakın Arkadaşın",
    text: "Birlikte gülerken de zor günlerde de hep yanımda oldun. Seninle her an çok değerli. Doğum günün kutlu olsun, kalbi güzel insanım. Nice mutlu yıllara.",
  },
  {
    from: "Annemiz",
    role: "Annen",
    text: "Bir tanecik kızım, seni dünyaya getirdiğim gün hayatımın en güzel günüydü. Her geçen yıl seninle daha çok gurur duyuyorum. Allah seni başımızdan eksik etmesin. İyi ki doğdun yavrum.",
  },
  {
    from: "Babamız",
    role: "Baban",
    text: "Prensesim, ne kadar büyürsen büyü sen hep benim küçük kızım olarak kalacaksın. Senin mutluluğun bizim her şeyimiz. Doğum günün kutlu olsun, gözümün nuru.",
  },
]

export function MessagesSection() {
  return (
    <section id="mesajlar" className="mx-auto w-full max-w-5xl px-5 py-16 md:py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Sevdiklerinden
        </p>
        <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
          Sana Küçük Notlar
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {messages.map((m) => (
          <article
            key={m.from}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
          >
            <Heart className="mb-4 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="flex-1 text-pretty leading-relaxed text-card-foreground">
              {m.text}
            </p>
            <div className="mt-6 border-t border-border pt-4">
              <p className="font-serif text-lg font-semibold leading-tight">{m.from}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
