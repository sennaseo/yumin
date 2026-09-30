import { FadeIn } from './ui';

const SERVICES = [
  {
    name: 'UX 기획',
    desc: '고객 현장을 관찰해 문제를 정의하고 화면 구조를 다시 설계합니다. 5개 제조기업 현장 관찰을 근거로 탄소관리 SaaS의 입력 흐름을 워크스페이스 단위로 재구조화했습니다.',
  },
  {
    name: 'UI 디자인 · 디자인 시스템',
    desc: 'Figma로 레이아웃을 잡고, 첫 화면에서 디자인 시스템을 추출해 공통 컴포넌트로 만든 뒤 나머지 화면을 같은 규칙으로 확장합니다.',
  },
  {
    name: '프론트엔드 개발',
    desc: 'React, TypeScript, Next.js로 화면을 구현합니다. 어댑터 계층을 한 겹 두어 UI 파일 33개를 수정하지 않고 신규 API로 옮겼고, 테스트 368건이 그대로 통과했습니다.',
  },
  {
    name: '데이터 검증',
    desc: '화면의 숫자를 실측값과 계산식에 대조합니다. 클링커 비율 50이 5000%로 계산되던 백엔드 버그, 누적 전력량 카운터 점프로 인한 과다 집계를 찾아냈습니다.',
  },
  {
    name: 'AI 워크플로우',
    desc: 'Figma MCP와 Claude Code를 연결해 디자인을 퍼블리싱하고, 공통 컴포넌트와 화면 규칙을 기준으로 많은 화면을 짧은 시간에 만듭니다. 숫자가 걸린 판단은 직접 확인합니다.',
  },
];

export default function Services() {
  return (
    <section
      id="skills"
      className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-[120px] sm:pb-36 md:pb-44"
    >
      <FadeIn
        as="h2"
        y={40}
        className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem,12vw,160px)' }}
      >
        What I do
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {SERVICES.map((s, i) => (
          <FadeIn
            key={s.name}
            delay={i * 0.1}
            className="flex items-start gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-t border-[rgba(12,12,12,.15)] last:border-b"
          >
            <div className="font-black leading-none min-w-[1.3em]" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="font-medium uppercase mb-2" style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}>
                {s.name}
              </div>
              <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem,1.6vw,1.25rem)' }}>
                {s.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
