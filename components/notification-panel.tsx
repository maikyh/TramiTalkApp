"use client"

import { motion } from "framer-motion"
import { X, Bell, FileText, Car, Home, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import NotificationCard from "@/components/notification-card"

interface NotificationPanelProps {
  onClose: () => void
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  // Notificaciones de ejemplo
  const notifications = [
    {
      id: 1,
      title: "Renovación de Licencia",
      date: "28/05/2025",
      icon: Car,
      color: "#CB4FCB",
      isNew: true,
    },
    {
      id: 2,
      title: "Pago Predial",
      date: "02/06/2025",
      icon: Home,
      color: "#24B649",
      isNew: true,
    },
    {
      id: 3,
      title: "Verificación Vehicular",
      date: "15/06/2025",
      icon: Car,
      color: "#FF4333",
      isNew: true,
    },
    {
      id: 4,
      title: "Pago Agua",
      date: "20/05/2025",
      icon: Home,
      color: "#4885C5",
      isNew: false,
    },
    {
      id: 5,
      title: "Renovación Pasaporte",
      date: "10/06/2025",
      icon: FileText,
      color: "#0A3B32",
      isNew: false,
    },
  ]

  return (
    <motion.div
      className="absolute top-16 right-0 left-0 z-50 bg-white shadow-2xl rounded-b-xl max-h-[70vh] overflow-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="sticky top-0 bg-gradient-to-r from-[#0A3B32] to-[#24B649] p-4 border-b flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Bell className="text-white" size={18} />
          <h2 className="font-semibold">Notificaciones</h2>
          <Badge className="bg-gradient-to-r from-[#FF4333] to-[#D02030] text-white">
            <Sparkles size={10} className="mr-1" /> 3 nuevas
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <NotificationCard notification={notification} />
            {notification.isNew && (
              <motion.div
                className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-r from-[#FF4333] to-[#D02030] rounded-full"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255, 67, 51, 0.7)",
                    "0 0 0 4px rgba(255, 67, 51, 0)",
                    "0 0 0 0 rgba(255, 67, 51, 0)",
                  ],
                }}
                transition={{
                  delay: index * 0.05 + 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t">
        <Button className="w-full bg-gradient-to-r from-[#0A3B32] to-[#24B649] hover:opacity-90 shadow-lg">
          Ver todas las notificaciones
        </Button>
      </div>
    </motion.div>
  )
}
