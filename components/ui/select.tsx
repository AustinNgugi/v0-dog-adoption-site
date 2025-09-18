"use client"

import * as React from "react"

type SelectProps = {
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children?: React.ReactNode
}

export function Select({ value, onValueChange, className, children }: SelectProps) {
  // Collect SelectItem children from the arbitrary nested children structure
  const items: Array<React.ReactElement & { props: any }> = []

  const walk = (node: any) => {
    if (!node) return
    if (Array.isArray(node)) return node.forEach(walk)
    if (node?.type && (node.type as any).__SELECT_ITEM) {
      items.push(node)
      return
    }
    if (node?.props?.children) walk(node.props.children)
  }

  walk(children)

  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={className || "border px-2 py-1 rounded"}
    >
      {items.map((it, i) => (
        <option key={i} value={it.props.value}>
          {it.props.children}
        </option>
      ))}
    </select>
  )
}

export function SelectTrigger(props: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} />
}

export function SelectValue({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) {
  return <span>{children ?? placeholder}</span>
}

export function SelectContent(props: { children?: React.ReactNode }) {
  return <div {...(props as any)} />
}

export function SelectItem({ children, value, className }: { children?: React.ReactNode; value?: string; className?: string }) {
  // Render nothing; Select collects these via the static marker
  return <div data-value={value} className={className}>
    {children}
  </div>
}

;(SelectItem as any).__SELECT_ITEM = true
