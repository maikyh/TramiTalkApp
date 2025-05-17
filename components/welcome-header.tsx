"use client"

import { motion } from "framer-motion"
import TorreonLogo from "./torreon-logo"

export default function WelcomeHeader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0A3B32] to-[#24B649]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        className="text-center"
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
          <TorreonLogo className="w-16 h-16" />
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
          Torreón Siempre Puede
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
