"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ColorTheme = "default" | "ocean" | "sunset" | "forest"

type Preferences = {
  darkMode: boolean
  notifications: boolean
  soundEffects: boolean
  language: string
  volume: number[]
  biometricAuth: boolean
  colorTheme: ColorTheme
}

type PreferencesContextType = {
  preferences: Preferences
  updatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void
  toggleDarkMode: () => void
  setColorTheme: (theme: ColorTheme) => void
}

const defaultPreferences: Preferences = {
  darkMode: false,
  notifications: true,
  soundEffects: true,
  language: "es",
  volume: [70],
  biometricAuth: true,
  colorTheme: "default",
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [mounted, setMounted] = useState(false)

  // Cargar preferencias desde localStorage al iniciar
  useEffect(() => {
    const savedPrefs = localStorage.getItem("tramitalk-preferences")
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs))
      } catch (e) {
        console.error("Error parsing preferences:", e)
      }
    }
    setMounted(true)
  }, [])

  // Aplicar modo oscuro
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (preferences.darkMode) {
      root.classList.add("dark")
      document.body.classList.add("dark")
    } else {
      root.classList.remove("dark")
      document.body.classList.remove("dark")
    }
  }, [preferences.darkMode, mounted])

  // Aplicar tema de color
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // Eliminar clases de tema anteriores
    root.classList.remove("theme-default", "theme-ocean", "theme-sunset", "theme-forest")

    // Añadir la clase del tema actual
    root.classList.add(`theme-${preferences.colorTheme}`)

    // Aplicar colores según el tema
    switch (preferences.colorTheme) {
      case "ocean":
        document.documentElement.style.setProperty("--primary", "195 100% 40%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--ring", "195 100% 40%")
        break
      case "sunset":
        document.documentElement.style.setProperty("--primary", "20 100% 50%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--ring", "20 100% 50%")
        break
      case "forest":
        document.documentElement.style.setProperty("--primary", "120 50% 30%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--ring", "120 50% 30%")
        break
      default:
        document.documentElement.style.setProperty("--primary", "142 76% 36%")
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%")
        document.documentElement.style.setProperty("--ring", "142 76% 36%")
    }
  }, [preferences.colorTheme, mounted])

  // Guardar preferencias cuando cambian
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("tramitalk-preferences", JSON.stringify(preferences))
  }, [preferences, mounted])

  // Actualizar una preferencia específica
  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    setPreferences((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }))
  }

  // Establecer tema de color
  const setColorTheme = (theme: ColorTheme) => {
    setPreferences((prev) => ({
      ...prev,
      colorTheme: theme,
    }))
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreference, toggleDarkMode, setColorTheme }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
