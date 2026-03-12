# 스토리프레임 배포 가이드

이 문서는 스토리프레임을 Vercel에 배포하는 단계별 과정을 설명합니다.

## 목차

1. [Firebase 프로젝트 생성](#firebase-프로젝트-생성)
2. [구글 로그인 활성화](#구글-로그인-활성화)
3. [로컬 환경 설정](#로컬-환경-설정)
4. [Vercel 배포](#vercel-배포)

---

## Firebase 프로젝트 생성

### 단계 1: Firebase 콘솔 접속

1. 웹 브라우저에서 [Firebase 콘솔](https://console.firebase.google.com) 열기
2. Google 계정으로 로그인 (또는 새 계정 생성)

### 단계 2: 새 프로젝트 만들기

1. **프로젝트 추가** 또는 **새 프로젝트** 버튼 클릭
2. 프로젝트 이름 입력 (예: `스토리프레임`)
3. **계속** 클릭
4. Google 애널리틱스 설정 (선택사항 - 비활성화 가능)
5. **프로젝트 만들기** 클릭
6. 프로젝트 생성 완료 대기 (1-2분)

### 단계 3: 웹 앱 등록

1. 프로젝트 개요 페이지로 이동
2. 좌측 상단의 **프로젝트 설정** 아이콘 클릭
3. **프로젝트 설정** 페이지에서 **앱** 탭 선택
4. 웹 앱 추가 (</> 아이콘) 클릭
5. 앱 별칭 입력 (예: `스토리프레임-웹`)
6. **앱 등록** 클릭
7. Firebase SDK 설정 코드 표시됨

### 단계 4: 설정 정보 복사

Firebase SDK 설정에서 다음 정보 복사:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",  // ← NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com",  // ← NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "project-id",  // ← NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "project.appspot.com",  // ← NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789",  // ← NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789:web:abc123def456"  // ← NEXT_PUBLIC_FIREBASE_APP_ID
};
```

---

## 구글 로그인 활성화

### 단계 1: Authentication 섹션 열기

1. Firebase 콘솔 좌측 메뉴에서 **Build** 섹션 확장
2. **Authentication** 클릭

### 단계 2: Google 로그인 활성화

1. **Sign-in method** 탭 클릭
2. **Google** 옵션 찾기
3. Google 행 오른쪽의 **활성화** 토글 클릭
4. Google Cloud 프로젝트 선택 (자동 생성됨)
5. **저장** 클릭

### 단계 3: 프로젝트 지원 이메일 설정

1. **Authentication** 페이지 상단의 **프로젝트 설정** 클릭
2. **프로젝트 설정** 팝업에서 **프로젝트 지원 이메일** 설정
3. 드롭다운에서 이메일 선택 (또는 새 이메일 주소 입력)
4. **저장** 클릭

### 단계 4: OAuth 동의 화면 설정

Google 로그인을 처음 설정할 때 다음 경고가 나타날 수 있습니다:
"OAuth consent screen is not configured"

해결 방법:

1. Firebase 콘솔에서 **Google Cloud Console** 링크 클릭
2. Google Cloud 콘솔에서 **API 및 서비스** → **OAuth 동의 화면** 선택
3. **사용자 유형** 선택:
   - 개인/테스트용: **외부** 선택
   - 상용용: **내부** 선택
4. **만들기** 클릭
5. 필수 정보 입력:
   - 앱 이름: `스토리프레임`
   - 사용자 지원 이메일: 본인 이메일
   - 개발자 연락처 정보: 본인 이메일
6. **저장 후 계속** 클릭
7. 범위 페이지: **저장 후 계속** 클릭
8. 테스트 사용자 페이지: **저장 후 계속** 클릭

### 단계 5: 허용된 리디렉션 URI 설정

1. Google Cloud 콘솔에서 **API 및 서비스** → **사용자 인증정보** 선택
2. OAuth 2.0 클라이언트 ID 찾기 (웹 애플리케이션)
3. 클릭하여 수정
4. **승인된 리디렉션 URI** 섹션에 추가:
   - 로컬: `http://localhost:3000`
   - 배포: `https://your-domain.vercel.app`
5. **저장** 클릭

---

## 로컬 환경 설정

### 단계 1: 환경변수 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일 생성:

```bash
# 터미널에서
touch .env.local
```

### 단계 2: 환경변수 입력

`.env.local` 파일 열기 및 다음 내용 입력:

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storyframe-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storyframe-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storyframe-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# 관리자 이메일 (쉼표로 구분)
NEXT_PUBLIC_ADMIN_EMAILS=your_email@example.com
```

### 단계 3: 로컬에서 테스트

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 테스트

### 단계 4: GitHub에 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

**주의**: `.env.local` 파일은 `.gitignore`에 포함되어 있으므로 Git에 푸시되지 않습니다.

---

## Vercel 배포

### 단계 1: Vercel 계정 생성

1. [Vercel](https://vercel.com) 접속
2. **Sign Up** 클릭
3. GitHub 계정으로 로그인 (또는 다른 방법)

### 단계 2: GitHub 저장소 연결

1. Vercel 대시보드에서 **New Project** 클릭
2. GitHub 저장소 검색
3. 프로젝트 선택하고 **Import** 클릭

### 단계 3: 빌드 설정 확인

Vercel이 자동으로 다음을 감지합니다:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

기본 설정 그대로 진행 가능합니다.

### 단계 4: 환경변수 추가

**Environment Variables** 섹션에 다음 변수 추가:

| 변수명 | 값 |
|--------|-----|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 콘솔에서 복사 |
| `NEXT_PUBLIC_ADMIN_EMAILS` | 관리자 이메일 (예: admin@example.com) |

각 변수 추가 후 **Save** 클릭

### 단계 5: 배포 시작

1. **Deploy** 클릭
2. 배포 로그 확인 (2-3분 소요)
3. 배포 완료 후 **Visit** 클릭하여 앱 확인

### 단계 6: Firebase에 도메인 추가

배포 후 Firebase에 도메인을 허용해야 합니다:

1. Firebase 콘솔 → **Authentication** → **Settings**
2. **Authorized domains** 섹션
3. **Add domain** 클릭
4. Vercel 도메인 입력 (예: `storyframe.vercel.app`)
5. **Save** 클릭

### 단계 7: Google Cloud 콘솔에 도메인 추가

1. Google Cloud 콘솔 → **API 및 서비스** → **사용자 인증정보**
2. OAuth 2.0 클라이언트 ID 선택
3. **승인된 리디렉션 URI** 추가:
   - `https://your-domain.vercel.app`
4. **저장** 클릭

---

## 배포 완료 체크리스트

- [ ] Firebase 프로젝트 생성 완료
- [ ] Google 로그인 활성화
- [ ] 로컬 환경변수 설정 (.env.local)
- [ ] 로컬에서 테스트 완료
- [ ] GitHub에 코드 푸시
- [ ] Vercel 프로젝트 생성
- [ ] Vercel 환경변수 설정
- [ ] Vercel 배포 완료
- [ ] Firebase에 Vercel 도메인 추가
- [ ] Google Cloud 콘솔에 리디렉션 URI 추가
- [ ] 배포된 사이트에서 Google 로그인 테스트

---

## 트러블슈팅

### 배포 후 Google 로그인이 작동하지 않음

**해결 방법**:

1. Firebase 콘솔에서 도메인 허용 확인
2. Google Cloud 콘솔에서 리디렉션 URI 확인
3. 환경변수가 올바르게 설정되었는지 확인
4. 캐시 삭제 후 새로고침

### "OAuth consent screen is not configured" 오류

**해결 방법**:

1. Google Cloud 콘솔 접속
2. **API 및 서비스** → **OAuth 동의 화면**
3. 사용자 유형 선택 및 필수 정보 입력
4. 저장

### 환경변수가 인식되지 않음

**해결 방법**:

1. Vercel에서 변수 다시 추가
2. 변수명이 정확한지 확인 (대소문자 구분)
3. 배포 재시작

### 로컬에서는 작동하지만 배포 후 안 됨

**해결 방법**:

1. 배포된 사이트에서 개발자 도구 열기 (F12)
2. Console 탭에서 오류 메시지 확인
3. Network 탭에서 Firebase 요청 확인

---

## 기술 지원

문제 해결이 필요하면:

1. 브라우저 개발자 도구 (F12) 콘솔 확인
2. Vercel 배포 로그 확인
3. Firebase 콘솔에서 설정 재확인
4. 이메일로 기술 지원 요청

---

## 다음 단계

배포 후 고려할 사항:

1. **Firestore 데이터베이스** 설정 (현재는 localStorage 사용)
2. **Storage** 설정 (이미지 업로드용)
3. **Cloud Functions** 설정 (백엔드 로직용)
4. **모니터링** 설정 (오류 추적)
5. **커스텀 도메인** 연결

---

**최종 수정**: 2024년 3월
**버전**: 1.0.0
