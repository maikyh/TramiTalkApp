"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Bell, Moon, Sun, Volume2, Languages, Lock, Save } from "lucide-react"
import TorreonLogo from "@/components/torreon-logo"
import { useToast } from "@/hooks/use-toast"
import { usePreferences } from "@/contexts/preferences-context"

// Tipo para las preferencias
type ColorTheme = "default" | "ocean" | "sunset" | "forest"

export default function PreferenciasPage() {
  const { toast } = useToast()
  const { preferences, updatePreference } = usePreferences()
  const [testSound, setTestSound] = useState<HTMLAudioElement | null>(null)

  // Inicializar el sonido de prueba
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sound = new Audio("/notification-sound.mp3")
      sound.volume = preferences.volume[0] / 100
      setTestSound(sound)
    }
  }, [])

  // Actualizar volumen del sonido cuando cambia
  useEffect(() => {
    if (testSound) {
      testSound.volume = preferences.volume[0] / 100
    }
  }, [preferences.volume, testSound])

  // Función para manejar cambios en los switches
  const handleSwitchChange = (name: keyof typeof preferences) => {
    const newValue = !preferences[name]
    updatePreference(name, newValue)

    // Efectos especiales según la configuración cambiada
    if (name === "soundEffects" && newValue && testSound) {
      testSound.play().catch((e) => console.error("Error playing sound:", e))
    }

    if (name === "notifications") {
      if (newValue) {
        toast({
          title: "Notificaciones activadas",
          description: "Recibirás alertas sobre tus trámites",
        })
      } else {
        toast({
          title: "Notificaciones desactivadas",
          description: "No recibirás alertas sobre tus trámites",
          variant: "destructive",
        })
      }
    }
  }

  // Función para manejar cambios en el volumen
  const handleVolumeChange = (value: number[]) => {
    updatePreference("volume", value)

    // Reproducir sonido de prueba si los efectos de sonido están activados
    if (preferences.soundEffects && testSound) {
      testSound.currentTime = 0
      testSound.play().catch((e) => console.error("Error playing sound:", e))
    }
  }

  // Función para manejar cambios en los selects
  const handleSelectChange = (name: "language" | "colorTheme", value: string) => {
    updatePreference(name, value)

    // Efectos especiales según la configuración cambiada
    if (name === "language") {
      const messages = {
        es: "Idioma cambiado a Español",
        en: "Language changed to English",
        fr: "Langue changée en Français",
      }

      toast({
        title: messages[value as keyof typeof messages] || "Idioma cambiado",
        description: "",
      })
    }

    if (name === "colorTheme") {
      toast({
        title: "Tema cambiado",
        description: `Tema visual actualizado a ${value}`,
      })
    }
  }

  // Función para guardar preferencias
  const handleSavePreferences = () => {
    // Mostrar toast de confirmación
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias han sido actualizadas correctamente",
      variant: "success",
    })
  }

  // Función para probar el sonido
  const playTestSound = () => {
    if (testSound && preferences.soundEffects) {
      testSound.currentTime = 0
      testSound.play().catch((e) => console.error("Error playing sound:", e))
    }
  }

  // Textos según el idioma seleccionado
  const texts = {
    es: {
      title: "Preferencias",
      darkMode: "Modo oscuro",
      darkModeDesc: "Cambiar apariencia de la aplicación",
      notifications: "Notificaciones",
      notificationsDesc: "Recibir alertas de trámites y pagos",
      soundEffects: "Efectos de sonido",
      soundEffectsDesc: "Sonidos al realizar acciones",
      volume: "Volumen",
      volumeDesc: "Ajustar nivel de volumen",
      language: "Idioma",
      languageDesc: "Seleccionar idioma de la aplicación",
      biometricAuth: "Autenticación biométrica",
      biometricAuthDesc: "Usar huella digital o Face ID",
      colorTheme: "Tema de color",
      colorThemeDesc: "Personalizar colores de la aplicación",
      save: "Guardar preferencias",
      testSound: "Probar sonido",
    },
    en: {
      title: "Preferences",
      darkMode: "Dark mode",
      darkModeDesc: "Change app appearance",
      notifications: "Notifications",
      notificationsDesc: "Receive alerts for procedures and payments",
      soundEffects: "Sound effects",
      soundEffectsDesc: "Sounds when performing actions",
      volume: "Volume",
      volumeDesc: "Adjust volume level",
      language: "Language",
      languageDesc: "Select app language",
      biometricAuth: "Biometric authentication",
      biometricAuthDesc: "Use fingerprint or Face ID",
      colorTheme: "Color theme",
      colorThemeDesc: "Customize app colors",
      save: "Save preferences",
      testSound: "Test sound",
    },
    fr: {
      title: "Préférences",
      darkMode: "Mode sombre",
      darkModeDesc: "Changer l'apparence de l'application",
      notifications: "Notifications",
      notificationsDesc: "Recevoir des alertes pour les procédures et les paiements",
      soundEffects: "Effets sonores",
      soundEffectsDesc: "Sons lors de l'exécution d'actions",
      volume: "Volume",
      volumeDesc: "Ajuster le niveau du volume",
      language: "Langue",
      languageDesc: "Sélectionner la langue de l'application",
      biometricAuth: "Authentification biométrique",
      biometricAuthDesc: "Utiliser l'empreinte digitale ou Face ID",
      colorTheme: "Thème de couleur",
      colorThemeDesc: "Personnaliser les couleurs de l'application",
      save: "Enregistrer les préférences",
      testSound: "Tester le son",
    },
  }

  // Usar el idioma seleccionado o español por defecto
  const t = texts[preferences.language as keyof typeof texts] || texts.es

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto">
        <div>
          <Card className="rounded-xl overflow-hidden shadow-lg border-none">
            {/* Header con Logo de Torreón */}
            <div className="bg-gradient-to-r from-[#0A3B32] to-[#24B649] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 mr-1"
                  onClick={() => (window.location.href = "/")}
                >
                  <ChevronLeft size={24} />
                </Button>
                <TorreonLogo className="h-10 w-10" />
                <div>
                  <h1 className="text-xl font-bold">{t.title}</h1>
                  <p className="text-xs opacity-80">TramiTalk - Torreón</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleSavePreferences}
              >
                <Save size={20} />
              </Button>
            </div>

            {/* Lista de preferencias */}
            <div className="p-4">
              <div className="space-y-6">
                {/* Modo oscuro */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    {preferences.darkMode ? (
                      <Moon size={24} className="text-blue-500" />
                    ) : (
                      <Sun size={24} className="text-orange-500" />
                    )}
                    <div>
                      <h3 className="font-medium">{t.darkMode}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.darkModeDesc}</p>
                    </div>
                  </div>
                  <Switch checked={preferences.darkMode} onCheckedChange={() => handleSwitchChange("darkMode")} />
                </div>

                {/* Notificaciones */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell size={24} className="text-red-500 dark:text-red-400" />
                    <div>
                      <h3 className="font-medium">{t.notifications}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.notificationsDesc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={() => handleSwitchChange("notifications")}
                  />
                </div>

                {/* Efectos de sonido */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Volume2 size={24} className="text-green-500 dark:text-green-400" />
                    <div>
                      <h3 className="font-medium">{t.soundEffects}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.soundEffectsDesc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.soundEffects}
                    onCheckedChange={() => handleSwitchChange("soundEffects")}
                  />
                </div>

                {/* Volumen */}
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 size={24} className="text-purple-500 dark:text-purple-400" />
                    <div>
                      <h3 className="font-medium">{t.volume}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.volumeDesc}: {preferences.volume[0]}%
                      </p>
                    </div>
                  </div>
                  <Slider
                    value={preferences.volume}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="mt-2"
                  />
                  <div className="mt-2 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={playTestSound}
                      disabled={!preferences.soundEffects}
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      {t.testSound}
                    </Button>
                  </div>
                </div>

                {/* Idioma */}
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Languages size={24} className="text-blue-500 dark:text-blue-400" />
                    <div>
                      <h3 className="font-medium">{t.language}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.languageDesc}</p>
                    </div>
                  </div>
                  <Select value={preferences.language} onValueChange={(value) => handleSelectChange("language", value)}>
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                      <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Autenticación biométrica (visual solamente) */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lock size={24} className="text-gray-700 dark:text-gray-300" />
                    <div>
                      <h3 className="font-medium">{t.biometricAuth}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.biometricAuthDesc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.biometricAuth}
                    onCheckedChange={() => handleSwitchChange("biometricAuth")}
                    disabled={true} // Deshabilitado como solicitado
                  />
                </div>
              </div>
            </div>

            {/* Botón para guardar */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700">
              <Button
                className="w-full flex items-center gap-2 text-white bg-[#0A3B32] hover:bg-[#0A3B32]/90"
                onClick={handleSavePreferences}
              >
                <Save size={16} />
                {t.save}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
