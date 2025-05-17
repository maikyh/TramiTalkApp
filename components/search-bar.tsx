"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Lista de trámites comunes en Torreón
const commonProcedures = [
  {
    id: 1,
    name: "Licencia de Conducir",
    description: "Trámite para obtener o renovar licencia de conducir",
    category: "Estatal",
  },
  {
    id: 2,
    name: "Pago Predial",
    description: "Pago de impuesto predial municipal",
    category: "Municipal",
  },
  {
    id: 3,
    name: "Acta de Nacimiento",
    description: "Solicitud de acta de nacimiento certificada",
    category: "Estatal",
  },
  {
    id: 4,
    name: "CURP",
    description: "Obtención o reimpresión de CURP",
    category: "Federal",
  },
  {
    id: 5,
    name: "Pago de Agua",
    description: "Pago de servicio de agua potable",
    category: "Municipal",
  },
  {
    id: 6,
    name: "Verificación Vehicular",
    description: "Verificación de emisiones de vehículos",
    category: "Estatal",
  },
  {
    id: 7,
    name: "Pasaporte",
    description: "Trámite para obtener o renovar pasaporte",
    category: "Federal",
  },
  {
    id: 8,
    name: "Carta de No Antecedentes Penales",
    description: "Solicitud de carta de no antecedentes penales",
    category: "Estatal",
  },
  {
    id: 9,
    name: "Permiso de Construcción",
    description: "Solicitud de permiso para construcción",
    category: "Municipal",
  },
  {
    id: 10,
    name: "RFC",
    description: "Registro Federal de Contribuyentes",
    category: "Federal",
  },
  {
    id: 11,
    name: "Licencia Comercial",
    description: "Trámite para obtener licencia comercial",
    category: "Municipal",
  },
  {
    id: 12,
    name: "Certificado Médico",
    description: "Obtención de certificado médico oficial",
    category: "Privado",
  },
]

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof commonProcedures>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filtrar resultados basados en la consulta
  useEffect(() => {
    if (query.length > 1) {
      const filtered = commonProcedures.filter(
        (procedure) =>
          procedure.name.toLowerCase().includes(query.toLowerCase()) ||
          procedure.description.toLowerCase().includes(query.toLowerCase()) ||
          procedure.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar trámite o servicio"
          className="pl-10 pr-4 py-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 max-h-80 overflow-y-auto shadow-lg">
          <div className="p-2">
            {results.map((procedure) => (
              <Button
                key={procedure.id}
                variant="ghost"
                className="w-full justify-start text-left mb-1 flex flex-col items-start"
                onClick={() => {
                  setQuery(procedure.name)
                  setIsOpen(false)
                }}
              >
                <span className="font-medium">{procedure.name}</span>
                <span className="text-xs text-gray-500">{procedure.description}</span>
                <span className="text-xs mt-1 px-2 py-0.5 bg-gray-100 rounded-full">{procedure.category}</span>
              </Button>
            ))}
          </div>
        </Card>
      )}

      {isOpen && results.length === 0 && query.length > 1 && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <div className="p-4 text-center text-gray-500">No se encontraron trámites que coincidan con "{query}"</div>
        </Card>
      )}
    </div>
  )
}
