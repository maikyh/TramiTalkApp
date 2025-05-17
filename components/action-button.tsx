"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ActionButtonProps {
  action: {
    id: number
    title: string
    icon: LucideIcon
    color: string
    category?: "federal" | "estatal" | "municipal" | "privado" // Add category property
  }
  onActionClick?: (category: "federal" | "estatal" | "municipal" | "privado") => void // Add click handler
}

export default function ActionButton({ action, onActionClick }: ActionButtonProps) {
  const Icon = action.icon

  // Map action titles to categories
  const getCategoryFromTitle = (title: string): "federal" | "estatal" | "municipal" | "privado" => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes("identificaciones") || titleLower.includes("curp")) return "federal"
    if (titleLower.includes("vehículos") || titleLower.includes("movilidad")) return "estatal"
    if (titleLower.includes("servicios") || titleLower.includes("básicos")) return "municipal"
    if (titleLower.includes("médicas") || titleLower.includes("escolares")) return "privado"
    return "municipal" // Default fallback
  }

  const handleClick = () => {
    if (onActionClick) {
      const category = action.category || getCategoryFromTitle(action.title)
      onActionClick(category)
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${action.color}20, ${action.color}10)`,
        boxShadow: `0 4px 6px -1px ${action.color}20, 0 2px 4px -2px ${action.color}10`,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 10px 15px -3px ${action.color}30, 0 4px 6px -4px ${action.color}20`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* Efecto de brillo en hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%", opacity: 0.3 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
        style={{ backgroundColor: `${action.color}30` }}
        whileHover={{
          rotate: [0, -10, 10, -10, 0],
          backgroundColor: `${action.color}50`,
        }}
      >
        <Icon size={20} style={{ color: action.color }} />
      </motion.div>
      <p className="text-xs text-center font-medium text-gray-700 line-clamp-2">{action.title}</p>
    </motion.div>
  )
}
