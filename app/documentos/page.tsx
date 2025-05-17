"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  Search,
  FileText,
  Download,
  Eye,
  Upload,
  FileCheck,
  FilePlus,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react"
import TorreonLogo from "@/components/torreon-logo"

interface Document {
  id: number
  title: string
  type: string
  date: string
  status: "verified" | "pending" | "expired"
  icon: any
}

export default function DocumentosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("todos")

  // Lista de documentos
  const documents: Document[] = [
    {
      id: 1,
      title: "INE / Credencial de Elector",
      type: "Identificación",
      date: "15/03/2025",
      status: "verified",
      icon: FileCheck,
    },
    {
      id: 2,
      title: "Licencia de Conducir",
      type: "Identificación",
      date: "10/08/2025",
      status: "verified",
      icon: FileCheck,
    },
    {
      id: 3,
      title: "Pasaporte",
      type: "Identificación",
      date: "22/05/2025",
      status: "verified",
      icon: FileCheck,
    },
    {
      id: 4,
      title: "Comprobante de Domicilio",
      type: "Comprobante",
      date: "05/06/2025",
      status: "pending",
      icon: Clock,
    },
    {
      id: 5,
      title: "CURP",
      type: "Identificación",
      date: "Permanente",
      status: "verified",
      icon: FileCheck,
    },
    {
      id: 6,
      title: "Acta de Nacimiento",
      type: "Certificado",
      date: "Permanente",
      status: "verified",
      icon: FileCheck,
    },
    {
      id: 7,
      title: "Tarjeta de Circulación",
      type: "Vehículo",
      date: "30/11/2024",
      status: "expired",
      icon: AlertCircle,
    },
    {
      id: 8,
      title: "Cédula Profesional",
      type: "Certificado",
      date: "Permanente",
      status: "verified",
      icon: FileCheck,
    },
  ]

  // Filtrar documentos según la búsqueda y el filtro activo
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "todos") return matchesSearch
    if (activeTab === "identificacion") return matchesSearch && doc.type === "Identificación"
    if (activeTab === "certificados") return matchesSearch && doc.type === "Certificado"
    if (activeTab === "otros") return matchesSearch && doc.type !== "Identificación" && doc.type !== "Certificado"

    return matchesSearch
  })

  // Función para obtener el color según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "#24B649"
      case "pending":
        return "#4885C5"
      case "expired":
        return "#D02030"
      default:
        return "#0A3B32"
    }
  }

  // Función para obtener el texto según el estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verificado"
      case "pending":
        return "Pendiente"
      case "expired":
        return "Expirado"
      default:
        return "Desconocido"
    }
  }

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
                  <h1 className="text-xl font-bold">Mis Documentos</h1>
                  <p className="text-xs opacity-80">TramiTalk - Torreón</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <FilePlus size={20} />
              </Button>
            </div>

            {/* Barra de búsqueda */}
            <div className="p-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar documento..."
                  className="pl-10 pr-10 py-6 rounded-full border-[#4885C5] border-2 focus-visible:ring-[#24B649]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center bg-[#0A3B32]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Upload size={16} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Filtros */}
            <div className="px-4 mb-2">
              <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1">
                  <TabsTrigger
                    value="todos"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Todos
                  </TabsTrigger>
                  <TabsTrigger
                    value="identificacion"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    ID
                  </TabsTrigger>
                  <TabsTrigger
                    value="certificados"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Cert.
                  </TabsTrigger>
                  <TabsTrigger
                    value="otros"
                    className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                  >
                    Otros
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Lista de documentos */}
            <div className="p-4">
              <div className="space-y-3">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className="p-3 flex items-center justify-between hover:shadow-md transition-shadow border-l-4"
                        style={{ borderLeftColor: getStatusColor(doc.status) }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${getStatusColor(doc.status)}20` }}
                          >
                            <doc.icon size={20} style={{ color: getStatusColor(doc.status) }} />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#0A3B32]">{doc.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {doc.type}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar size={12} className="mr-1" />
                                {doc.date}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge style={{ backgroundColor: getStatusColor(doc.status) }}>
                            {getStatusText(doc.status)}
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Eye size={14} className="text-[#4885C5]" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Download size={14} className="text-[#24B649]" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-[#0A3B32] mb-2">No se encontraron documentos</h3>
                    <p className="text-gray-500">Intenta con otra búsqueda o filtro</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Botón para subir documento */}
            <div className="p-4 bg-gray-50 border-t">
              <Button className="w-full bg-[#0A3B32] flex items-center gap-2">
                <Upload size={16} />
                Subir nuevo documento
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
