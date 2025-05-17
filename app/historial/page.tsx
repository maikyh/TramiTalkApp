"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Search, CreditCard, Car, Home, FileText, Calendar, Filter } from "lucide-react"
import HistoryItem from "@/components/history-item"
import TorreonLogo from "@/components/torreon-logo"

export default function HistorialPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("todos")

  // Datos de historial más extensos para esta página
  const historyItems = [
    { id: 1, title: "Pago CFE", time: "12 min", icon: CreditCard, color: "#24B649", amount: "$782.50" },
    { id: 2, title: "Trámite Licencia de conducir", time: "2 días", icon: Car, color: "#CB4FCB", amount: "$1,250.00" },
    { id: 3, title: "Pago Telmex", time: "3 días", icon: Home, color: "#4885C5", amount: "$499.00" },
    { id: 4, title: "Renovación Pasaporte", time: "1 semana", icon: FileText, color: "#D02030", amount: "$1,800.00" },
    { id: 5, title: "Pago Predial", time: "2 semanas", icon: Home, color: "#0A3B32", amount: "$3,450.00" },
    { id: 6, title: "Verificación Vehicular", time: "3 semanas", icon: Car, color: "#FF4333", amount: "$600.00" },
    { id: 7, title: "Cita Médica IMSS", time: "1 mes", icon: Calendar, color: "#4885C5", amount: "Gratuito" },
    { id: 8, title: "Pago Agua", time: "1 mes", icon: Home, color: "#24B649", amount: "$350.00" },
    { id: 9, title: "Renovación INE", time: "2 meses", icon: FileText, color: "#CB4FCB", amount: "Gratuito" },
    { id: 10, title: "Pago Tenencia", time: "3 meses", icon: Car, color: "#D02030", amount: "$2,800.00" },
  ]

  // Filtrar elementos según la búsqueda y el filtro activo
  const filteredItems = historyItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "todos") return matchesSearch
    if (activeFilter === "pagos") return matchesSearch && item.amount !== "Gratuito"
    if (activeFilter === "tramites") return matchesSearch && item.title.toLowerCase().includes("trámite")
    if (activeFilter === "citas") return matchesSearch && item.title.toLowerCase().includes("cita")

    return matchesSearch
  })

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="w-full max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="rounded-xl overflow-hidden shadow-lg border-none">
            {/* Header con Logo de Torreón */}
            <div className="bg-gradient-to-r from-[#0A3B32] to-[#24B649] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 mr-1"
                  onClick={() => (window.location.href = "/")}
                >
                  <ChevronLeft size={24} />
                </Button>
                <TorreonLogo className="h-10 w-10" />
                <div>
                  <h1 className="text-xl font-bold">Historial Completo</h1>
                  <p className="text-xs opacity-80">TramiTalk - Torreón</p>
                </div>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="p-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar en historial..."
                  className="pl-10 pr-10 py-6 rounded-full border-[#4885C5] border-2 focus-visible:ring-[#24B649]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center bg-[#0A3B32]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Filter size={16} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Filtros */}
            <div className="px-4 mb-2">
              <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveFilter}>
                <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1">
                  <TabsTrigger
                    value="todos"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Todos
                  </TabsTrigger>
                  <TabsTrigger
                    value="pagos"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Pagos
                  </TabsTrigger>
                  <TabsTrigger
                    value="tramites"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Trámites
                  </TabsTrigger>
                  <TabsTrigger
                    value="citas"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Citas
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Lista de historial */}
            <div className="p-4">
              <div className="space-y-3">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <HistoryItem item={item} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                    <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-[#0A3B32] mb-2">No se encontraron resultados</h3>
                    <p className="text-gray-500">Intenta con otra búsqueda o filtro</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="p-4 bg-gray-50 border-t">
              <h3 className="text-[#0A3B32] font-semibold mb-3">Resumen de Actividad</h3>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-3 text-center bg-[#24B649]/10 border-none">
                  <h4 className="text-xs text-gray-500">Pagos</h4>
                  <p className="text-xl font-bold text-[#24B649]">8</p>
                </Card>
                <Card className="p-3 text-center bg-[#4885C5]/10 border-none">
                  <h4 className="text-xs text-gray-500">Trámites</h4>
                  <p className="text-xl font-bold text-[#4885C5]">3</p>
                </Card>
                <Card className="p-3 text-center bg-[#D02030]/10 border-none">
                  <h4 className="text-xs text-gray-500">Citas</h4>
                  <p className="text-xl font-bold text-[#D02030]">2</p>
                </Card>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
