"use client"

import { useState } from "react"
import { Palette, Check, X, RotateCcw } from "lucide-react"
import { useTheme } from "./theme-provider"

export default function ColorCustomizer() {
  const { accentColor, setAccentColor, presetColors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(accentColor.primary)

  const handlePresetColorSelect = (color: (typeof presetColors)[0]) => {
    setAccentColor(color)
  }

  const handleCustomColorApply = () => {
    const customAccentColor = {
      name: "Custom",
      primary: customColor,
      secondary: `${customColor}10`, // Add transparency for secondary
      hover: adjustBrightness(customColor, -20),
    }
    setAccentColor(customAccentColor)
  }

  const resetToDefault = () => {
    const defaultColor = presetColors[0] // Blue is the default
    setAccentColor(defaultColor)
    setCustomColor(defaultColor.primary)
  }

  // Helper function to adjust color brightness
  function adjustBrightness(hex: string, percent: number) {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-label="Customize accent colors"
        style={{ color: accentColor.primary }}
      >
        <Palette className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Color Picker Panel */}
          <div className="absolute right-0 top-12 z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-tourney text-lg font-semibold text-gray-900 dark:text-white">Customize Colors</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Current Color Display */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600 shadow-sm"
                  style={{ backgroundColor: accentColor.primary }}
                />
                <div>
                  <p className="font-tourney font-medium text-gray-900 dark:text-white">{accentColor.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{accentColor.primary.toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Preset Colors */}
            <div className="mb-6">
              <h4 className="font-tourney font-medium text-gray-900 dark:text-white mb-3">Preset Colors</h4>
              <div className="grid grid-cols-4 gap-3">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handlePresetColorSelect(color)}
                    className="relative group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    title={color.name}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600 shadow-sm mx-auto"
                      style={{ backgroundColor: color.primary }}
                    />
                    {accentColor.primary === color.primary && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">{color.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Picker */}
            <div className="mb-6">
              <h4 className="font-tourney font-medium text-gray-900 dark:text-white mb-3">Custom Color</h4>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  placeholder="#3b82f6"
                />
                <button
                  onClick={handleCustomColorApply}
                  className="px-4 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg font-tourney font-medium transition-colors text-sm"
                  style={{
                    backgroundColor: customColor,
                    borderColor: customColor,
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={resetToDefault}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-tourney font-medium"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
