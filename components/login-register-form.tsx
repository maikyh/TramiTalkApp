"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function LoginRegisterForm() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Iniciando sesión",
      description: "Procesando tus credenciales...",
    })

    // Simulación de login exitoso después de 1.5 segundos
    setTimeout(() => {
      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Has iniciado sesión correctamente",
        variant: "success",
      })
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error en el registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Creando cuenta",
      description: "Procesando tu registro...",
    })

    // Simulación de registro exitoso después de 1.5 segundos
    setTimeout(() => {
      toast({
        title: "¡Cuenta creada!",
        description: "Tu registro se ha completado correctamente",
        variant: "success",
      })
      setActiveTab("login")
    }, 1500)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login" className="data-[state=active]:bg-[#0A3B32] data-[state=active]:text-white">
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-[#D02030] data-[state=active]:text-white">
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="link" className="text-[#4885C5] p-0 h-auto">
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>

              <Button type="submit" className="w-full bg-[#0A3B32] hover:bg-[#0A3B32]/80">
                Iniciar Sesión <ArrowRight className="ml-2" size={16} />
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  ¿No tienes cuenta?{" "}
                  <Button variant="link" className="text-[#D02030] p-0 h-auto" onClick={() => setActiveTab("register")}>
                    Regístrate
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan Díaz"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#D02030] hover:bg-[#D02030]/80">
                Crear Cuenta <ArrowRight className="ml-2" size={16} />
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  ¿Ya tienes cuenta?{" "}
                  <Button variant="link" className="text-[#0A3B32] p-0 h-auto" onClick={() => setActiveTab("login")}>
                    Inicia sesión
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
