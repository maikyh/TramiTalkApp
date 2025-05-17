"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, User, Mail, Phone, MapPin, Edit, Save, Camera } from "lucide-react"
import TorreonLogo from "@/components/torreon-logo"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "Juan Díaz",
    email: "juan.diaz@ejemplo.com",
    phone: "+52 871 123 4567",
    address: "Av. Juárez 123, Centro, Torreón",
    curp: "DIJM901231HCMZRN09",
    rfc: "DIJM901231AB9",
  })

  const [formData, setFormData] = useState({ ...userData })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = () => {
    setUserData({ ...formData })
    setIsEditing(false)
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
                  <h1 className="text-xl font-bold">Mi Perfil</h1>
                  <p className="text-xs opacity-80">TramiTalk - Torreón</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              >
                {isEditing ? <Save size={20} /> : <Edit size={20} />}
              </Button>
            </div>

            {/* Foto de perfil */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-[#4885C5]/30 to-[#24B649]/30"></div>
              <div className="absolute -bottom-16 w-full flex justify-center">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-gray-200">
                    <User className="h-16 w-16 text-gray-400" />
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-[#4885C5] text-white p-2 rounded-full shadow-lg">
                      <Camera size={16} />
                    </button>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Información del perfil */}
            <div className="pt-20 px-4 pb-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#0A3B32]">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
                <div className="flex justify-center mt-2 gap-2">
                  <Badge className="bg-[#24B649]">Verificado</Badge>
                  <Badge className="bg-[#4885C5]">Ciudadano</Badge>
                </div>
              </div>

              <div className="space-y-4">
                {isEditing ? (
                  // Formulario de edición
                  <>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Nombre completo</label>
                      <div className="flex items-center border rounded-md border-[#4885C5] px-3 py-2 focus-within:ring-2 focus-within:ring-[#24B649]">
                        <User size={16} className="text-gray-400 mr-2" />
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 p-0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Correo electrónico</label>
                      <div className="flex items-center border rounded-md border-[#4885C5] px-3 py-2 focus-within:ring-2 focus-within:ring-[#24B649]">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 p-0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Teléfono</label>
                      <div className="flex items-center border rounded-md border-[#4885C5] px-3 py-2 focus-within:ring-2 focus-within:ring-[#24B649]">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 p-0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Dirección</label>
                      <div className="flex items-center border rounded-md border-[#4885C5] px-3 py-2 focus-within:ring-2 focus-within:ring-[#24B649]">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="border-0 focus-visible:ring-0 p-0"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">CURP</label>
                        <Input
                          name="curp"
                          value={formData.curp}
                          onChange={handleInputChange}
                          className="border-[#4885C5]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">RFC</label>
                        <Input
                          name="rfc"
                          value={formData.rfc}
                          onChange={handleInputChange}
                          className="border-[#4885C5]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormData({ ...userData })
                          setIsEditing(false)
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button className="bg-[#0A3B32]" onClick={handleSave}>
                        Guardar cambios
                      </Button>
                    </div>
                  </>
                ) : (
                  // Vista de información
                  <>
                    <motion.div
                      className="flex items-center p-3 rounded-lg bg-[#4885C5]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <User size={20} className="text-[#4885C5] mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Nombre completo</p>
                        <p className="font-medium text-[#0A3B32]">{userData.name}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center p-3 rounded-lg bg-[#24B649]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail size={20} className="text-[#24B649] mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Correo electrónico</p>
                        <p className="font-medium text-[#0A3B32]">{userData.email}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center p-3 rounded-lg bg-[#D02030]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Phone size={20} className="text-[#D02030] mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Teléfono</p>
                        <p className="font-medium text-[#0A3B32]">{userData.phone}</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center p-3 rounded-lg bg-[#CB4FCB]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <MapPin size={20} className="text-[#CB4FCB] mr-3" />
                      <div>
                        <p className="text-xs text-gray-500">Dirección</p>
                        <p className="font-medium text-[#0A3B32]">{userData.address}</p>
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <motion.div className="p-3 rounded-lg bg-[#0A3B32]/10" whileHover={{ scale: 1.02 }}>
                        <p className="text-xs text-gray-500">CURP</p>
                        <p className="font-medium text-[#0A3B32]">{userData.curp}</p>
                      </motion.div>
                      <motion.div className="p-3 rounded-lg bg-[#0A3B32]/10" whileHover={{ scale: 1.02 }}>
                        <p className="text-xs text-gray-500">RFC</p>
                        <p className="font-medium text-[#0A3B32]">{userData.rfc}</p>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            {!isEditing && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="bg-[#4885C5] hover:bg-[#4885C5]/80"
                    onClick={() => (window.location.href = "/documentos")}
                  >
                    Mis Documentos
                  </Button>
                  <Button
                    className="bg-[#24B649] hover:bg-[#24B649]/80"
                    onClick={() => (window.location.href = "/preferencias")}
                  >
                    Preferencias
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
