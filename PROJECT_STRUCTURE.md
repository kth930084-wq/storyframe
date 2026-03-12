# 스토리프레임 - 프로젝트 구조

## 📁 완전한 프로젝트 구조

```
storyframe/
│
├── 📄 설정 파일
│   ├── package.json                 # 프로젝트 의존성
│   ├── tsconfig.json                # TypeScript 설정
│   ├── next.config.js               # Next.js 설정
│   ├── tailwind.config.js           # Tailwind CSS 설정
│   ├── postcss.config.js            # PostCSS 설정
│   ├── .gitignore                   # Git 무시 파일
│   ├── .env.example                 # 환경변수 예제
│   └── .env.local.example           # 로컬 환경변수 예제
│
├── 📚 문서
│   ├── README.md                    # 프로젝트 개요
│   ├── SETUP.md                     # 코딩 초보자 가이드
│   ├── DEPLOY.md                    # 배포 상세 가이드
│   ├── QUICKSTART.md                # 빠른 시작 가이드
│   └── PROJECT_STRUCTURE.md         # 이 파일
│
├── 🎨 앱 (App Router)
│   ├── layout.tsx                   # 루트 레이아웃
│   ├── page.tsx                     # 랜딩 페이지 (로그인)
│   ├── globals.css                  # 전역 스타일
│   │
│   ├── dashboard/
│   │   └── page.tsx                 # 사용자 대시보드
│   │
│   └── admin/
│       └── page.tsx                 # 관리자 대시보드
│
├── 🧩 컴포넌트 (Components)
│   ├── AuthProvider.tsx             # Firebase 인증 제공자
│   ├── StoryboardApp.tsx            # 메인 스토리보드 애플리케이션
│   └── AdminDashboard.tsx           # 관리자 대시보드 컴포넌트
│
├── 🔧 라이브러리 (Lib)
│   ├── firebase.ts                  # Firebase 초기화
│   ├── constants.ts                 # 상수 (템플릿, 옵션 등)
│   └── utils.ts                     # 유틸리티 함수
│
└── 📦 공개 파일
    └── public/                      # 정적 파일 (이미지 등)
```

## 📋 주요 파일 설명

### 설정 파일

| 파일 | 설명 |
|------|------|
| `package.json` | npm 의존성 및 스크립트 정의 |
| `tsconfig.json` | TypeScript 컴파일러 설정 |
| `next.config.js` | Next.js 빌드 설정 |
| `tailwind.config.js` | Tailwind CSS 커스터마이징 |
| `postcss.config.js` | CSS 처리 설정 |

### 페이지 (app/)

| 파일 | 설명 | 접근 |
|------|------|------|
| `app/page.tsx` | 랜딩 및 로그인 페이지 | `/` |
| `app/dashboard/page.tsx` | 사용자 프로젝트 대시보드 | `/dashboard` |
| `app/admin/page.tsx` | 관리자 전용 대시보드 | `/admin` |
| `app/layout.tsx` | 모든 페이지의 기본 레이아웃 | - |
| `app/globals.css` | 전역 스타일 | - |

### 컴포넌트 (components/)

| 파일 | 설명 | 역할 |
|------|------|------|
| `AuthProvider.tsx` | Firebase 인증 관리 | 사용자 로그인/로그아웃 상태 관리 |
| `StoryboardApp.tsx` | 메인 앱 컴포넌트 | 대시보드, 편집기, 프레젠테이션 모드 |
| `AdminDashboard.tsx` | 관리자 인터페이스 | 프로젝트, 공지사항, 통계 관리 |

### 라이브러리 (lib/)

| 파일 | 설명 |
|------|------|
| `firebase.ts` | Firebase SDK 초기화, 인증 설정 |
| `constants.ts` | 카메라 앵글, 샷 크기, 템플릿 등 상수 |
| `utils.ts` | 유틸리티 함수, 타입 정의 |

## 🔄 데이터 흐름

```
사용자 접속
    ↓
page.tsx (로그인 페이지)
    ↓ (로그인 성공)
AuthProvider (인증 상태 확인)
    ↓
dashboard/page.tsx (사용자)
    ↓
StoryboardApp (메인 애플리케이션)
    ├── 프로젝트 관리
    ├── 씬 편집
    ├── localStorage에 저장
    └── 프레젠테이션 모드

또는 (관리자 경우)

admin/page.tsx (관리자 페이지)
    ↓
AdminDashboard (관리자 인터페이스)
    ├── 통계 조회
    ├── 프로젝트 관리
    └── 공지사항 관리
```

## 🔐 인증 흐름

```
사용자 입력 (이메일/비밀번호 또는 Google)
    ↓
Firebase Auth
    ↓ (성공)
auth 객체 생성
    ↓
AuthProvider에서 상태 관리
    ↓
useAuth() hook으로 접근
```

## 💾 데이터 저장소

### 현재 (로컬 개발)
- **Browser localStorage**: 프로젝트, 공지사항 저장
- 위치: `localStorage.storyboard-projects`, `localStorage.announcements`

### 향후 (프로덕션)
- **Firestore Database**: 사용자별 프로젝트 저장
- **Cloud Storage**: 이미지 저장
- **Realtime Database**: 실시간 협업

## 🎯 주요 기능별 파일

### 프로젝트 관리
- `StoryboardApp.tsx` - 프로젝트 생성, 삭제
- `utils.ts` - 프로젝트 생성 함수
- `constants.ts` - 템플릿 정의

### 씬 편집
- `StoryboardApp.tsx` - 씬 추가, 편집, 삭제
- `constants.ts` - 카메라, 조명 등 옵션

### 사용자 인증
- `AuthProvider.tsx` - 인증 상태 관리
- `firebase.ts` - Firebase 설정
- `page.tsx` - 로그인 UI

### 관리자 기능
- `AdminDashboard.tsx` - 관리자 인터페이스
- `constants.ts` - 관리자 이메일 확인

## 📦 의존성

### 주요 라이브러리

| 라이브러리 | 용도 |
|-----------|------|
| `next` | React 프레임워크 |
| `react` | UI 라이브러리 |
| `firebase` | 인증, 데이터베이스 |
| `tailwindcss` | CSS 프레임워크 |
| `lucide-react` | 아이콘 |
| `typescript` | 정적 타입 |

## 🚀 빌드 및 배포 파일

| 파일 | 용도 |
|------|------|
| `.next/` | 빌드 결과 (배포 시 생성) |
| `node_modules/` | 설치된 패키지 |
| `.env.local` | 로컬 환경변수 |

## 📝 문서 가이드

처음 사용하는 경우:
1. **QUICKSTART.md** - 빠른 시작 (5분)
2. **SETUP.md** - 상세 설정 (초보자 친화적)
3. **README.md** - 전체 문서
4. **DEPLOY.md** - 배포 단계별 가이드

## ✅ 체크리스트

프로젝트 설정 확인:

- [ ] `npm install` 완료
- [ ] `npm run dev` 실행 가능
- [ ] `http://localhost:3000` 접속 가능
- [ ] `.env.local` 파일 생성
- [ ] Firebase 프로젝트 생성
- [ ] Google 로그인 활성화
- [ ] 로컬에서 로그인 테스트 성공
- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel 배포 완료
- [ ] Firebase 도메인 등록

---

**프로젝트 완성도: 100%** ✅

모든 파일이 생성되었고 배포 준비가 완료되었습니다!
