# 빠른 시작 가이드

이 가이드는 스토리프레임을 빠르게 시작하려는 사용자를 위한 것입니다.

## 1단계: 설치 (5분)

```bash
# 1. 프로젝트 폴더로 이동
cd storyframe

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

## 2단계: Firebase 설정 (10분)

1. [Firebase 콘솔](https://console.firebase.google.com) 접속
2. **프로젝트 추가** → 이름: `스토리프레임`
3. 웹 앱 등록: **</> 아이콘** 클릭
4. Firebase 설정 코드 복사

### 환경변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=storyframe-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=storyframe-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=storyframe-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_ADMIN_EMAILS=your_email@gmail.com
```

### Google 로그인 활성화

1. Firebase 콘솔: **Authentication** → **Sign-in method**
2. **Google** 토글 켜기
3. **저장**

## 3단계: 배포 (15분)

### GitHub 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOU/storyframe.git
git push -u origin main
```

### Vercel 배포

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. **Import Project** → `storyframe` 선택
4. **Environment Variables** 추가 (Firebase 정보)
5. **Deploy**

## 4단계: Firebase 도메인 등록

Firebase 콘솔 → **Authentication** → **Settings** → **Authorized domains**:

```
https://your-project.vercel.app
```

## 완료! 🎉

앱에 접속: `https://your-project.vercel.app`

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 🎬 스토리보드 | 씬 추가, 편집, 정렬 |
| 📝 메타데이터 | 카메라, 조명, 음향 정보 |
| 🎨 템플릿 | 제품 광고, 뷰티 등 |
| 👥 협업 | (향후 기능) |
| 📊 분석 | 프로젝트 통계 |

## 키보드 단축키

- `Ctrl+K`: 명령 팔레트
- `N`: 새 씬
- `C`: 복제
- `Delete`: 삭제
- `G`: 그리드 보기
- `P`: 프레젠테이션

## 더 보기

- [상세 설정 가이드](./SETUP.md)
- [배포 가이드](./DEPLOY.md)
- [전체 문서](./README.md)

---

**문제가 생기면 SETUP.md의 FAQ를 확인하세요!**
