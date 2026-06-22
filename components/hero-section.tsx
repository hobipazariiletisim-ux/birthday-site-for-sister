export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-24 text-center md:py-36">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          Mutlu Yıllar
        </span>

        <h1 className="font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl md:text-7xl">
          İyi ki Doğdun
          <span className="block text-primary">Canım Ablacığım</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Bu küçük köşeyi sana olan sevgimizle hazırladık. Seni ne kadar çok
          sevdiğimizi ve hayatımızda olmanın bizim için ne demek olduğunu bir
          kez daha hatırlatmak istedik.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#mesajlar"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sana Notlarımız
          </a>
          <a
            href="#quiz"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
          >
            Ablamı Ne Kadar Tanıyoruz?
          </a>
        </div>
      </div>
    </section>
  )
}
