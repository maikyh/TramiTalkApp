"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

// Datos de ejemplo para los trámites por categoría
const proceduresByCategory = {
  federales: [
    { id: 1, name: "Pasaporte", description: "Trámite para obtener o renovar pasaporte" },
    { id: 2, name: "CURP", description: "Obtención o reimpresión de CURP" },
    { id: 3, name: "RFC", description: "Registro Federal de Contribuyentes" },
    { id: 4, name: "INE", description: "Credencial para votar con fotografía" },
    { id: 5, name: "Declaración de Impuestos", description: "Presentación de declaración anual" },
  ],
  estatales: [
    { id: 1, name: "Licencia de Conducir", description: "Trámite para obtener o renovar licencia de conducir" },
    { id: 2, name: "Acta de Nacimiento", description: "Solicitud de acta de nacimiento certificada" },
    { id: 3, name: "Verificación Vehicular", description: "Verificación de emisiones de vehículos" },
    { id: 4, name: "Carta de No Antecedentes Penales", description: "Solicitud de carta de no antecedentes penales" },
    { id: 5, name: "Registro Civil", description: "Trámites diversos del registro civil" },
  ],
  municipales: [
    { id: 1, name: "Pago Predial", description: "Pago de impuesto predial municipal" },
    { id: 2, name: "Pago de Agua", description: "Pago de servicio de agua potable" },
    { id: 3, name: "Permiso de Construcción", description: "Solicitud de permiso para construcción" },
    { id: 4, name: "Licencia Comercial", description: "Trámite para obtener licencia comercial" },
    { id: 5, name: "Multas de Tránsito", description: "Consulta y pago de multas de tránsito" },
  ],
  privados: [
    { id: 1, name: "Certificado Médico", description: "Obtención de certificado médico oficial" },
    { id: 2, name: "Constancia de Estudios", description: "Solicitud de constancia de estudios" },
    { id: 3, name: "Seguro de Auto", description: "Trámites relacionados con seguros de vehículos" },
    { id: 4, name: "Servicios Notariales", description: "Diversos trámites notariales" },
    { id: 5, name: "Servicios Bancarios", description: "Trámites en instituciones bancarias" },
  ],
}

export default function ProcedureCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? null : category)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button
          variant="outline"
          className={`flex flex-col h-24 items-center justify-center border-2 ${activeCategory === "federales" ? "border-blue-500 bg-blue-50" : ""}`}
          onClick={() => handleCategoryClick("federales")}
        >
          <span className="text-blue-600 font-semibold">Federales</span>
          <span className="text-xs text-gray-500 mt-1">{proceduresByCategory.federales.length} trámites</span>
        </Button>

        <Button
          variant="outline"
          className={`flex flex-col h-24 items-center justify-center border-2 ${activeCategory === "estatales" ? "border-green-500 bg-green-50" : ""}`}
          onClick={() => handleCategoryClick("estatales")}
        >
          <span className="text-green-600 font-semibold">Estatales</span>
          <span className="text-xs text-gray-500 mt-1">{proceduresByCategory.estatales.length} trámites</span>
        </Button>

        <Button
          variant="outline"
          className={`flex flex-col h-24 items-center justify-center border-2 ${activeCategory === "municipales" ? "border-orange-500 bg-orange-50" : ""}`}
          onClick={() => handleCategoryClick("municipales")}
        >
          <span className="text-orange-600 font-semibold">Municipales</span>
          <span className="text-xs text-gray-500 mt-1">{proceduresByCategory.municipales.length} trámites</span>
        </Button>

        <Button
          variant="outline"
          className={`flex flex-col h-24 items-center justify-center border-2 ${activeCategory === "privados" ? "border-purple-500 bg-purple-50" : ""}`}
          onClick={() => handleCategoryClick("privados")}
        >
          <span className="text-purple-600 font-semibold">Privados</span>
          <span className="text-xs text-gray-500 mt-1">{proceduresByCategory.privados.length} trámites</span>
        </Button>
      </div>

      {activeCategory && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 capitalize">Trámites {activeCategory}</h3>
          <div className="space-y-2">
            {proceduresByCategory[activeCategory as keyof typeof proceduresByCategory].map((procedure) => (
              <Card key={procedure.id} className="overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="flex-1">
                    <h4 className="font-medium">{procedure.name}</h4>
                    <p className="text-sm text-gray-500">{procedure.description}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
