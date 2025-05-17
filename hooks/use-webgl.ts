"use client"

import { useState, useEffect } from "react"

export function useWebGLAvailable() {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [contextLossCount, setContextLossCount] = useState(0)

  useEffect(() => {
    let canvas: HTMLCanvasElement | null = null
    let gl: WebGLRenderingContext | null = null
    let mounted = true

    const checkWebGL = () => {
      try {
        // Crear un canvas temporal para verificar WebGL
        canvas = document.createElement("canvas")

        // Intentar obtener el contexto WebGL con opciones para prevenir pérdida de contexto
        gl = canvas.getContext("webgl", {
          powerPreference: "high-performance",
          desynchronized: false,
          preserveDrawingBuffer: true,
          antialias: false,
          depth: true,
          stencil: false,
          alpha: true,
          premultipliedAlpha: true,
        }) as WebGLRenderingContext | null

        if (gl && mounted) {
          // Verificar si el contexto es válido
          const isValid = gl.getParameter(gl.VERSION) !== null
          setIsWebGLAvailable(isValid)

          // Escuchar eventos de pérdida de contexto
          canvas.addEventListener("webglcontextlost", handleContextLost, false)
        } else if (mounted) {
          setIsWebGLAvailable(false)
        }
      } catch (e) {
        console.error("Error al verificar WebGL:", e)
        if (mounted) {
          setIsWebGLAvailable(false)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn("WebGL context lost")
      if (mounted) {
        setContextLossCount((prev) => prev + 1)

        // Si se pierde el contexto más de 3 veces, desactivar WebGL
        if (contextLossCount >= 3) {
          setIsWebGLAvailable(false)
        }
      }
    }

    // Verificar WebGL después de un pequeño retraso para asegurar que el DOM esté listo
    const timer = setTimeout(checkWebGL, 100)

    return () => {
      mounted = false
      clearTimeout(timer)

      // Limpiar eventos y recursos
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost)
      }

      // Liberar contexto WebGL
      if (gl) {
        const loseContextExt = gl.getExtension("WEBGL_lose_context")
        if (loseContextExt) {
          loseContextExt.loseContext()
        }
      }
    }
  }, [contextLossCount])

  return { isWebGLAvailable, isLoading, contextLossCount }
}
