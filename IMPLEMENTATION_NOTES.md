# 스토리프레임 - 구현 노트

## 프로젝트 개요

스토리프레임은 기존 React JSX 기반의 동영상 스토리보드 작성 도구를 **Next.js 14** 기반 풀스택 웹 애플리케이션으로 재구성한 프로젝트입니다.

### 주요 변환사항

| 항목 | 기존 | 새로운 |
|------|------|--------|
| 프레임워크 | React (SPA) | Next.js 14 (App Router) |
| 언어 | JavaScript JSX | TypeScript TSX |
| 스타일링 | 인라인 CSS | Tailwind CSS |
| 인증 | Mock 인증 | Firebase Authentication |
| 데이터 저장 | localStorage만 | localStorage + Firestore 준비 |
| 배포 | 수동 배포 | Vercel 자동 배포 |

---

## 아키텍처

### 레이어별 구조

```
프레젠테이션 계층 (Presentation)
├── Pages (app/)
│   ├── page.tsx (로그인)
│   ├── dashboard/page.tsx (사용자)
│   └── admin/page.tsx (관리자)
├── Components (components/)
│   ├── StoryboardApp.tsx
│   └── AdminDashboard.tsx
└── Styles (globals.css + Tailwind)

비즈니스 로직 계층 (Business Logic)
├── AuthProvider.tsx (인증 관리)
└── useAuth hook

데이터 계층 (Data)
├── Firebase (Authentication)
├── localStorage (프로젝트 저장)
└── Utils (데이터 조작)
```

### 컴포넌트 계층 구조

```
App (Next.js)
└── AuthProvider (인증 컨텍스트)
    ├── page.tsx (로그인)
    ├── dashboard/page.tsx
    │   └── StoryboardApp
    │       ├── Dashboard
    │       ├── Editor (Main)
    │       └── Preview
    └── admin/page.tsx
        └── AdminDashboard
            ├── Statistics
            ├── ProjectManagement
            ├── AnnouncementManagement
            ├── ActivityLog
            └── Settings
```

---

## 핵심 기능 구현

### 1. 인증 (Authentication)

**파일**: `lib/firebase.ts`, `components/AuthProvider.tsx`

```typescript
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 로그인 방식
- Google OAuth (signInWithPopup)
- Email/Password (createUserWithEmailAndPassword)
```

**특징**:
- `onAuthStateChanged`로 자동 로그인 상태 유지
- Context API로 전역 인증 상태 관리
- Protected routes (관리자 권한 확인)

### 2. 프로젝트 관리

**파일**: `components/StoryboardApp.tsx`, `lib/utils.ts`

**CRUD 작업**:
```typescript
// Create: handleCreateProject()
// Read: projects 상태로 조회
// Update: handleUpdateScene()
// Delete: handleDeleteProject(), handleDeleteScene()
```

**특징**:
- localStorage에 자동 저장
- 실행 취소/다시 실행 기능
- 프로젝트 템플릿 지원

### 3. 스토리보드 편집

**파일**: `components/StoryboardApp.tsx`

**입력 필드**:
- 제목, 설명
- 카메라 앵글 (6가지)
- 샷 크기 (5가지)
- 카메라 움직임 (9가지)
- 조명 (6가지)
- 지속 시간
- 감독 메모

**특징**:
- 드래그 앤 드롭 (향후)
- 실시간 저장
- 메타데이터 자동 완성

### 4. 관리자 대시보드

**파일**: `components/AdminDashboard.tsx`

**기능**:
- 전체 통계 조회
- 프로젝트 관리 (CRUD)
- 공지사항 관리
- 활동 로그
- 시스템 설정

**특징**:
- 탭 기반 네비게이션
- localStorage에 공지사항 저장
- 권한 확인 (isAdmin)

---

## 상태 관리

### 로컬 상태 (useState)

**StoryboardApp.tsx**:
```typescript
const [projects, setProjects] = useState<Project[]>([]);
const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
const [viewMode, setViewMode] = useState('editor');
const [darkMode, setDarkMode] = useState(false);
// ... 등등
```

**특징**:
- 모든 상태가 로컬에서 관리
- localStorage와 동기화
- 불변성 유지

### 글로벌 상태 (Context)

**AuthProvider.tsx**:
```typescript
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

// useAuth() hook으로 접근
const { user, loading, logout } = useAuth();
```

### 부작용 관리 (useEffect)

**자동 저장**:
```typescript
useEffect(() => {
  const saveTimer = setTimeout(() => {
    localStorage.setItem('storyboard-projects', JSON.stringify(projects));
  }, 1000);
  return () => clearTimeout(saveTimer);
}, [projects]);
```

**인증 상태**:
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);
```

---

## 데이터 구조

### Project 타입

```typescript
interface Project {
  id: string;
  title: string;
  brand_name?: string;
  production_company?: string;
  video_type?: string;
  platform?: string;
  duration?: string;
  tone?: string;
  description?: string;
  scenes: Scene[];
  createdAt?: number;
  updatedAt?: number;
}
```

### Scene 타입

```typescript
interface Scene {
  id: string;
  title: string;
  duration: number;
  camera_angle?: string;
  shot_size?: string;
  camera_movement?: string;
  lighting?: string;
  description?: string;
  notes?: string;
  image_url?: string;
  transition?: string;
}
```

### localStorage 저장 구조

```javascript
// storyboard-projects
{
  "id": "1234567890-abc123def456",
  "title": "제품 광고",
  "scenes": [
    {
      "id": "scene-1",
      "title": "오프닝",
      "duration": 3,
      "camera_angle": "정면",
      ...
    }
  ]
}

