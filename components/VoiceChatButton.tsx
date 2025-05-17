import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import ListeningOverlay from "./listening-overlay";

export default function VoiceChatButton() {
  const [isListening, setIsListening] = useState(false);
  const [showListeningOverlay, setShowListeningOverlay] = useState(false);
  const [conversationState, setConversationState] = useState("esperando"); // "esperando", "escuchando" o "hablando"
  const socketRef = useRef(null);
  const recognitionRef = useRef(null);
  const sessionId = useRef(Date.now().toString());
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Inicializar Socket.IO
    socketRef.current = io("http://localhost:8000");
    socketRef.current.on(
      "mensaje_agente",
      ({ session_id, texto }) => {
        if (session_id === sessionId.current) {
          setConversationState("hablando");
          enqueueAudio(texto);
        }
      }
    );

    // 2. Configurar SpeechRecognition
    const SpeechRecognitionConstructor =
      (window).SpeechRecognition || (window).webkitSpeechRecognition;
    if (SpeechRecognitionConstructor) {
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.lang = "es-ES";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        sendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Reconocimiento de voz no disponible");
    }

    return () => {
      socketRef.current?.disconnect();
      recognitionRef.current?.stop();
    };
  }, []);

  // Encola texto para TTS
  const enqueueAudio = (text) => {
    if (!text) return;
    audioQueueRef.current.push(text);
    if (!isPlayingRef.current) processAudioQueue();
  };

  // Procesa la cola de audio
  const processAudioQueue = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setConversationState("esperando");
      return;
    }
    
    isPlayingRef.current = true;
    const text = audioQueueRef.current.shift();

    try {
      const res = await fetch("http://localhost:8000/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => {
        URL.revokeObjectURL(url);
        processAudioQueue();
      };
      await audio.play();
    } catch (error) {
      console.error("Error en TTS:", error);
      processAudioQueue();
    }
  };

  // Envía mensaje al backend
  const sendMessage = (texto) => {
    if (!texto) return;
    socketRef.current?.emit("mensaje_usuario", {
      session_id: sessionId.current,
      texto,
    });
  };

  // Iniciar escucha desde el botón de esperando
  const startListening = () => {
    setConversationState("escuchando");
    setIsListening(true);
    recognitionRef.current?.start();
  };

  // Handlers de presión larga
  const handleMouseDown = () => {
    setShowListeningOverlay(true);
    setConversationState("esperando");
  };

  // Cerrar overlay manualmente
  const handleCloseOverlay = () => {
    setShowListeningOverlay(false);
    setIsListening(false);
    setConversationState("esperando");
    recognitionRef.current?.stop();
  };

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-10">
        <motion.button
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
            isListening
              ? "bg-gradient-to-r from-[#FF4333] to-[#D02030]"
              : "bg-gradient-to-r from-[#D02030] to-[#FF4333]"
          }`}
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(208,32,48,0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleMouseDown}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <motion.div
            animate={
              isListening
                ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(255,255,255,0.7)",
                      "0 0 0 10px rgba(255,255,255,0)",
                      "0 0 0 0 rgba(255,255,255,0)",
                    ],
                  }
                : {}
            }
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <Mic size={28} />
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>
        </motion.button>
      </div>

      <AnimatePresence>
        {showListeningOverlay && (
          <ListeningOverlay 
            conversationState={conversationState}
            onClose={handleCloseOverlay}
            onStartListening={startListening}
          />
        )}
      </AnimatePresence>
    </>
  );
}