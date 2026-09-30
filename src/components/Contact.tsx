import { FadeIn, ContactButton, LiveProjectButton } from './ui';

export default function Contact() {
  return (
    <>
      <section id="contact" className="text-center px-5 pt-[120px] pb-16 flex flex-col items-center gap-8">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
        >
          Contact
        </FadeIn>
        <FadeIn as="p" delay={0.1} className="font-light opacity-80" style={{ fontSize: 'clamp(1rem,1.8vw,1.25rem)' }}>
          서유민 · 프론트엔드 개발자 · 하이지노 재직 중 (2025.07 ~)
        </FadeIn>
        <FadeIn delay={0.2} className="flex gap-3 flex-wrap justify-center">
          <ContactButton href="mailto:senna077@gmail.com">senna077@gmail.com</ContactButton>
          <LiveProjectButton href="https://github.com/sennaseo">GitHub</LiveProjectButton>
        </FadeIn>
      </section>
      <footer className="text-center text-[13px] opacity-[.45] px-5 pb-10 font-light">© 서유민 · SSAFY 12기 · 인하대학교 경영학과</footer>
    </>
  );
}
