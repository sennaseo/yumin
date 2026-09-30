import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn, ContactButton } from './ui';

const TEXT =
  '탄소관리와 공장 에너지관리 B2B SaaS에서 UX/UI 기획, 디자인, 프론트엔드 개발을 혼자 맡아 왔습니다. 고객 현장을 직접 보고 화면 구조를 다시 설계하고, 화면에 나온 숫자가 맞는지까지 제 일로 봅니다. 운영 중인 서비스를 깨뜨리지 않고 바꾸는 일을 좋아합니다.';

function Char({ ch, progress, range }: { ch: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="invisible">{ch}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {ch}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = [...text];
  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-medium text-center max-w-[560px]"
      style={{ lineHeight: 1.7, fontSize: 'clamp(1rem,2vw,1.35rem)' }}
    >
      {chars.map((ch, i) => (
        <Char key={i} ch={ch} progress={scrollYProgress} range={[i / chars.length, (i + 1) / chars.length]} />
      ))}
    </p>
  );
}

const DECO = [
  { orb: 'a', pos: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', x: -80, delay: 0.1 },
  { orb: 'b', pos: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', x: -80, delay: 0.25 },
  { orb: 'c', pos: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', x: 80, delay: 0.15 },
  { orb: 'd', pos: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', x: 80, delay: 0.3 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center gap-16 sm:gap-20 md:gap-24 px-5 sm:px-8 md:px-10 py-20"
      style={{ overflowX: 'clip' }}
    >
      {DECO.map((d) => (
        <FadeIn key={d.orb} x={d.x} y={0} delay={d.delay} duration={0.9} className={`absolute pointer-events-none ${d.pos}`}>
          <div className={`orb ${d.orb}`} />
        </FadeIn>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
        >
          About me
        </FadeIn>
        <AnimatedText text={TEXT} />
      </div>
      <FadeIn y={20}>
        <ContactButton />
      </FadeIn>
    </section>
  );
}
