import { motion, AnimatePresence } from "framer-motion"
import { Mic, X, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ListeningOverlayProps {
  conversationState?: "esperando" | "escuchando" | "hablando";
  onClose: () => void;
  onContinue?: () => void;
  onStartListening?: () => void;
}

export default function ListeningOverlay({ 
  conversationState = "esperando", 
  onClose, 
  onContinue,
  onStartListening 
}: ListeningOverlayProps) {
  const isWaiting = conversationState === "esperando";
  const isListening = conversationState === "escuchando";
  const isSpeaking = conversationState === "hablando";
  
  const statusText = isWaiting
    ? "Esperando..."
    : isListening
    ? "Escuchando..."
    : isSpeaking
    ? "Hablando..."
    : ""

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-[#0A3B32] to-[#24B649] z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Botón de cerrar */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X size={24} />
      </Button>

      {/* Contenido central */}
      <div className="text-center">
        {/* Círculo animado del micrófono o altavoz - solo visible cuando NO está en espera */}
        {!isWaiting && (
          <div className="relative mb-8">
            <motion.div
              className="w-32 h-32 bg-white/10 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />
            <motion.div
              className="w-24 h-24 bg-white/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: 0.2,
              }}
            />
            <motion.div
              className={`w-20 h-20 ${isListening ? 'bg-[#D02030]' : 'bg-[#2563EB]'} rounded-full flex items-center justify-center relative z-10`}
              animate={{
                boxShadow: [
                  `0 0 0 0 ${isListening ? 'rgba(208, 32, 48, 0.7)' : 'rgba(37, 99, 235, 0.7)'}`,
                  `0 0 20px 10px ${isListening ? 'rgba(208, 32, 48, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`,
                  `0 0 0 0 ${isListening ? 'rgba(208, 32, 48, 0.7)' : 'rgba(37, 99, 235, 0.7)'}`,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            >
              {isListening ? (
                <Mic size={40} className="text-white" />
              ) : (
                <Volume2 size={40} className="text-white" />
              )}
            </motion.div>
          </div>
        )}

        {/* Texto de estado - solo mostrar cuando NO está en espera */}
        {!isWaiting && (
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            {statusText}
          </motion.h2>
        )}

        {/* Ondas de audio (diferentes para escuchando y hablando) - solo cuando NO está en espera */}
        {!isWaiting && (
          <div className="flex items-center justify-center gap-1 h-12">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-white rounded-full"
                animate={{
                  height: isListening 
                    ? [`${Math.random() * 10 + 5}px`, `${Math.random() * 30 + 10}px`, `${Math.random() * 10 + 5}px`]
                    : isSpeaking 
                      ? [`${Math.random() * 10 + 5}px`, `${Math.random() * 25 + 15}px`, `${Math.random() * 10 + 5}px`]
                      : "5px",
                }}
                transition={{
                  repeat: Infinity,
                  duration: isListening ? 0.8 : 0.6,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        )}

        {/* Texto de instrucción - solo visible en modos no-espera */}
        {!isWaiting && (
          <motion.p
            className="text-white/80 mt-8 max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isListening
              ? "Dime en qué puedo ayudarte con tus trámites administrativos"
              : isSpeaking
              ? "Procesando respuesta..."
              : ""}
          </motion.p>
        )}

        {/* Botón de micrófono grande para iniciar escucha (solo visible en modo esperando) */}
        {isWaiting && onStartListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <motion.button
              onClick={onStartListening}
              className="bg-[#D02030] hover:bg-[#FF4333] text-white w-40 h-40 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <Mic size={60} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => {
          const size = Math.random() * 6 + 2
          const left = Math.random() * 100
          const top = Math.random() * 100
          const delay = Math.random() * 5

          return (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white/30"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                delay,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}