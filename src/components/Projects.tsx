import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn, Img, LiveProjectButton } from './ui';
import { PROJECT_SHOTS, type Shot } from '../images';

type Project = {
  key: 'fems' | 'cmts' | 'bbanggu' | 'boindang';
  cat: string;
  name: string;
  sub: string;
  facts: string[]; // **굵게** 표시
  stats?: [string, string][]; // 이미지가 없을 때 크게 보여줄 숫자
  link?: string;
};

const PROJECTS: Project[] = [
  {
    key: 'fems',
    cat: '실무 · 기획·디자인·개발 전담',
    name: 'FEMS 공장 에너지관리',
    sub: '에너지 모니터링·분석 화면 설계부터 구현까지 혼자 맡은 제품',
    facts: ['**33개** UI 파일 무수정 이관', '**368건** 테스트 통과', '센서 **132개** 전량 노출'],
  },
  {
    key: 'cmts',
    cat: '실무 · UX 기획·디자인·개발',
    name: 'CMTS 탄소관리 SaaS',
    sub: '5개 제조기업 현장 관찰을 근거로 입력 흐름을 워크스페이스 구조로 재설계',
    facts: ['CSS **2,000 → 148줄**', 'testQA **550건+**', 'Lighthouse 기준선 **10개** 화면'],
    stats: [
      ['5개사', '제조기업 현장 관찰'],
      ['2,000 → 148', 'CSS 줄 수 (약 93% 감소)'],
      ['550+', 'testQA 수행·문서화'],
      ['10', 'Lighthouse 기준선 측정 화면'],
    ],
  },
  {
    key: 'bbanggu',
    cat: 'SSAFY 공통 · 커머스 · 라이브 운영',
    name: 'BBANGGU',
    sub: '마감 임박 빵을 묶어 할인 판매하는 모바일 커머스. 구매자/판매자 화면 분리, 토스페이먼츠 결제',
    facts: ['React 18 · TS · Vite 6', '토스페이먼츠 연동', '오라클 클라우드 재배포'],
  },
  {
    key: 'boindang',
    cat: 'SSAFY 자율 · 우수상',
    name: 'BOINDANG',
    sub: '영양정보표를 촬영하면 OCR로 성분을 추출해 사용자 타입별 리포트를 주는 서비스',
    facts: ['Next.js 15 SSR/CSR 판단', 'BroadcastChannel 탭 간 알림', 'S3 presigned 업로드'],
    link: 'https://github.com/sennaseo/BOINDANG',
  },
];

// 640px 미만에서는 레퍼런스처럼 스택(sticky·축소) 없이 세로로 나열
function useIsSm() {
  const q = '(min-width: 640px)';
  const [ok, setOk] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setOk(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return ok;
}

function Fact({ text }: { text: string }) {
  return (
    <span className="text-[13px] border border-[rgba(215,226,234,.35)] rounded-full px-3 py-1 font-light">
      {text.split('**').map((part, i) => (i % 2 ? <b key={i} className="font-semibold text-white">{part}</b> : part))}
    </span>
  );
}

const imgRadius = 'overflow-hidden rounded-[28px] sm:rounded-[50px] md:rounded-[60px]';

const frame = 'overflow-hidden bg-white';

/** 이미지 종류에 맞춘 카드 하단: PC 화면 그리드 / 폰 화면 나열 / 숫자 */
function Shots({ p }: { p: Project }) {
  const shots: Shot[] = PROJECT_SHOTS[p.key];

  if (!shots.length && p.stats) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {p.stats.map(([num, label]) => (
          <div key={label} className={`${imgRadius} border border-[rgba(215,226,234,.2)] bg-[#121418] px-6 py-8 sm:px-10 sm:py-12 flex flex-col justify-end min-h-[140px] sm:min-h-[200px]`}>
            <div className="hero-heading font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2rem,5.5vw,84px)' }}>
              {num}
            </div>
            <div className="mt-2 font-light opacity-70" style={{ fontSize: 'clamp(.8rem,1.2vw,1.05rem)' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (shots[0]?.kind === 'wide') {
    return (
      <div className="flex gap-3 flex-1 min-h-0">
        <div className="w-[40%] flex flex-col gap-3">
          <div className={`img-a ${imgRadius} ${frame}`}>
            <Img src={shots[0].src} label={shots[0].label} pos="object-left-top" />
          </div>
          <div className={`img-b ${imgRadius} ${frame}`}>
            <Img src={shots[1].src} label={shots[1].label} pos="object-left-top" />
          </div>
        </div>
        <div className="w-[60%]">
          <div className={`img-c ${imgRadius} ${frame}`}>
            <Img src={shots[2].src} label={shots[2].label} pos="object-left-top" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-5 justify-start sm:justify-center overflow-x-auto sm:overflow-visible pb-1 -mx-1 px-1">
      {shots.map((sh) => (
        <div
          key={sh.src}
          className={`flex-none h-[340px] sm:h-[clamp(300px,46vh,520px)] aspect-[440/956] rounded-[22px] sm:rounded-[32px] border-[3px] sm:border-4 border-[#2a2e35] ${frame}`}
        >
          <Img src={sh.src} label={sh.label} />
        </div>
      ))}
    </div>
  );
}

function Card({ p, i, total, progress, stack }: { p: Project; i: number; total: number; progress: MotionValue<number>; stack: boolean }) {
  const targetScale = 1 - (total - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] min-h-[640px] max-sm:h-auto max-sm:min-h-0 max-sm:mb-6">
      <motion.div
        className="sticky max-sm:relative max-sm:!top-0 top-[calc(96px+var(--i)*28px)] md:top-[calc(128px+var(--i)*28px)] origin-top border-2 border-[#D7E2EA] bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col gap-4"
        style={{ '--i': i, scale: stack ? scale : 1, willChange: 'transform' } as CSSProperties & { scale: MotionValue<number> | number }}
      >
        <div className="flex items-center gap-4 flex-wrap px-2 pt-2">
          <div className="font-black leading-none" style={{ fontSize: 'clamp(3rem,8vw,120px)' }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div className="flex-1 min-w-[180px]">
            <div className="text-[13px] uppercase tracking-[.12em] opacity-60">{p.cat}</div>
            <div className="font-semibold uppercase leading-[1.1]" style={{ fontSize: 'clamp(1.3rem,3vw,2.6rem)' }}>
              {p.name}
            </div>
            <div className="font-light opacity-75 mt-1 leading-normal" style={{ fontSize: 'clamp(.85rem,1.3vw,1.05rem)' }}>
              {p.sub}
            </div>
          </div>
          {p.link && <LiveProjectButton href={p.link}>GitHub</LiveProjectButton>}
        </div>

        {!(p.stats && !PROJECT_SHOTS[p.key].length) && (
        <div className="flex flex-wrap gap-2 px-2 pb-1">
          {p.facts.map((f) => (
            <Fact key={f} text={f} />
          ))}
        </div>
        )}

        <Shots p={p} />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const stack = useIsSm();

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-8 pt-20 sm:pt-24 pb-[120px] sm:pb-36"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12"
        style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
      >
        Project
      </FadeIn>
      <div ref={ref} className="max-w-[1200px] mx-auto">
        {PROJECTS.map((p, i) => (
          <Card key={p.key} p={p} i={i} total={PROJECTS.length} progress={scrollYProgress} stack={stack} />
        ))}
      </div>
    </section>
  );
}
