/* ═══════════════════════════════════════════════════════════
   이미지 설정 — 여기만 바꾸면 됩니다.
   파일은 public/images/ 에 넣고 파일명만 적으세요.
   kind: 'wide' = PC 화면(가로), 'tall' = 폰 화면(세로)
   ═══════════════════════════════════════════════════════════ */
export type Shot = { src: string; label: string; kind: 'wide' | 'tall' };

const s = (src: string, label: string, kind: Shot['kind']): Shot => ({ src: `images/${src}`, label, kind });

const S = {
  femsDashboard: s('fems-dashboard.png', 'FEMS 대시보드', 'wide'),
  femsLine: s('fems-single-line.png', '전력 계통도', 'wide'),
  femsPower: s('fems-power.png', '전력 모니터링', 'wide'),
  femsGas: s('fems-gas.png', '가스 모니터링', 'wide'),
  femsSteam: s('fems-steam.png', '스팀 모니터링', 'wide'),
  cmtsWorkspace: s('cmts-workspace.png', 'CMTS 공통정보', 'wide'),
  cmtsProcess: s('cmts-process.png', '공정·설비 구조', 'wide'),
  cmtsFlow: s('cmts-flow.png', '단위공정 흐름도', 'wide'),
  cmtsMapping: s('cmts-mapping.png', '제품공정 매핑', 'wide'),
  bbHome: s('bbanggu-home.png', 'BBANGGU 홈', 'tall'),
  bbStore: s('bbanggu-store.png', '가게 상세', 'tall'),
  bbReserve: s('bbanggu-reserve.png', '예약하기', 'tall'),
  bbMypage: s('bbanggu-mypage.png', '마이페이지', 'tall'),
  bbStock: s('bbanggu-stock.png', '재고 확인', 'tall'),
  bbBundle: s('bbanggu-bundle.png', '빵꾸러미 등록', 'tall'),
  bbSale: s('bbanggu-sale.png', '판매 설정', 'tall'),
  boHome: s('boindang-home.jpg', 'BOINDANG 홈', 'tall'),
  boMore: s('boindang-more.png', '더보기', 'tall'),
  boResult: s('boindang-result.png', '분석 결과', 'tall'),
  boReport: s('boindang-report.png', '리포트', 'tall'),
  boDetail: s('boindang-detail.png', '성분 상세', 'tall'),
};

/** Hero: PC 화면 + 폰 화면을 겹친 목업 */
export const HERO = { desktop: S.femsDashboard, phone: S.bbHome };

/** 흐르는 타일 두 줄 (각각 세 번 반복됨) */
export const MARQUEE_ROW1: Shot[] = [S.femsDashboard, S.bbHome, S.femsLine, S.boHome, S.cmtsWorkspace, S.bbStore, S.femsGas, S.boResult, S.cmtsFlow, S.femsSteam];
export const MARQUEE_ROW2: Shot[] = [S.boReport, S.cmtsProcess, S.femsPower, S.bbBundle, S.boMore, S.cmtsMapping, S.bbSale, S.bbMypage, S.femsDashboard, S.bbStock];

/** 프로젝트 카드 이미지. PC 화면은 그리드, 폰 화면은 나란히, 빈 배열은 이미지 없이 숫자로 */
export const PROJECT_SHOTS: Record<'fems' | 'cmts' | 'bbanggu' | 'boindang', Shot[]> = {
  fems: [S.femsLine, S.femsPower, S.femsDashboard],
  cmts: [S.cmtsFlow, S.cmtsProcess, S.cmtsWorkspace],
  bbanggu: [S.bbHome, S.bbStore, S.bbBundle, S.bbReserve],
  boindang: [S.boHome, S.boResult, S.boReport, S.boMore],
};
