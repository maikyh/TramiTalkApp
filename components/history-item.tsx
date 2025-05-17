"use client"

import { motion } from "framer-motion"
import { type LucideIcon, ChevronRight } from "lucide-react"

interface HistoryItemProps {
  item: {
    id: number
    title: string
    time: string
    icon: LucideIcon
    color: string
    amount: string
  }
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const Icon = item.icon

  return (
    <motion.div
      className="flex items-center justify-between p-3 rounded-xl cursor-pointer relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${item.color}10, ${item.color}05)`,
        boxShadow: `0 1px 3px 0 ${item.color}10, 0 1px 2px -1px ${item.color}10`,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 4px 6px -1px ${item.color}20, 0 2px 4px -2px ${item.color}10`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Efecto de brillo en hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%", opacity: 0.2 }}
        transition={{ duration: 0.8 }}
      />

      <div className="flex items-center">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${item.color}20` }}
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        >
          <Icon size={18} style={{ color: item.color }} />
        </motion.div>
        <div>
          <p className="font-medium text-gray-800">{item.title}</p>
          <p className="text-xs text-gray-500">Hace {item.time}</p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="font-bold text-gray-800 mr-2">{item.amount}</p>
        <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <ChevronRight size={16} className="text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
  )
}
