"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"
import { Mic } from "lucide-react"
import { motion } from "framer-motion"

// Componente optimizado para evitar pérdida de contexto
function Scene({ isListening }: { isListening: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { gl } = useThree()

  // Configurar opciones para prevenir pérdida de contexto
  useEffect(() => {
    if (gl) {
      // Reducir la calidad de renderizado para mejorar el rendimiento
      gl.setPixelRatio(1)
      gl.setClearColor(0x000000, 0)
    }

    // Función de limpieza
    return () => {
      if (gl && gl.dispose) {
        gl.dispose()
      }
    }
  }, [gl])

  useFrame((state) => {
    if (meshRef.current) {
      // Animación simple
      meshRef.current.rotation.y += 0.01

      // Pulso si está escuchando
      if (isListening) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05
        meshRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05
        meshRef.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.05
      }
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={isListening ? "#FF4333" : "#D02030"} />
    </mesh>
  )
}

interface ThreeDButtonProps {
  onClick: () => void
  isListening: boolean
}

export default function ThreeDButton({ onClick, isListening }: ThreeDButtonProps) {
  const [hasError, setHasError] = useState(false)

  // Si hay un error, mostrar el botón de fallback
  if (hasError) {
    return <FallbackButton onClick={onClick} isListening={isListening} />
  }

  return (
    <motion.div
      className="w-16 h-16 cursor-pointer relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <ErrorBoundary onError={() => setHasError(true)}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: true,
            alpha: true,
          }}
          dpr={1}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene isListening={isListening} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
          <Mic size={24} />
        </div>
      </ErrorBoundary>
    </motion.div>
  )
}

// Componente para manejar errores en WebGL
function ErrorBoundary({ children, onError }: { children: React.ReactNode; onError: () => void }) {
  useEffect(() => {
    const handleError = () => {
      onError()
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleError)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleError)
    }
  }, [onError])

  return <>{children}</>
}

// Botón de fallback sin WebGL
function FallbackButton({ onClick, isListening }: { onClick: () => void; isListening: boolean }) {
  return (
    <motion.button
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
        isListening ? "bg-gradient-to-r from-[#FF4333] to-[#D02030]" : "bg-gradient-to-r from-[#D02030] to-[#FF4333]"
      }`}
      whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(208, 32, 48, 0.5)" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <motion.div
        animate={isListening ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
      >
        <Mic size={28} />
      </motion.div>
    </motion.button>
  )
}
