import { useEffect, useRef, useState } from "react"
import { Droplets, Thermometer, Smartphone, ShieldCheck } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

const expertiseAreas = [
  {
    title: "Система биде",
    description: "Тёплая вода с регулировкой давления и температуры. Гигиена без компромиссов — забудьте о бумаге навсегда.",
    icon: Droplets,
  },
  {
    title: "Подогрев сиденья",
    description:
      "Комфортная температура сиденья в любое время года. Особенно оценят те, кто знает, каково встать холодным утром.",
    icon: Thermometer,
  },
  {
    title: "Умное управление",
    description:
      "Пульт ДУ, настройки через приложение, память персональных предпочтений — для каждого члена семьи своя программа.",
    icon: Smartphone,
  },
  {
    title: "Автоочистка и стерилизация",
    description:
      "УФ-стерилизация, автоматическое открытие крышки и самоочищение сопла — санузел всегда идеально чист.",
    icon: ShieldCheck,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Возможности</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Технологии</HighlightedText>, которые
            <br />
            меняют быт
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Каждая функция продумана для реального использования — не гаджет ради гаджета, а решение, которое вы будете ценить каждый день.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} strokeLinecap="round" />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}