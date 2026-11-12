"use client"

import React, { useState } from "react"
import { User } from "phosphor-react"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | number
export type AvatarShape = "circle" | "rounded" | "square"
export type AvatarStatus = "online" | "offline" | "away" | "busy"
export type AvatarFallbackType = "icon" | "initials"

export interface ReusableAvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  bgColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: number | string
  showBorder?: boolean
  fallbackType?: AvatarFallbackType
  status?: AvatarStatus
  className?: string
  onClick?: () => void
  title?: string
}

export default function ReusableAvatar({
  src,
  alt = "Avatar",
  name,
  size = "md",
  shape = "circle",
  bgColor = "#F1F0FD",
  textColor = "#5B50EC",
  borderColor = "rgba(91, 80, 236, 0.3)",
  borderWidth = 2,
  showBorder = false,
  fallbackType = "icon",
  status,
  className = "",
  onClick,
  title,
}: ReusableAvatarProps) {
  const [imageError, setImageError] = useState(false)

  const getSizeStyles = (sz: AvatarSize) => {
    if (typeof sz === "number") {
      return {
        width: `${sz}px`,
        height: `${sz}px`,
        fontSize: `${Math.round(sz * 0.4)}px`,
        iconSize: Math.round(sz * 0.5),
      }
    }
    switch (sz) {
      case "xs":
        return { width: "24px", height: "24px", fontSize: "10px", iconSize: 13 }
      case "sm":
        return { width: "32px", height: "32px", fontSize: "12px", iconSize: 16 }
      case "lg":
        return { width: "48px", height: "48px", fontSize: "18px", iconSize: 24 }
      case "xl":
        return { width: "64px", height: "64px", fontSize: "24px", iconSize: 32 }
      case "md":
      default:
        return { width: "40px", height: "40px", fontSize: "14px", iconSize: 20 }
    }
  }

  const getShapeClass = () => {
    switch (shape) {
      case "square":
        return "rounded-none"
      case "rounded":
        return "rounded-2xl"
      case "circle":
      default:
        return "rounded-full"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-emerald-500"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-amber-500"
      case "offline":
      default:
        return "bg-gray-400"
    }
  }

  const { width, height, fontSize, iconSize } = getSizeStyles(size)
  const getInitials = (n: string) => {
    const cleaned = n.replace(/[\(\)\[\]\{\}\<\>]/g, "").trim()
    const parts = cleaned.split(/\s+/)
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
    }
    return cleaned.slice(0, 2).toUpperCase()
  }
  const initial = name ? getInitials(name) : null
  const hasImage = Boolean(src && !imageError)

  const borderStyle = showBorder
    ? {
        borderWidth: typeof borderWidth === "number" ? `${borderWidth}px` : borderWidth,
        borderStyle: "solid",
        borderColor: borderColor,
      }
    : {}

  return (
    <div
      style={{ width, height, ...borderStyle }}
      onClick={onClick}
      title={title || name || alt}
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none overflow-hidden ${getShapeClass()} ${
        onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
      } ${className}`}
    >
      <div
        style={{
          backgroundColor: hasImage ? "transparent" : bgColor,
        }}
        className={`w-full h-full flex items-center justify-center ${getShapeClass()} overflow-hidden`}
      >
        {hasImage ? (
          <img
            src={src!}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : fallbackType === "initials" && initial ? (
          <span style={{ color: textColor, fontSize }} className="font-bold">
            {initial}
          </span>
        ) : (
          <span style={{ color: textColor }} className="flex items-center justify-center">
            <User size={iconSize || 20} weight="bold" />
          </span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${getStatusColor()}`}
        />
      )}
    </div>
  )
}
