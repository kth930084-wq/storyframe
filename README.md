# 스토리프레임 (StoryFrame)

전문적인 동영상 스토리보드를 쉽게 만들어보는 Next.js 기반 웹 애플리케이션입니다.

## 주요 기능

- **직관적 편집기**: 씬(Scene)을 추가, 수정, 삭제하며 스토리보드를 구성
- **다양한 템플릿**: 제품 광고, 뷰티 커머셜, 푸드 영상 등 사전 정의된 템플릿 제공
- **상세한 메타데이터**: 카메라 앵글, 샷 크기, 카메라 움직임, 조명 등 전문적 정보 입력
- **실시간 저장**: localStorage를 통한 자동 저장
- **다크 모드**: 다양한 환경에서 사용 가능
- **관리자 대시보드**: 프로젝트, 공지사항, 통계 관리
- **Firebase 인증**: Google 로그인 및 이메일/비밀번호 인증

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **인증**: Firebase Authentication
- **데이터 저장**: Browser localStorage (Firestore 연동 가능)
- **UI 컴포넌트**: Lucide React Icons

## 시작하기

### 1. 프로젝트 설정

```bash
# 저장소 클론
git clone <repository-url>
cd storyframe

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

`http://localhost:3000`에서 앱을 열면 됩니다.

### 2. Firebase 설정

#### Step 1: Firebase 프로젝트 생성

1. [Firebase 콘솔](https://console.firebase.google.com)에 접속
2. **새 프로젝트 만들기** 클릭
3. 프로젝트 이름 입력 (예: `storyframe`)
4. Google 애널리틱스 비활성화 (선택사항)
5. **프로젝트 만들기** 클릭

#### Step 2: 웹 앱 등록

1. 프로젝트 개요 페이지에서 **웹** 아이콘 클릭 (</> 모양)
2. 앱 닉네임 입력 (예: `storyframe-web`)
3. **앱 등록** 클릭
4. Firebase SDK 설정 코드가 표시됨

#### Step 3: 환경변수 설정

`.env.local` 파일을 생성하고 Firebase 설정 정보를 입력:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_ADMIN_EMAILS=your_email@example.com
```

#### Step 4: Google 로그인 활성화

1. Firebase 콘솔의 **Authentication** 섹션 클릭
2. **Sign-in method** 탭 클릭
3. **Google** 클릭
4. **활성화** 토글 켜기
5. 프로젝트 지원 이메일 입력
6. **저장** 클릭

#### Step 5: OAuth 동의 화면 설정

1. Google Cloud Console에서 OAuth 동의 화면 설정
2. 사용자 유형을 "외부"로 선택
3. 필수 정보 입력

## 프로젝트 구조

```
storyframe/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 랜딩/로그인 페이지
│   ├── globals.css         # 전역 스타일
│   ├── dashboard/
│   │   └── page.tsx        # 대시보드 (사용자)
│   └── admin/
│       └── page.tsx        # 관리자 대시보드
├── components/
│   ├── AuthProvider.tsx    # Firebase 인증 Provider
│   ├── StoryboardApp.tsx   # 메인 스토리보드 앱
│   └── AdminDashboard.tsx  # 관리자 대시보드 컴포넌트
├── lib/
│   ├── firebase.ts         # Firebase 초기화
│   ├── constants.ts        # 상수 (템플릿, 옵션 등)
│   └── utils.ts            # 유틸리티 함수
├── public/
├── .env.example            # 환경변수 예제
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

## 배포하기 (Vercel)

### 1. Vercel에 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel
```

### 2. 환경변수 설정

Vercel 대시보드에서:

1. **프로젝트 선택**
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_ADMIN_EMAILS`

### 3. Firebase 허용 도메인 추가

1. Firebase 콘솔 → **Authentication** → **Settings**
2. **Authorized domains** 섹션에서 Vercel 도메인 추가:
   - `your-project.vercel.app`

## 키보드 단축키

- `Ctrl+K`: 명령 팔레트 열기
- `Ctrl+Z`: 실행 취소
- `Ctrl+Shift+Z`: 다시 실행
- `G`: 그리드 뷰
- `T`: 타임라인 뷰
- `E`: 편집기 뷰
- `P`: 프레젠테이션 모드
- `N`: 새 씬 추가
- `C`: 씬 복제
- `Delete`: 씬 삭제
- `?`: 키보드 단축키 안내

## 관리자 기능

관리자 이메일을 `NEXT_PUBLIC_ADMIN_EMAILS` 환경변수에 설정하면 관리자 대시보드에 접근할 수 있습니다.

관리자 기능:
- 전체 통계 조회
- 프로젝트 관리 및 삭제
- 공지사항 작성 및 관리
- 시스템 설정 변경

## 개발

### 로컬 개발

```bash
npm run dev
```

### 빌드

```bash
npm run build
npm start
```

### 린트

```bash
npm run lint
```

## 데이터 저장

현재 스토리프레임은 **브라우저 localStorage**를 사용하여 데이터를 저장합니다.

### Firestore 연동 (향후 기능)

Firestore를 연동하려면:

1. Firebase 콘솔에서 Firestore Database 생성
2. `lib/firebase.ts`에 Firestore 초기화 코드 추가
3. 프로젝트 데이터를 Firestore에 동기화

## 트러블슈팅

### Google 로그인이 작동하지 않음

- Firebase 콘솔에서 Google 로그인이 활성화되었는지 확인
- OAuth 동의 화면이 설정되었는지 확인
- 환경변수가 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

### 데이터가 저장되지 않음

- 브라우저의 localStorage가 활성화되어 있는지 확인
- 개발자 도구 → Application → Local Storage 확인

### Vercel 배포 후 Firebase 오류

- Firebase 콘솔에서 Vercel 도메인이 허용 도메인에 추가되었는지 확인
- 환경변수가 Vercel에 올바르게 설정되었는지 확인

## 라이선스

MIT

## 문의

문제가 있거나 기능 요청이 있으면 GitHub Issue를 생성해주세요.