// announcements
{
  "id": "1234567890-xyz789",
  "title": "새로운 기능",
  "content": "...",
  "createdAt": 1234567890
}
```

---

## 스타일링 전략

### Tailwind CSS 활용

```tsx
// 다크 모드 지원
<div className={`${darkMode ? 'dark' : ''}`}>
  <p className="text-gray-900 dark:text-white">
    색상이 자동으로 변함
  </p>
</div>

// 반응형 디자인
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  모바일에서는 1열, 태블릿 2열, 데스크톱 3열
</div>
```

### 커스텀 스타일

`app/globals.css`:
```css
/* 애니메이션 */
@keyframes fadeIn { ... }
@keyframes slideInUp { ... }

/* 스크롤바 스타일링 */
::-webkit-scrollbar { ... }
```

---

## 성능 최적화

### useMemo와 useCallback

```typescript
// 명령 목록이 자주 변하지 않으므로 메모이제이션
const commands = useMemo(() => [...], []);

// 콜백 함수 최적화
const handleAddScene = useCallback(() => {
  // ...
}, [projects, activeProjectId]);
```

### 이벤트 위임

키보드 이벤트 처리 최적화:
```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // input/textarea 무시
    if (e.target.tagName === "INPUT") return;
    // ...
  };
}, []);
```

---

## 형식 검증

### TypeScript 타입 안정성

```typescript
// 타입 정의
interface Project { ... }
interface Scene { ... }

// 함수 시그니처
const handleUpdateScene = (sceneId: string, updates: Partial<Scene>) => {}

// Union 타입
type ViewMode = 'editor' | 'grid' | 'presentation' | 'timeline';
```

---

## 보안 고려사항

### 환경변수

`.env.local` (절대 Git에 푸시 안 됨):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
```

### 관리자 권한

```typescript
const isAdmin = (email: string | null | undefined): boolean => {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
  return email ? adminEmails.includes(email) : false;
};
```

### Firebase 규칙 (향후)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{uid}/{allPaths=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

---

## 배포 흐름

### 개발 환경
```
npm run dev
↓
localhost:3000
↓
Hot Module Replacement (HMR)
```

### 빌드 환경
```
npm run build
↓
Next.js 최적화 빌드
↓
.next/ 폴더 생성
```

### 프로덕션 (Vercel)
```
npm push to GitHub
↓
Vercel 자동 감지
↓
npm run build 실행
↓
npm start로 배포
↓
CDN 캐싱
```

---

## 확장 포인트

### 향후 기능 추가

1. **Firestore 통합**
   ```typescript
   // lib/firestore.ts 생성
   import { getFirestore } from 'firebase/firestore';
   ```

2. **Cloud Storage (이미지)**
   ```typescript
   // lib/storage.ts 생성
   import { getStorage } from 'firebase/storage';
   ```

3. **실시간 협업**
   ```typescript
   // Firestore Realtime Updates
   onSnapshot(doc(db, 'projects', id), (doc) => {
     setProject(doc.data());
   });
   ```

4. **PDF 내보내기**
   ```typescript
   // jsPDF 라이브러리 추가
   const generatePDF = () => { ... };
   ```

5. **영상 미리보기**
   ```typescript
   // 타임라인 뷰 확장
   <VideoPreview scenes={project.scenes} />
   ```

---

## 파일 크기

```
StoryboardApp.tsx    : ~26 KB (~1,200줄)
AdminDashboard.tsx   : ~18 KB (~600줄)
constants.ts         : ~5 KB (템플릿, 옵션)
utils.ts             : ~4 KB (유틸리티)
AuthProvider.tsx     : ~1 KB (인증)
firebase.ts          : ~1 KB (초기화)

총합: ~55 KB (압축 시 ~15 KB)
```

---

## 테스트 전략 (향후)

```typescript
// components/__tests__/StoryboardApp.test.tsx
import { render, screen } from '@testing-library/react';

describe('StoryboardApp', () => {
  it('should add new project', () => {
    // ...
  });

  it('should update scene', () => {
    // ...
  });
});
```

---

## 성능 메트릭

### Core Web Vitals 목표

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 최적화 방법

1. 코드 스플리팅 (Next.js 자동)
2. 이미지 최적화 (next/image)
3. 폰트 최적화 (next/font)
4. API 라우트 캐싱

---

## 배포 최적화

### Vercel 설정

```vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "regions": ["sfo1", "iad1"]
}
```

### 환경별 설정

- **개발**: Unoptimized builds
- **스테이징**: Full optimization
- **프로덕션**: Maximum optimization

---

## 문제 해결 및 디버깅

### 일반적인 문제들

**1. Firebase 초기화 오류**
```
해결: firebase.ts에서 설정 확인
     .env.local 변수 확인
```

**2. 상태 동기화 문제**
```
해결: useEffect 의존성 배열 확인
     localStorage 동기화 로직 점검
```

**3. TypeScript 오류**
```
해결: types 정의 확인
     tsconfig.json 설정 재확인
```

---

## 마이그레이션 체크리스트

원본 JSX에서 변환:

- [x] 모든 컴포넌트 → TypeScript
- [x] 스타일 → Tailwind CSS
- [x] Mock 인증 → Firebase
- [x] 단순 localStorage → 구조화된 저장
- [x] 라우팅 추가 (Next.js)
- [x] 관리자 기능 추가
- [x] 배포 설정 (Vercel)

---

## 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

**최종 업데이트**: 2024년 3월 12일
**버전**: 1.0.0
**상태**: 프로덕션 준비 완료

---

이 문서는 개발자를 위한 기술 문서입니다.
사용자 가이드는 SETUP.md, README.md를 참고하세요.
