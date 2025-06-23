import Link from 'next/link'
import { Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        <Compass className="w-5 h-5" />
      </div>
      <span className="font-bold text-lg tracking-tight text-primary">Commuter's Companion</span>
    </Link>
  )
} 