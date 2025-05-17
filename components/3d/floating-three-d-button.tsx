"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Mic } from "lucide-react"
import { motion } from "framer-motion"

// Componente simplificado para el botón 3D
function SimpleSphere({ isListening }: { isListening: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={isListening ? "#FF4333" : "#D02030"}
        emissive={isListening ? "#FF4333" : "#D02030"}
        emissiveIntensity={isListening ? 0.5 : 0.2}
      />
    </mesh>
  )
}

interface FloatingThreeDButtonProps {
  onClick: () => void
  isListening: boolean
}

export default function FloatingThreeDButton({ onClick, isListening }: FloatingThreeDButtonProps) {
  return (
    <motion.div
      className="w-16 h-16 cursor-pointer relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <ErrorBoundary
        fallback={
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D02030] to-[#FF4333] flex items-center justify-center text-white shadow-lg">
            <Mic size={28} />
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <SimpleSphere isListening={isListening} />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
          <Mic size={24} />
        </div>
      </ErrorBoundary>
    </motion.div>
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
