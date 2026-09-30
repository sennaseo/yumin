import { FadeIn, Magnet, Img, ContactButton } from './ui';
import { HERO } from '../images';

const LINKS = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

export default function Hero() {
  return (
    <section id="top" className="relative h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" y={-20} className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
        {LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {label}
          </a>
        ))}
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          y={40}
          delay={0.15}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[16.5vw] mt-6 sm:mt-4 md:-mt-5"
        >
          Hi, i&apos;m yumin
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[320px] sm:w-[560px] md:w-[600px] lg:w-[660px] xl:w-[820px] xl:left-[57%] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-24 md:bottom-28 xl:bottom-0">
        <FadeIn y={30} delay={0.6}>
          <Magnet padding={150} strength={3}>
            <div className="relative pr-[9%]">
              {/* PC 화면 */}
              <div className="rounded-[14px] sm:rounded-[22px] xl:rounded-b-none overflow-hidden border xl:border-b-0 border-[#2a2e35] bg-[#15171b] shadow-[0_-20px_80px_rgba(187,204,215,0.12)]">
                <div className="flex gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#2a2e35]">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#646973]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#646973]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#646973]" />
                </div>
                <div className="aspect-[2/1] bg-white">
                  <Img src={HERO.desktop.src} label={HERO.desktop.label} pos="object-left-top" />
                </div>
              </div>
              {/* 폰 화면 */}
              <div className="absolute right-0 bottom-0 w-[27%] aspect-[440/956] rounded-[18px] sm:rounded-[30px] xl:rounded-b-none overflow-hidden border-[3px] sm:border-[5px] xl:border-b-0 border-[#23262c] bg-white shadow-[-12px_-8px_40px_rgba(0,0,0,0.55)]">
                <Img src={HERO.phone.src} label={HERO.phone.label} />
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      <div className="mt-auto relative z-20 flex justify-between items-end gap-4 px-6 sm:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          y={20}
          delay={0.35}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem,1.4vw,1.5rem)' }}
        >
          기획부터 디자인, 개발까지 한 흐름으로 만드는 프론트엔드 개발자
        </FadeIn>
        <FadeIn y={20} delay={0.5}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
