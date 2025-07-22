"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface AccentColor {
  name: string
  primary: string
  secondary: string
  hover: string
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  presetColors: AccentColor[]
}

const defaultAccentColor: AccentColor = {
  name: "Blue",
  primary: "#3b82f6",
  secondary: "#eff6ff",
  hover: "#2563eb",
}

const presetColors: AccentColor[] = [
  {
    name: "Blue",
    primary: "#3b82f6",
    secondary: "#eff6ff",
    hover: "#2563eb",
  },
  {
    name: "Purple",
    primary: "#8b5cf6",
    secondary: "#f3f4f6",
    hover: "#7c3aed",
  },
  {
    name: "Green",
    primary: "#10b981",
    secondary: "#ecfdf5",
    hover: "#059669",
  },
  {
    name: "Orange",
    primary: "#f59e0b",
    secondary: "#fffbeb",
    hover: "#d97706",
  },
  {
    name: "Pink",
    primary: "#ec4899",
    secondary: "#fdf2f8",
    hover: "#db2777",
  },
  {
    name: "Indigo",
    primary: "#6366f1",
    secondary: "#eef2ff",
    hover: "#4f46e5",
  },
  {
    name: "Teal",
    primary: "#14b8a6",
    secondary: "#f0fdfa",
    hover: "#0d9488",
  },
  {
    name: "Red",
    primary: "#ef4444",
    secondary: "#fef2f2",
    hover: "#dc2626",
  },
]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultAccentColor)

  useEffect(() => {
    // Theme (light/dark)
    const savedTheme = window.localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  useEffect(() => {
    // Accent color
    const savedAccent = window.localStorage.getItem("accentColor")
    if (savedAccent) {
      try {
        setAccentColorState(JSON.parse(savedAccent))
      } catch (e) {
        console.error("Failed to parse stored accentColor:", e)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem("accentColor", JSON.stringify(accentColor))
    document.documentElement.style.setProperty("--accent-primary", accentColor.primary)
    document.documentElement.style.setProperty("--accent-secondary", accentColor.secondary)
    document.documentElement.style.setProperty("--accent-hover", accentColor.hover)
  }, [accentColor])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, setAccentColor, presetColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
