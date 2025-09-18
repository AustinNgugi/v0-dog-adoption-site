
import * as React from "react"

export function Badge({ children, className, variant }: { children?: React.ReactNode; className?: string; variant?: string }) {
  const base = "inline-block px-2 py-0.5 rounded text-sm"
  const v = variant === "secondary" ? "bg-secondary text-secondary-foreground" : variant === "outline" ? "border" : "bg-muted"
  return <span className={`${base} ${v} ${className || ""}`}>{children}</span>
}
