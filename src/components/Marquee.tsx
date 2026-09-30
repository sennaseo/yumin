import { useEffect, useRef, type RefObject } from 'react';
import { Img } from './ui';
import { MARQUEE_ROW1, MARQUEE_ROW2, type Shot } from '../images';

type Tile = Shot;
const triple = (a: Tile[]) => [...a, ...a, ...a];
const ROW1 = triple(MARQUEE_ROW1);
const ROW2 = triple(MARQUEE_ROW2);

function Row({ items, rowRef }: { items: Tile[]; rowRef: RefObject<HTMLDivElement> }) {
  return (
    <div ref={rowRef} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
      {items.map((t, i) => (
        <div
          key={i}
          className={`flex-none h-[193px] sm:h-[270px] rounded-2xl overflow-hidden bg-white ${
            t.kind === 'wide' ? 'w-[300px] sm:w-[420px]' : 'w-[120px] sm:w-[170px]'
          }`}
        >
          <Img src={t.src} label={t.label} pos={t.kind === 'wide' ? 'object-left-top' : 'object-top'} />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const section = useRef<HTMLElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!section.current || !r1.current || !r2.current) return;
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      r1.current.style.transform = `translate3d(${offset - 200}px,0,0)`;
      r2.current.style.transform = `translate3d(${-(offset - 200)}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={section} aria-label="작업 화면" className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden">
      <Row items={ROW1} rowRef={r1} />
      <Row items={ROW2} rowRef={r2} />
    </section>
  );
}
