"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Text, Environment } from "@react-three/drei"
import { Suspense } from "react"

// Componente simplificado para la pantalla de bienvenida 3D
function SimpleFloatingIcons() {
  const icons = [
    { position: [3, 2, -5], icon: "📄" },
    { position: [-4, 1, -3], icon: "💳" },
    { position: [4, -2, -4], icon: "🏠" },
    { position: [-3, -3, -5], icon: "🚗" },
  ]

  return (
    <>
      {icons.map((icon, index) => (
        <Text
          key={index}
          position={icon.position}
          color="white"
          fontSize={1.5}
          font="/fonts/Inter_Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {icon.icon}
        </Text>
      ))}
    </>
  )
}

export default function ThreeDWelcome() {
  return (
    <ErrorBoundary fallback={<div className="fixed inset-0 bg-gradient-to-b from-[#0A3B32] to-[#24B649]" />}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <SimpleFloatingIcons />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}

// Componente para manejar errores en WebGL
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    // Verificar si WebGL está disponible
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) {
      console.warn("WebGL no está disponible en este navegador")
      return <>{fallback}</>
    }

    return <>{children}</>
  } catch (e) {
    console.error("Error al inicializar WebGL:", e)
    return <>{fallback}</>
  }
}
