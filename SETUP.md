# 스토리프레임 - 코딩 초보자 설정 가이드

이 문서는 코딩 초보자도 쉽게 따라할 수 있도록 작성되었습니다.

## 목차

1. [사전 준비](#사전-준비)
2. [프로젝트 실행 (로컬)](#프로젝트-실행-로컬)
3. [Firebase 설정](#firebase-설정)
4. [Vercel 배포](#vercel-배포)

---

## 사전 준비

### 필요한 것들

1. **Visual Studio Code** (또는 다른 텍스트 에디터)
   - 다운로드: https://code.visualstudio.com

2. **Node.js와 npm**
   - 다운로드: https://nodejs.org
   - LTS 버전 권장
   - 설치 후 터미널에서 확인:
     ```bash
     node --version
     npm --version
     ```

3. **Git** (선택사항이지만 권장)
   - 다운로드: https://git-scm.com

4. **Google 계정**
   - Gmail 계정 사용 가능

### 설치 확인

터미널(또는 Command Prompt)을 열고 다음 명령어를 입력:

```bash
node --version
# 예: v18.17.0

npm --version
# 예: 9.8.1
```

둘 다 버전 번호가 나타나면 설정 완료입니다.

---

## 프로젝트 실행 (로컬)

### 단계 1: 프로젝트 다운로드

두 가지 방법이 있습니다:

**방법 1: GitHub에서 다운로드 (초보자 추천)**

1. GitHub 저장소 페이지 방문
2. **Code** 버튼 클릭 → **Download ZIP**
3. 파일 압축 해제
4. 폴더명을 `storyframe`으로 변경

**방법 2: Git으로 클론**

```bash
git clone <저장소-url>
cd storyframe
```

### 단계 2: 터미널 열기

1. VS Code에서 프로젝트 폴더 열기
2. VS Code 상단 메뉴: **View** → **Terminal**
3. 또는 `Ctrl + ~` 키보드 단축키

### 단계 3: 의존성 설치

터미널에 다음 입력:

```bash
npm install
```

이 명령어는:
- `node_modules` 폴더 생성
- 필요한 패키지 다운로드 (2-3분 소요)
- 완료 후 "added XXX packages" 메시지 표시

### 단계 4: 개발 서버 시작

```bash
npm run dev
```

출력 예:
```
> next dev

  ▲ Next.js 14.0.0

  Local:        http://localhost:3000
```

### 단계 5: 브라우저에서 확인

1. 웹 브라우저 열기 (Chrome, Firefox 등)
2. 주소 입력: `http://localhost:3000`
3. 스토리프레임 로그인 페이지 나타남

**로컬 개발 서버 종료**: 터미널에서 `Ctrl+C` 입력

---

## Firebase 설정

### 🔥 Firebase는 무엇인가?

Firebase는 Google에서 제공하는 서비스입니다:
- 사용자 로그인 관리
- 데이터 저장소
- 호스팅 등

### 단계 1: Google 계정 준비

1. Gmail 계정 열기 (또는 Google 계정 생성)
2. 로그인 유지

### 단계 2: Firebase 프로젝트 생성

1. [Firebase 콘솔](https://console.firebase.google.com) 접속
2. **프로젝트 추가** 클릭
   ![Step 1](./docs/firebase-step1.png)
3. 프로젝트 이름 입력: `스토리프레임`
4. **계속** 클릭
5. Google 애널리틱스: **계속** (비활성화 가능)
6. **프로젝트 만들기** 클릭
7. 잠깐 대기 (1-2분)
8. **계속** 클릭

### 단계 3: 웹 앱 등록

1. 프로젝트 대시보드에서 **</> 아이콘** 찾기 (또는 "웹" 추가 클릭)
2. 앱 별칭 입력: `스토리프레임-웹`
3. **앱 등록** 클릭
4. **Firebase SDK 코드** 복사 (빨간 박스 부분)

### 단계 4: 환경변수 설정

1. VS Code로 돌아가기
2. 프로젝트 루트 폴더에 `.env.local` 파일 생성
3. 다음 내용 입력 (Firebase 설정 정보 복사):

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storyframe-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storyframe-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storyframe-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# 관리자 이메일
NEXT_PUBLIC_ADMIN_EMAILS=your_email@gmail.com
```

**주의**: 자신의 Firebase 정보로 교체하세요!

### 단계 5: Google 로그인 활성화

1. Firebase 콘솔 좌측 메뉴: **Build** → **Authentication**
2. **Sign-in method** 탭 클릭
3. **Google** 찾기
4. **Google 행** 오른쪽 토글 켜기
5. 이메일 선택 → **저장** 클릭

### 단계 6: 개발 서버 재시작

1. VS Code 터미널: `Ctrl+C` 입력 (서버 종료)
2. 다시 시작: `npm run dev`
3. `http://localhost:3000` 새로고침
4. **구글로 시작하기** 버튼이 작동하는지 테스트

---

## Vercel 배포

### 🚀 Vercel이란?

Vercel은 Next.js 앱을 무료로 호스팅해주는 서비스입니다.

### 단계 1: GitHub 계정 생성

1. [GitHub](https://github.com) 접속
2. **Sign up** 클릭
3. 이메일, 비밀번호, 사용자명 입력
4. 계정 생성 완료

### 단계 2: 코드를 GitHub에 업로드

VS Code 터미널에서:

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋 생성
git commit -m "Initial commit"

# GitHub에 연결 (GitHub 저장소 URL 사용)
git remote add origin https://github.com/YOUR_USERNAME/storyframe.git

# 업로드
git branch -M main
git push -u origin main
```

### 단계 3: Vercel에 배포

1. [Vercel](https://vercel.com) 접속
2. **Sign up** → **GitHub로 계속** 클릭
3. GitHub 계정 연결
4. **Import Project** 클릭
5. GitHub 저장소 선택: `storyframe`
6. **Import** 클릭

### 단계 4: 환경변수 설정

배포 전에 환경변수 추가:

1. **Environment Variables** 섹션 찾기
2. 다음 변수들 추가:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_ADMIN_EMAILS`
3. 각 변수마다 Firebase 콘솔의 값 복사하여 입력
4. **Save** 클릭

### 단계 5: 배포 시작

1. **Deploy** 버튼 클릭
2. 배포 로그 보기 (2-3분 소요)
3. 완료되면 **Visit** 클릭
4. 배포된 앱 확인

### 단계 6: Firebase에 도메인 추가

1. Firebase 콘솔 → **Authentication** → **Settings**
2. **Authorized domains** 섹션
3. **Add domain** 클릭
4. Vercel 도메인 입력 (예: `storyframe.vercel.app`)
5. **Save** 클릭

### 🎉 완료!

이제 누구나 다음 URL에서 앱 접속 가능:
```
https://your-app.vercel.app
```

---

## 자주 묻는 질문 (FAQ)

### Q1: "npm install"이 오래 걸려요

**A**: 처음 설치는 3-5분이 걸릴 수 있습니다. 인터넷 속도에 따라 더 오래 걸릴 수도 있습니다.

### Q2: "port 3000 already in use" 오류가 나요

**A**: 다른 앱이 포트 3000을 사용 중입니다.
```bash
# 다른 포트 사용
npm run dev -- -p 3001
```

### Q3: .env.local 파일이 뭔가요?

**A**: 비밀 정보를 저장하는 파일입니다. Git에 업로드되지 않도록 `.gitignore`에 등록되어 있습니다.

### Q4: Firebase API Key가 공개되어도 괜찮나요?

**A**: 네, `NEXT_PUBLIC_` 접두사가 있으면 공개되어도 괜찮습니다. Firebase에서 이미 이를 고려하고 설계했습니다.

### Q5: 로컬에서 수정한 후 배포하려면?

**A**:
```bash
git add .
git commit -m "수정 설명"
git push origin main
```
자동으로 Vercel에 배포됩니다.

### Q6: 앱이 느려요

**A**: 처음에는 느릴 수 있습니다. 새로고침 후 시간이 지나면서 빨라집니다.

---

## 다음 단계

배포 후 개선할 사항:

1. **이미지 업로드** 기능 추가 (Firebase Storage)
2. **실시간 협업** 기능 (Firestore)
3. **모바일 앱** 버전
4. **PDF 내보내기** 기능

---

## 도움말

막히는 부분이 있으면:

1. **콘솔 확인** (F12 → Console)
2. **오류 메시지 읽기** (구글링)
3. **Firebase 문서** 확인
4. **기술 지원** 요청

---

## 팁

### 유용한 VS Code 확장 프로그램

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Firebase**

설치 방법: VS Code 좌측 **Extensions** 아이콘 → 검색 → Install

### 개발 시 팁

- `Ctrl+Shift+P`: 명령 팔레트 (빠른 검색)
- `Ctrl+~`: 터미널 열기/닫기
- `Ctrl+B`: 사이드바 열기/닫기

---

**축하합니다! 🎉**

스토리프레임 설정이 완료되었습니다. 이제 멋진 스토리보드를 만들어보세요!

---

**마지막 업데이트**: 2024년 3월
**버전**: 1.0.0
