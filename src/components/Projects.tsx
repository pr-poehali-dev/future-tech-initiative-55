import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Мейшида 611",
    category: "Флагманская модель",
    location: "Биде · Подогрев · Стерилизация",
    year: "Хит",
    images: [
      "https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/bucket/90015c03-0f60-4086-8bf6-15ff66f6331e.png",
      "https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/bucket/37bed4c8-7061-400f-b1fc-328481b782ef.jpg",
    ],
  },
  {
    id: 2,
    title: "SmartSpa Elite",
    category: "Премиум серия",
    location: "Аэромассаж · Ароматизация · Музыка",
    year: "Новинка",
    images: [
      "https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/files/3efb5251-01fc-41f3-bdb8-e0e3b950cc49.jpg",
    ],
  },
  {
    id: 3,
    title: "EcoSmart Compact",
    category: "Базовая серия",
    location: "Биде · Подогрев · Экономия воды",
    year: "Старт",
    images: [
      "https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/files/9acc0a57-c72f-4da4-8624-a0df6991bfb2.jpg",
    ],
  },
  {
    id: 4,
    title: "TechPanel Control",
    category: "Аксессуар",
    location: "Пульт · Приложение · Голос",
    year: "2025",
    images: [
      "https://cdn.poehali.dev/projects/eb1e733a-fb65-4aca-b4c3-d2e5d5a1f4e8/files/4b85cef9-1333-473f-bdd2-71657989733b.jpg",
    ],
  },
]

function ProjectCard({ project, index, revealedImages, imageRefs }: {
  project: typeof projects[0]
  index: number
  revealedImages: Set<number>
  imageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}) {
  const [activeImage, setActiveImage] = useState(0)
  const hasMultiple = project.images.length > 1

  return (
    <article className="group cursor-pointer">
      <div
        ref={(el) => (imageRefs.current[index] = el)}
        className="relative overflow-hidden aspect-[4/3] mb-6"
      >
        {project.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${project.title} — фото ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              activeImage === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        ))}

        <div
          className="absolute inset-0 bg-primary origin-top pointer-events-none"
          style={{
            transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
            transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        />

        {hasMultiple && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-6 h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              onClick={() => setActiveImage((prev) => (prev - 1 + project.images.length) % project.images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveImage((prev) => (prev + 1) % project.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
          <p className="text-muted-foreground text-sm">
            {project.category} · {project.location}
          </p>
        </div>
        <span className="text-muted-foreground/60 text-sm">{project.year}</span>
      </div>
    </article>
  )
}

export function Projects() {
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши модели</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Линейка продуктов</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Узнать цены
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              revealedImages={revealedImages}
              imageRefs={imageRefs}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
