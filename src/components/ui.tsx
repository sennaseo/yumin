import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react';

/* ── FadeIn: 화면에 들어오면 한 번만 ── */
const motionCache = new Map<ElementType, ElementType>();
function motionOf(tag: ElementType): ElementType {
  if (!motionCache.has(tag)) motionCache.set(tag, motion.create(tag as never) as ElementType);
  return motionCache.get(tag)!;
}

type FadeInProps = {
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function FadeIn({ as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className, style, children }: FadeInProps) {
  const M = motionOf(as);
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </M>
  );
}

/* ── Magnet: 커서가 padding 거리 안에 들어오면 따라온다 ── */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const near = Math.abs(e.clientX - cx) < r.width / 2 + padding && Math.abs(e.clientY - cy) < r.height / 2 + padding;
      setPos(near ? { x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength, active: true } : { x: 0, y: 0, active: false });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/* ── 이미지 또는 자리 표시 (src 가 비면 회색 자리) ── */
export function Img({ src, label, pos = 'object-top' }: { src: string; label: string; pos?: string }) {
  if (src) return <img src={src} alt={label} loading="lazy" className={`block w-full h-full object-cover ${pos}`} />;
  return (
    <div className="ph">
      <div>
        {label}
        <small>이미지 교체</small>
      </div>
    </div>
  );
}

/* ── 버튼 ── */
export function ContactButton({ href = '#contact', children = 'Contact Me' }: { href?: string; children?: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-block rounded-full text-white font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition hover:brightness-110"
      style={{
        background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #fff',
        outlineOffset: '-3px',
      }}
    >
      {children}
    </a>
  );
}

export function LiveProjectButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[rgba(215,226,234,.1)]"
    >
      {children}
    </a>
  );
}
