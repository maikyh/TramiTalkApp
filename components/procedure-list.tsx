"use client"

import { motion } from "framer-motion"
import type { Procedure } from "./search-results"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ProcedureListProps {
  procedures: Procedure[]
  category: "federal" | "estatal" | "municipal" | "privado"
}

export default function ProcedureList({ procedures, category }: ProcedureListProps) {
  // Filtrar trámites por categoría
  const filteredProcedures = procedures.filter((procedure) => procedure.category === category)

  // Mapear categorías a nombres en español
  const categoryNames = {
    federal: "Federales",
    estatal: "Estatales",
    municipal: "Municipales",
    privado: "Privados",
  }

  // Mapear categorías a colores
  const categoryColors = {
    federal: "#4885C5",
    estatal: "#D02030",
    municipal: "#24B649",
    privado: "#CB4FCB",
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-[#0A3B32] mb-4 flex items-center">
        Trámites {categoryNames[category]}
        <Badge className="ml-2" style={{ backgroundColor: categoryColors[category] }}>
          {filteredProcedures.length}
        </Badge>
      </h2>

      <div className="space-y-3">
        {filteredProcedures.map((procedure, index) => (
          <motion.div
            key={procedure.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card
              className="p-3 flex items-center justify-between hover:shadow-md transition-shadow border-l-4"
              style={{ borderLeftColor: procedure.color }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${procedure.color}20` }}
                >
                  <procedure.icon size={20} style={{ color: procedure.color }} />
                </div>
                <div>
                  <h3 className="font-medium text-[#0A3B32]">{procedure.title}</h3>
                  <p className="text-xs text-gray-500">{procedure.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight size={16} className="text-gray-400" />
              </Button>
            </Card>
          </motion.div>
        ))}

        {filteredProcedures.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay trámites disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
