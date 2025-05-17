"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mic,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Car,
  Search,
  ChevronRight,
  FileCheck,
  Home,
  ChevronLeft,
  User,
  GlassWater,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { io } from "socket.io-client";
import { Ticket } from "lucide-react"; 
import ActionButton from "@/components/action-button"
import HistoryItem from "@/components/history-item"
import WelcomeScreen from "@/components/welcome-screen"
import CalendarView from "@/components/calendar-view"
import PaymentCardPanel from "@/components/payment-card-panel"
import TorreonLogo from "@/components/torreon-logo"
import VoiceChatButton from "@/components/VoiceChatButton"
import ListeningOverlay from "@/components/listening-overlay"
import NotificationPanel from "@/components/notification-panel"
import SearchResults, { type Procedure } from "@/components/search-results"
import ProcedureList from "@/components/procedure-list"

export default function HomePage() {
  const { toast } = useToast()
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inicio")
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showListeningOverlay, setShowListeningOverlay] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeProcedureCategory, setActiveProcedureCategory] = useState<
    "federal" | "estatal" | "municipal" | "privado" | null
  >(null)
  const micButtonRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sessionId = useRef(Date.now().toString());
  const socketRef = useRef<any>(null);

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

  useEffect(() => {
    // Simulate loading time for welcome animation
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleMicClick = () => {
    setShowListeningOverlay(true)
    setIsListening(true)

    toast({
      title: "¡Escuchando!",
      description: "Dime en qué puedo ayudarte con tus trámites",
      variant: "default",
    })
  }

  const handleCloseListening = () => {
    setShowListeningOverlay(false)
    setIsListening(false)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleSelectProcedure = (procedure: Procedure) => {
    setSearchQuery("")
    toast({
      title: "Trámite seleccionado",
      description: `Has seleccionado: ${procedure.title}`,
      variant: "default",
    })
  }

  const handleProcedureCategoryClick = (category: "federal" | "estatal" | "municipal" | "privado") => {
    setActiveProcedureCategory(category)
  }

  const quickActions = [
    { id: 1, title: "Servicios Básicos", icon: Home, color: "#4885C5", category: "municipal" },
    { id: 2, title: "Identificaciones", icon: FileText, color: "#D02030", category: "federal" },
    { id: 3, title: "Movilidad Vehículos", icon: Car, color: "#24B649", category: "estatal" },
    { id: 4, title: "Consultar CURP", icon: User, color: "#CB4FCB", category: "federal" },
    { id: 5, title: "Citas Médicas", icon: Calendar, color: "#FF4333", category: "privado" },
    { id: 6, title: "Trámites Escolares", icon: FileCheck, color: "#0A3B32", category: "privado" },
  ]
  const initialHistory = [
    { id: 1, title: "Pago CFE", time: "12 min", icon: CreditCard, color: "#24B649", amount: "$782.50" },
    { id: 2, title: "Pago de SIMAS", time: "2 días", icon: GlassWater, color: "#ADD8E6", amount: "$1,250.00" },
    { id: 3, title: "Pago Telmex", time: "3 días", icon: Home, color: "#4885C5", amount: "$499.00" },
  ];

  const [historyItems, setHistoryItems] = useState(initialHistory);
  
  useEffect(() => {
    const socket = io("http://localhost:8000", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000",
      },
    });

    socket.on("data", (data) => {
      console.log("llega dato:", data);
      const newItem = {
        id: Date.now(),                   
        title: "Pago multa de tránsito",
        time: "Ahora",                    
        icon: Car,
        color: "#E74C3C",                
        amount: `$1500`,
      };
  
      setHistoryItems((prev) => {
        const exists = prev.some(
          (item) => item.title === newItem.title && item.amount === newItem.amount
        );
        if (exists) {
          return prev;
        }
        return [newItem, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  

  // Eventos para el calendario
  const calendarEvents = [
    { id: 1, title: "Renovación Pasaporte", date: new Date(2025, 4, 28), icon: FileText, color: "#4885C5" },
    { id: 2, title: "Pago Predial", date: new Date(2025, 5, 2), icon: Home, color: "#24B649" },
    { id: 3, title: "Verificación Vehicular", date: new Date(2025, 5, 15), icon: Car, color: "#FF4333" },
    { id: 4, title: "Pago Agua", date: new Date(2025, 4, 20), icon: Home, color: "#4885C5" },
    { id: 5, title: "Renovación Licencia", date: new Date(2025, 5, 10), icon: Car, color: "#CB4FCB" },
  ]

  if (showWelcome) {
    return <WelcomeScreen />
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-white pb-20">
      <style jsx global>{`
        .tabs-container {
          display: flex;
          flex-direction: column;
        }
        .tab-content {
          height: 600px;
          overflow-y: auto;
          flex: 1;
        }
      `}</style>
      <div className="w-full max-w-md mx-auto relative">
        <Card ref={cardRef} className="rounded-xl overflow-hidden shadow-lg border-none relative z-10">
          {/* Header con Logo de Torreón */}
          <div className="bg-gradient-to-r from-[#0A3B32] to-[#24B649] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <TorreonLogo className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold flex items-center">
                  TramiTalk
                  <Badge className="ml-1 bg-[#FF4333] text-white text-xs">AI</Badge>
                </h1>
                <p className="text-xs opacity-80">Torreón Siempre Puede</p>
              </div>
            </div>
            <div onClick={toggleNotifications} className="relative cursor-pointer">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-[#FF4333] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>

          {/* Panel de Notificaciones */}
          <AnimatePresence>
            {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          </AnimatePresence>

          {/* Search Bar */}
          <div className="p-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                ref={searchInputRef}
                placeholder="Buscar trámite o servicio..."
                className="pl-10 pr-4 py-6 rounded-full border-[#4885C5] border-2 focus-visible:ring-[#24B649]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery.length > 0 && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
            <SearchResults query={searchQuery} onSelectResult={handleSelectProcedure} />
          </div>

          <Tabs value={activeTab} className="w-full tabs-container" onValueChange={setActiveTab}>
            <div className="px-4">
              <TabsList className="grid grid-cols-4 w-full bg-gray-100 rounded-lg p-1">
                <TabsTrigger
                  value="inicio"
                  className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                >
                  Inicio
                </TabsTrigger>
                <TabsTrigger
                  value="tramites"
                  className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                >
                  Trámites
                </TabsTrigger>
                <TabsTrigger
                  value="pagos"
                  className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                >
                  Pagos
                </TabsTrigger>
                <TabsTrigger
                  value="perfil"
                  className="rounded-md data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white"
                >
                  Perfil
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inicio" className="mt-0 tab-content">
              {/* Calendario de Próximos Pagos */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-[#0A3B32] font-semibold flex items-center">
                    <Calendar size={16} className="mr-1" /> Calendario de Pagos
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0A3B32]" onClick={prevMonth}>
                      <ChevronLeft size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0A3B32]" onClick={nextMonth}>
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
                <CalendarView month={currentMonth} events={calendarEvents} />
              </div>

              {/* Acciones rápidas */}
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-[#0A3B32] font-semibold mb-3 flex items-center">Acciones rápidas</h2>
                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action) => (
                    <div key={action.id}>
                      <ActionButton
                        action={action}
                        onActionClick={(category) => {
                          setActiveTab("tramites")
                          setActiveProcedureCategory(category)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Historial */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-[#0A3B32] font-semibold flex items-center">
                    <FileCheck size={16} className="mr-1" /> Historial
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#4885C5] p-0 h-auto flex items-center"
                    onClick={() => (window.location.href = "/historial")}
                  >
                    Ver todo <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {historyItems.map((item) => (
                    <div key={item.id}>
                      <HistoryItem item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tramites" className="tab-content">
              {activeProcedureCategory ? (
                <div>
                  <div className="p-4 pb-0">
                    <Button
                      variant="ghost"
                      className="flex items-center text-[#0A3B32]"
                      onClick={() => setActiveProcedureCategory(null)}
                    >
                      <ChevronLeft size={16} className="mr-1" /> Volver a categorías
                    </Button>
                  </div>
                  <ProcedureList procedures={commonProcedures} category={activeProcedureCategory} />
                </div>
              ) : (
                <div className="p-6 text-center">
                  <FileText className="w-16 h-16 mx-auto text-[#4885C5] mb-4" />
                  <h3 className="text-xl font-bold text-[#0A3B32] mb-2">Catálogo de Trámites</h3>
                  <p className="text-gray-500 mb-4">Explora todos los trámites disponibles</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-[#D02030]" onClick={() => handleProcedureCategoryClick("federal")}>
                      Federales
                    </Button>
                    <Button className="bg-[#24B649]" onClick={() => handleProcedureCategoryClick("estatal")}>
                      Estatales
                    </Button>
                    <Button className="bg-[#4885C5]" onClick={() => handleProcedureCategoryClick("municipal")}>
                      Municipales
                    </Button>
                    <Button className="bg-[#CB4FCB]" onClick={() => handleProcedureCategoryClick("privado")}>
                      Privados
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pagos" className="tab-content">
              <div className="p-4">
                <h2 className="text-[#0A3B32] font-semibold mb-3 flex items-center">
                  <CreditCard size={16} className="mr-1" /> Métodos de Pago
                </h2>
                <PaymentCardPanel />
              </div>
            </TabsContent>

            <TabsContent value="perfil" className="tab-content">
              <div className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4 bg-gray-200">
                  <AvatarFallback className="text-gray-400">
                    <User size={40} />
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-[#0A3B32] mb-1">Juan Díaz</h3>
                <p className="text-gray-500 mb-4">juan.diaz@ejemplo.com</p>
                <div className="space-y-3">
                  <Button className="w-full bg-[#0A3B32]" onClick={() => (window.location.href = "/perfil")}>
                    Mi Perfil
                  </Button>
                  <Button className="w-full bg-[#4885C5]" onClick={() => (window.location.href = "/documentos")}>
                    Mis Documentos
                  </Button>
                  <Button className="w-full bg-[#24B649]" onClick={() => (window.location.href = "/preferencias")}>
                    Preferencias
                  </Button>
                  <Button variant="outline" className="w-full border-[#D02030] text-[#D02030]">
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <VoiceChatButton></VoiceChatButton>
    </main>
  )
}
