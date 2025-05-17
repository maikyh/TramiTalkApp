"use client"

import { motion } from "framer-motion"
import TorreonLogo from "./torreon-logo"

export default function WelcomeScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0A3B32] to-[#24B649] overflow-hidden">
      {/* Animación de partículas con CSS puro */}
      <div className="absolute inset-0 overflow-hidden">
        <CSSParticles />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        className="text-center z-10"
      >
        <motion.div
          className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-6"
          animate={{
            boxShadow: [
              "0px 0px 0px rgba(255,255,255,0)",
              "0px 0px 40px rgba(255,255,255,0.8)",
              "0px 0px 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <TorreonLogo className="w-20 h-20" />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-white mb-2"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          TramiTalk
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Torreón, Coahuila
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// Partículas CSS para el fondo
function CSSParticles() {
  return (
    <div className="relative w-full h-full">
      {Array.from({ length: 50 }).map((_, index) => {
        const size = Math.random() * 6 + 2
        const left = Math.random() * 100
        const top = Math.random() * 100
        const animationDuration = Math.random() * 20 + 10
        const delay = Math.random() * 5
        const opacity = Math.random() * 0.5 + 0.1

        // Colores de la paleta
        const colors = ["bg-white", "bg-[#4885C5]", "bg-[#D02030]", "bg-[#24B649]", "bg-[#CB4FCB]"]
        const color = colors[Math.floor(Math.random() * colors.length)]

        return (
          <motion.div
            key={index}
            className={`absolute rounded-full ${color}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [opacity, opacity * 1.5, opacity],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: animationDuration,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}
