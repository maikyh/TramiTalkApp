"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { Suspense } from "react"

// Componente simplificado para el logo 3D
function Logo({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Text
        color="white"
        fontSize={1}
        font="/fonts/Inter_Bold.ttf"
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        TramiTalk
      </Text>
    </group>
  )
}

interface ThreeDLogoProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  className?: string
}

export default function ThreeDLogo({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  className,
}: ThreeDLogoProps) {
  return (
    <div className={className || "w-full h-full"}>
      <ErrorBoundary
        fallback={<div className="w-full h-full flex items-center justify-center text-white">TramiTalk</div>}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Logo scale={scale} position={position} rotation={rotation} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
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
