"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Plus, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import FinanceSection from "./finance-section"

interface PaymentCard {
  id: string
  last4: string
  brand: string
  expMonth: number
  expYear: number
}

export default function PaymentCardPanel() {
  const { toast } = useToast()
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: "1", last4: "4242", brand: "visa", expMonth: 12, expYear: 2025 },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const handleAddCard = () => {
    // Validación simple
    if (newCard.number.length < 16 || !newCard.name || newCard.expiry.length < 5 || newCard.cvc.length < 3) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos correctamente",
        variant: "destructive",
      })
      return
    }

    // Extraer mes y año de expiración
    const [expMonth, expYear] = newCard.expiry.split("/").map((part) => Number.parseInt(part.trim()))

    // Añadir nueva tarjeta
    const newCardObj: PaymentCard = {
      id: Date.now().toString(),
      last4: newCard.number.slice(-4),
      brand: newCard.number.startsWith("4") ? "visa" : "mastercard",
      expMonth,
      expYear: 2000 + expYear,
    }

    setCards([...cards, newCardObj])
    setShowAddForm(false)
    setNewCard({ number: "", name: "", expiry: "", cvc: "" })

    toast({
      title: "Tarjeta añadida",
      description: "Tu tarjeta ha sido añadida correctamente",
      variant: "success",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Formateo específico para cada campo
    if (name === "number") {
      // Solo permitir números y formatear con espacios cada 4 dígitos
      const formatted = value.replace(/\D/g, "").substring(0, 16)
      setNewCard({ ...newCard, [name]: formatted })
    } else if (name === "expiry") {
      // Formato MM/YY
      const formatted = value.replace(/\D/g, "")
      if (formatted.length <= 2) {
        setNewCard({ ...newCard, [name]: formatted })
      } else {
        setNewCard({ ...newCard, [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}` })
      }
    } else if (name === "cvc") {
      // Solo permitir números y limitar a 3-4 dígitos
      const formatted = value.replace(/\D/g, "").substring(0, 4)
      setNewCard({ ...newCard, [name]: formatted })
    } else {
      setNewCard({ ...newCard, [name]: value })
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Tarjetas existentes */}
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-3 flex items-center justify-between bg-gradient-to-r from-[#0A3B32]/5 to-[#24B649]/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4885C5]/10 flex items-center justify-center">
                    <CreditCard size={20} className="text-[#4885C5]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0A3B32]">
                      {card.brand === "visa" ? "Visa" : "Mastercard"} •••• {card.last4}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Exp: {card.expMonth}/{card.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Check size={16} className="text-[#24B649]" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Formulario para añadir tarjeta */}
        <AnimatePresence mode="wait">
          {showAddForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 border-dashed border-2 border-[#4885C5]/30">
                <h3 className="font-medium text-[#0A3B32] mb-3">Añadir nueva tarjeta</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="cardNumber" className="text-xs text-gray-500 mb-1 block">
                      Número de tarjeta
                    </label>
                    <Input
                      id="cardNumber"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={handleInputChange}
                      className="border-[#4885C5]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardName" className="text-xs text-gray-500 mb-1 block">
                      Nombre en la tarjeta
                    </label>
                    <Input
                      id="cardName"
                      name="name"
                      placeholder="JUAN PEREZ"
                      value={newCard.name}
                      onChange={handleInputChange}
                      className="border-[#4885C5]/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cardExpiry" className="text-xs text-gray-500 mb-1 block">
                        Fecha de expiración
                      </label>
                      <Input
                        id="cardExpiry"
                        name="expiry"
                        placeholder="MM/YY"
                        value={newCard.expiry}
                        onChange={handleInputChange}
                        className="border-[#4885C5]/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="text-xs text-gray-500 mb-1 block">
                        CVC
                      </label>
                      <Input
                        id="cardCvc"
                        name="cvc"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={handleInputChange}
                        className="border-[#4885C5]/30"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-[#0A3B32]" onClick={handleAddCard}>
                      Guardar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                variant="outline"
                className="w-full border-dashed border-2 border-[#4885C5]/30 flex items-center gap-2 py-6"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} className="text-[#4885C5]" />
                <span>Añadir método de pago</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Finance Section */}
      <FinanceSection />
    </div>
  )
}
