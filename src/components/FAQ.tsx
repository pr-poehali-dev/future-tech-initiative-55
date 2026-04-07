import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сложно ли установить умный унитаз?",
    answer:
      "Установка занимает 1–2 часа и выполняется нашими сертифицированными мастерами. Никаких скрытых работ, перекладывания труб или ремонта не требуется — подключается к существующей сантехнике.",
  },
  {
    question: "Подходит ли для новой квартиры в новостройке?",
    answer:
      "Идеально подходит. Умный унитаз устанавливается вместо стандартной сантехники — ещё на этапе ремонта это самый удобный момент. Мы проконсультируем по выбору модели с учётом вашего санузла.",
  },
  {
    question: "Нужно ли специальное обслуживание?",
    answer:
      "Плановое обслуживание раз в год, как у любой техники. Самоочищающееся сопло не требует ручной чистки. Фильтры меняются раз в 6–12 месяцев — это просто, как замена картриджа в принтере.",
  },
  {
    question: "Безопасно ли это для детей и пожилых?",
    answer:
      "Да. Температура воды и давление регулируются — можно выставить мягкий режим для детей. Подогретое сиденье и автоматическая крышка удобны для пожилых. Функция ночной подсветки помогает ориентироваться в темноте.",
  },
  {
    question: "Сколько электроэнергии потребляет умный унитаз?",
    answer:
      "В режиме ожидания — около 3–5 Вт, как зарядка телефона. В активном режиме — 400–600 Вт кратковременно. Экономный режим автоматически снижает потребление, если устройством не пользуются.",
  },
  {
    question: "Как выбрать подходящую модель?",
    answer:
      "Оставьте заявку или позвоните нам — мы подберём модель под размер вашего санузла, желаемый функционал и бюджет. Консультация бесплатна, без навязывания и обязательств.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}