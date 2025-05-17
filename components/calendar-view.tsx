"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

interface CalendarEvent {
  id: number
  title: string
  date: Date
  icon: LucideIcon
  color: string
}

interface CalendarViewProps {
  month: Date
  events: CalendarEvent[]
}

export default function CalendarView({ month, events }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Obtener el primer día del mes y el número de días
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
  const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Obtener el día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Nombres de los meses en español
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Nombres de los días de la semana en español (abreviados)
  const dayNames = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]

  // Crear un array con los días del mes
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Función para verificar si un día tiene eventos
  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      return (
        event.date.getDate() === day &&
        event.date.getMonth() === month.getMonth() &&
        event.date.getFullYear() === month.getFullYear()
      )
    })
  }

  // Función para manejar el clic en un día
  const handleDayClick = (day: number) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), day)
    setSelectedDate((prevDate) => (prevDate && prevDate.getTime() === newDate.getTime() ? null : newDate))
  }

  return (
    <div className="space-y-2">
      <div className="text-center font-medium text-[#0A3B32]">
        {monthNames[month.getMonth()]} {month.getFullYear()}
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        {dayNames.map((day, index) => (
          <div key={index} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {/* Espacios vacíos para alinear el primer día */}
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="h-9"></div>
        ))}

        {/* Días del mes */}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const hasEvents = dayEvents.length > 0
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month.getMonth() &&
            selectedDate.getFullYear() === month.getFullYear()

          return (
            <motion.div
              key={day}
              className={`relative h-9 flex items-center justify-center rounded-full cursor-pointer
                ${isSelected ? "bg-[#0A3B32] text-white" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDayClick(day)}
            >
              {/* Día con eventos - más llamativo */}
              {hasEvents && !isSelected ? (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${dayEvents[0].color}30` }}
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${dayEvents[0].color}80`,
                      `0 0 8px 0 ${dayEvents[0].color}40`,
                      `0 0 0 0 ${dayEvents[0].color}80`,
                    ],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                />
              ) : null}

              {/* Número del día */}
              <span className={`z-10 ${hasEvents && !isSelected ? "font-bold" : ""}`}>{day}</span>

              {/* Indicador de evento */}
              {hasEvents && !isSelected && (
                <div className="absolute bottom-0.5 flex justify-center space-x-0.5">
                  {dayEvents.slice(0, Math.min(dayEvents.length, 3)).map((event, idx) => (
                    <motion.span
                      key={idx}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: event.color }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: idx * 0.3 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Mostrar eventos del día seleccionado */}
      {selectedDate && (
        <div className="mt-3 space-y-2">
          <div className="text-sm font-medium text-[#0A3B32]">
            Eventos para el {selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}:
          </div>
          {getEventsForDay(selectedDate.getDate()).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDay(selectedDate.getDate()).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card
                    className="p-2 flex items-center gap-2 border-l-4 shadow-md hover:shadow-lg transition-shadow"
                    style={{ borderLeftColor: event.color }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${event.color}20` }}
                    >
                      <event.icon size={16} style={{ color: event.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{event.title}</div>
                    </div>
                    <Badge className="bg-[#0A3B32]/10 text-[#0A3B32] hover:bg-[#0A3B32]/20">Próximo</Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">No hay eventos para este día</div>
          )}
        </div>
      )}
    </div>
  )
}
