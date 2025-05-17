"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Suspense } from "react"

// Componente simplificado para evitar problemas con WebGL
function SimpleParticles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={new Float32Array(300)}
          itemSize={3}
          onUpdate={(self) => {
            const arr = self.array as Float32Array
            for (let i = 0; i < arr.length; i += 3) {
              arr[i] = (Math.random() - 0.5) * 20
              arr[i + 1] = (Math.random() - 0.5) * 20
              arr[i + 2] = (Math.random() - 0.5) * 20
            }
          }}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

// Fondo simple
function GradientBackground() {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#f5f5f7" opacity={0.8} transparent />
    </mesh>
  )
}

export default function ThreeDBackground() {
  return (
    <ErrorBoundary fallback={<div className="fixed inset-0 bg-gradient-to-b from-[#f5f5f7] to-white" />}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <GradientBackground />
          <SimpleParticles />
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
