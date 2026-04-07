import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Технологии для комфорта",
    description:
      "Умный унитаз — это не роскошь, а следующий шаг в эволюции жилья. Мы верим, что каждый заслуживает санузла, который работает на вас.",
  },
  {
    title: "Гигиена нового уровня",
    description:
      "Биде с подогревом воды, автоматическая крышка, УФ-стерилизация — не просто удобство, а настоящая забота о здоровье всей семьи.",
  },
  {
    title: "Простота управления",
    description:
      "Интуитивный пульт или управление со смартфона. Персональные настройки для каждого члена семьи — с первого дня использования.",
  },
  {
    title: "Интеграция в интерьер",
    description: "Лаконичный дизайн вписывается в любой стиль ванной комнаты — от скандинавского минимализма до современной классики.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наша философия</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Комфорт с
              <br />
              <HighlightedText>умом</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/bucket/81b1bee2-54a6-4acd-b68b-20393119f73f.jpg"
                alt="Мейшида 611 — умный унитаз с датчиком присутствия"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Умный унитаз — это больше, чем сантехника. Это часть продуманного современного дома, где каждая деталь работает на ваш комфорт и здоровье.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}