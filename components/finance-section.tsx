"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for the charts
const monthlyExpenses = [
  { name: "Ene", tramites: 1200, servicios: 800, otros: 400 },
  { name: "Feb", tramites: 900, servicios: 1200, otros: 300 },
  { name: "Mar", tramites: 1500, servicios: 1000, otros: 200 },
  { name: "Abr", tramites: 800, servicios: 1100, otros: 500 },
  { name: "May", tramites: 1300, servicios: 900, otros: 300 },
  { name: "Jun", tramites: 1100, servicios: 1300, otros: 400 },
]

const expensesByCategory = [
  { name: "Trámites", value: 5800, color: "#0A3B32" },
  { name: "Servicios", value: 6300, color: "#24B649" },
  { name: "Otros", value: 2100, color: "#4885C5" },
]

export default function FinanceSection() {
  const [activeTab, setActiveTab] = useState("mensual")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-[#0A3B32]">Finanzas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mensual" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="mensual">Gastos Mensuales</TabsTrigger>
            <TabsTrigger value="categoria">Por Categoría</TabsTrigger>
          </TabsList>

          <TabsContent value="mensual" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyExpenses} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, undefined]}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="tramites" name="Trámites" fill="#0A3B32" />
                  <Bar dataKey="servicios" name="Servicios" fill="#24B649" />
                  <Bar dataKey="otros" name="Otros" fill="#4885C5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-gray-500 text-center">Gastos mensuales por categoría (últimos 6 meses)</div>
          </TabsContent>

          <TabsContent value="categoria" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {expensesByCategory.map((category, index) => (
                <div key={index} className={`p-3 rounded-lg bg-${category.color}/10 flex items-center`}>
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                  <div>
                    <p className="text-xs text-gray-500">{category.name}</p>
                    <p className="font-medium">${category.value.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">Resumen de Gastos</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#0A3B32]/10 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Trámites</p>
              <p className="font-medium">$5,800</p>
            </div>
            <div className="bg-[#24B649]/10 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Servicios</p>
              <p className="font-medium">$6,300</p>
            </div>
            <div className="bg-[#4885C5]/10 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-medium">$14,200</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
