"use client"

import { motion } from "framer-motion"
import { FileText, Home, Car, User, Calendar, CreditCard } from "lucide-react"

interface SearchResultsProps {
  query: string
  onSelectResult: (result: Procedure) => void
}

export interface Procedure {
  id: number
  title: string
  category: "federal" | "estatal" | "municipal" | "privado"
  icon: any
  color: string
  description: string
}

// Lista de trámites comunes en Torreón
const commonProcedures: Procedure[] = [
  {
    id: 1,
    title: "Licencia de Conducir",
    category: "estatal",
    icon: Car,
    color: "#D02030",
    description: "Trámite para obtener o renovar licencia de conducir en Coahuila",
  },
  {
    id: 2,
    title: "Pago Predial",
    category: "municipal",
    icon: Home,
    color: "#24B649",
    description: "Pago de impuesto predial del municipio de Torreón",
  },
  {
    id: 3,
    title: "Acta de Nacimiento",
    category: "federal",
    icon: FileText,
    color: "#4885C5",
    description: "Solicitud de acta de nacimiento certificada",
  },
  {
    id: 4,
    title: "CURP",
    category: "federal",
    icon: User,
    color: "#CB4FCB",
    description: "Consulta e impresión de CURP",
  },
  {
    id: 5,
    title: "Pago de Agua",
    category: "municipal",
    icon: Home,
    color: "#24B649",
    description: "Pago de servicio de agua potable SIMAS Torreón",
  },
  {
    id: 6,
    title: "Verificación Vehicular",
    category: "estatal",
    icon: Car,
    color: "#D02030",
    description: "Verificación ambiental obligatoria para vehículos",
  },
  {
    id: 7,
    title: "Pasaporte",
    category: "federal",
    icon: FileText,
    color: "#4885C5",
    description: "Trámite y renovación de pasaporte mexicano",
  },
  {
    id: 8,
    title: "Citas Médicas IMSS",
    category: "federal",
    icon: Calendar,
    color: "#FF4333",
    description: "Agenda de citas médicas en el IMSS",
  },
  {
    id: 9,
    title: "Pago CFE",
    category: "federal",
    icon: CreditCard,
    color: "#24B649",
    description: "Pago de servicio de energía eléctrica",
  },
  {
    id: 10,
    title: "Pago Telmex",
    category: "privado",
    icon: Home,
    color: "#4885C5",
    description: "Pago de servicio telefónico e internet",
  },
  {
    id: 11,
    title: "Constancia de Situación Fiscal",
    category: "federal",
    icon: FileText,
    color: "#4885C5",
    description: "Obtención de constancia de situación fiscal del SAT",
  },
  {
    id: 12,
    title: "Carta de No Antecedentes Penales",
    category: "estatal",
    icon: FileText,
    color: "#D02030",
    description: "Solicitud de carta de no antecedentes penales",
  },
]

export default function SearchResults({ query, onSelectResult }: SearchResultsProps) {
  // Filtrar trámites según la búsqueda
  const filteredProcedures = commonProcedures.filter(
    (procedure) =>
      procedure.title.toLowerCase().includes(query.toLowerCase()) ||
      procedure.description.toLowerCase().includes(query.toLowerCase()) ||
      procedure.category.toLowerCase().includes(query.toLowerCase()),
  )

  if (query.length < 2) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg z-20 mt-1 max-h-80 overflow-y-auto"
    >
      {filteredProcedures.length > 0 ? (
        <div className="p-2">
          {filteredProcedures.map((procedure, index) => (
            <motion.div
              key={procedure.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => onSelectResult(procedure)}
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
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center">
          <p className="text-gray-500">No se encontraron trámites para "{query}"</p>
        </div>
      )}
    </motion.div>
  )
}
