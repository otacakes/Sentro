import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 group transition-all duration-200",
        className
      )}
      aria-label="Sentro Home"
    >
      <div
        className="w-10 h-10 rounded-full bg-background flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all border border-border dark:bg-neutral-900"
        style={{ minWidth: 40, minHeight: 40 }}
      >
        <Image
          src="/sentro.png"
          alt="Sentro Logo"
          width={40}
          height={40}
          priority
          className="object-contain"
        />
      </div>
      <span className="font-bold text-xl tracking-tight text-primary dark:text-white select-none">
        Sentro
      </span>
    </Link>
  )
} 