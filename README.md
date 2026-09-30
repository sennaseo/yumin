# Yumin — Frontend Developer 포트폴리오

React + Vite + TypeScript + Tailwind + framer-motion.

## 실행

```bash
npm install
npm run dev
```

## 이미지 넣기

1. 이미지 파일을 `public/images/` 에 넣습니다. (예: `public/images/fems-1.png`)
2. `src/images.ts` 에서 해당 칸의 `''` 를 `'images/fems-1.png'` 처럼 바꿉니다.
   - `portrait`: 인물 사진 (세로 4:5 권장)
   - `marquee`: 흐르는 타일 21칸 (가로 420x270 비율, 순서는 `MARQUEE_LABELS` 와 같음)
   - `fems` / `cmts` / `bbanggu` / `boindang`: `[왼쪽 위, 왼쪽 아래, 오른쪽 큰 이미지]`

비워 둔 칸은 회색 자리 표시("이미지 교체")로 나옵니다.

## 빌드

```bash
npm run build
```

결과물은 `dist/` 에 생깁니다. `base: './'` 설정이라 GitHub Pages 하위 경로에 그대로 올려도 동작합니다.
