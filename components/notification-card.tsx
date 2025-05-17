"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface NotificationProps {
  notification: {
    id: number
    title: string
    date: string
    icon: LucideIcon
    color: string
  }
}

export default function NotificationCard({ notification }: NotificationProps) {
  const { title, date, icon: Icon, color } = notification

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className="p-3 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow border-l-4"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div>
            <h3 className="font-medium text-[#0A3B32]">{title}</h3>
            <p className="text-xs text-gray-500">Vence: {date}</p>
          </div>
        </div>
        <Badge className="bg-[#0A3B32]/10 text-[#0A3B32] hover:bg-[#0A3B32]/20">Próximo</Badge>
      </Card>
    </motion.div>
  )
}
