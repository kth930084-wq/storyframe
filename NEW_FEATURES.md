# PEWPEW 스토리보드 - 신규 기능 구현 가이드

## 개요

다음의 세 가지 주요 기능이 구현되었습니다:
1. **PPT-like 슬라이드 뷰** - 씬 썸네일 패널
2. **빈 페이지 기능** - 다양한 유형의 빈 페이지 지원
3. **캔버스 에디터** - 프레임 내 요소 드래그 앤 드롭

---

## 1. PPT-like 슬라이드 뷰

### 파일
- `components/SlideView.tsx`

### 기능

#### 좌측 패널: 씬 썸네일 목록
- **씬 목록 표시**: 모든 씬의 썸네일과 제목 표시
- **드래그 앤 드롭**: 씬 순서 변경 (기본 HTML5 API 사용)
- **활성 씬 강조**: 선택된 씬은 파란색으로 표시
- **신속 삭제**: 각 썬 우측의 휴지통 버튼으로 삭제
- **장면 번호**: 씬 번호 자동 표시 및 업데이트

#### 기능 버튼
- **씬 추가**: 새 씬 추가 버튼
- **씬 통계**: 하단에 총 씬 개수 및 전체 길이 표시

### 사용 방법
1. 왼쪽 사이드바의 "슬라이드 뷰" 버튼 클릭
2. 썸네일을 드래그하여 씬 순서 변경
3. 썸네일 클릭하여 씬 선택
4. 휴지통 아이콘으로 씬 삭제

### 주요 코드
```typescript
// SlideView 사용 예
<SlideView
  scenes={activeProject.scenes}
  activeSceneId={activeSceneId}
  onSceneSelect={setActiveSceneId}
  onAddScene={handleAddScene}
  onDeleteScene={handleDeleteScene}
  onReorderScenes={handleReorderScenes}
/>
```

---

## 2. 빈 페이지 기능

### 파일
- `components/BlankPageEditor.tsx`

### 지원하는 빈 페이지 유형

#### 1. 씬 구분 (Scene Divider)
- **용도**: 장면 사이의 타이틀 카드
- **기능**: 큰 텍스트 입력 필드
- **UI**: 그라데이션 배경의 타이틀 카드 스타일

#### 2. 자유 메모 (Free Memo)
- **용도**: 텍스트 기반 노트 작성
- **기능**: 자유로운 텍스트 작성 공간
- **마크다운**: 기본 마크다운 지원 가능

#### 3. 직접 그리기 (Sketch Canvas)
- **용도**: 이미지 업로드 또는 스케치
- **기능**: 이미지 파일 업로드, 드래그 앤 드롭 지원
- **미리보기**: 업로드된 이미지 즉시 표시

#### 4. 이미지 업로드 (Image Upload)
- **용도**: 이미지 파일 전용 업로드
- **기능**: 전체 캔버스 크기의 이미지 업로드
- **교체**: "다른 이미지 선택" 버튼으로 교체 가능

### 사용 방법

#### 빈 페이지 생성
1. 사이드바에서 "빈 페이지" 버튼 클릭
2. 원하는 페이지 유형 선택
3. 자동으로 새 씬이 생성되고 에디터에서 편집 가능

#### 빈 페이지 편집
- 빈 페이지가 선택되면 SceneEditor가 자동으로 BlankPageContent를 렌더링
- 각 유형에 맞는 편집 UI가 표시됨

### 데이터 구조

```typescript
// Scene 인터페이스에 추가된 필드
interface Scene {
  blank_page_type?: string; // 'scene-divider' | 'free-memo' | 'sketch-canvas' | 'image-upload'
  blank_page_content?: {
    text?: string;      // 씬 구분의 제목
    imageUrl?: string;  // 이미지 업로드 페이지의 이미지
    memo?: string;      // 자유 메모 텍스트
  };
}
```

### 주요 코드

```typescript
// 빈 페이지 추가 핸들러
const handleAddBlankPage = useCallback((typeId: string) => {
  const newScene: Scene = {
    id: generateId(),
    scene_number: (activeProject?.scenes.length || 0) + 1,
    title: typeLabels[typeId],
    duration: 0,
    blank_page_type: typeId,
    blank_page_content: { text: '', imageUrl: '', memo: '' },
    canvas_elements: [],
    shooting_completed: false,
  };
  // ... 씬 추가 로직
});

// 빈 페이지 렌더링 (SceneEditor에서)
if (scene.blank_page_type) {
  return (
    <BlankPageContent
      type={scene.blank_page_type}
      content={scene.blank_page_content || {}}
      onChange={(content) => onUpdate({ ...scene, blank_page_content: content })}
    />
  );
}
```

---

## 3. 캔버스 에디터 (향후 확장용)

### 파일
- `components/CanvasEditor.tsx`

### 기능 (구현됨)

#### 요소 추가
- **텍스트 박스**: 텍스트 요소 추가
- **사각형**: 직사각형 도형
- **원형**: 원형 도형
- **화살표**: 화살표 도형

#### 요소 편집
- **드래그**: 요소 위치 이동
- **리사이즈**: 모서리 핸들로 크기 조정 (8방향)
- **색상 변경**: 프리셋 색상 팔레트에서 선택
- **텍스트 편집**: 텍스트 요소의 글자 크기 조정

#### 레이어 관리
- **앞으로 보내기**: Z-index 증가
- **뒤로 보내기**: Z-index 감소
- **복사**: 요소 복제
- **잠금**: 요소 잠금/해제 (움직임 방지)
- **삭제**: 요소 삭제

#### 레이아웃 지원
- **1-cut**: 단일 프레임 (기본값)
- **2-cut**: 2열 분할
- **4-cut**: 2x2 그리드
- **6-cut**: 3x2 그리드

### 데이터 구조

```typescript
export interface CanvasElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'arrow';
  x: number;        // 좌측 위치 (픽셀)
  y: number;        // 상단 위치 (픽셀)
  width: number;    // 너비 (픽셀)
  height: number;   // 높이 (픽셀)
  content?: string; // 텍스트 내용
  color?: string;   // 색상 (hex)
  fontSize?: number; // 글자 크기 (텍스트만)
  locked?: boolean; // 잠금 상태
  zIndex?: number;  // 레이어 순서
}

// Scene 인터페이스에 추가된 필드
interface Scene {
  layout_type?: string; // '1-cut' | '2-cut' | '4-cut' | '6-cut'
  canvas_elements?: CanvasElement[];
}
```

### 주요 코드

```typescript
// CanvasEditor 사용 예
<CanvasEditor
  elements={scene.canvas_elements || []}
  onElementsChange={(elements) => onUpdate({ ...scene, canvas_elements: elements })}
  layoutType={scene.layout_type || '1-cut'}
/>
```

---

## 4. 통합 수정 사항

### StoryboardApp.tsx 변경 사항

#### 1. 새 상태 변수 추가
```typescript
const [showBlankPageEditor, setShowBlankPageEditor] = useState(false);
const [slideViewMode, setSlideViewMode] = useState(false);
```

#### 2. 새 핸들러 추가
- `handleAddBlankPage(typeId)`: 빈 페이지 생성
- `handleReorderScenes(reorderedScenes)`: 씬 순서 변경

#### 3. Scene 인터페이스 확장
```typescript
interface Scene {
  // ... 기존 필드
  blank_page_type?: string;
  blank_page_content?: { text?: string; imageUrl?: string; memo?: string; };
  layout_type?: string;
  canvas_elements?: CanvasElement[];
}
```

#### 4. UI 컴포넌트 추가
- SlideView 임포트 및 조건부 렌더링
- BlankPageEditor 모달 추가
- 사이드바에 "빈 페이지" 및 "슬라이드 뷰" 버튼 추가

#### 5. SceneEditor 확장
- 빈 페이지 감지 및 BlankPageContent 렌더링
- 빈 페이지 유형별 편집 인터페이스 제공

---

## 5. 사용 흐름

### 슬라이드 뷰 사용
1. 에디터 페이지에서 사이드바의 "슬라이드 뷰" 버튼 클릭
2. 좌측에 SlideView 패널 표시
3. 드래그로 씬 순서 변경
4. 썸네일 클릭으로 씬 선택

### 빈 페이지 추가
1. 사이드바의 "빈 페이지" 버튼 클릭
2. BlankPageEditor 모달에서 유형 선택
3. 해당 유형의 빈 페이지 씬 생성
4. 자동으로 선택되어 에디터에서 편집 가능

### 캔버스 에디터 사용 (향후 구현)
1. 씬의 `layout_type`을 선택하여 레이아웃 설정
2. CanvasEditor 컴포넌트로 요소 추가/편집
3. 드래그 앤 드롭으로 요소 배치
4. 도구 모음으로 요소 스타일 조정

---

## 6. 기술 사항

### 사용 기술
- **프레임워크**: React 18, Next.js 14
- **스타일링**: Tailwind CSS
- **아이콘**: Lucide React
- **드래그 앤 드롭**: 기본 HTML5 API (외부 라이브러리 없음)
- **타입스크립트**: 완전한 타입 안정성

### 의존성
- 새로운 npm 패키지 추가 없음 (기존 의존성만 사용)

### 성능
- localStorage 자동 저장 유지
- History 기반 undo/redo 지원
- 최소한의 리렌더링

### 호환성
- 기존 기능 100% 보존
- 기존 프로젝트 전부 호환 (빈 페이지는 선택사항)
- 모든 데이터는 하위호환성 유지

---

## 7. 향후 개선 사항

### 단기 (1-2주)
- [ ] 캔버스 에디터를 편집 뷰에 통합
- [ ] 이미지에 텍스트 오버레이 기능
- [ ] 템플릿 레이아웃 선택 UI

### 중기 (1-2개월)
- [ ] 캔버스 요소에 애니메이션 추가
- [ ] 빈 페이지 템플릿 저장/재사용
- [ ] 다중 선택 및 그룹화 기능

### 장기 (3개월 이상)
- [ ] 스케치 도구 직접 구현
- [ ] 고급 그리드 레이아웃 시스템
- [ ] 협업 기능 (실시간 동기화)

---

## 8. 테스트 체크리스트

### 슬라이드 뷰
- [ ] 슬라이드 뷰 토글 버튼 작동
- [ ] 씬 드래그 앤 드롭 작동
- [ ] 씬 삭제 기능 작동
- [ ] 통계 정보 정확히 계산

### 빈 페이지
- [ ] 모든 4가지 유형의 빈 페이지 생성 가능
- [ ] 각 유형별 편집 인터페이스 표시
- [ ] 내용 저장 및 로드 작동
- [ ] 빈 페이지 삭제 가능

### 통합
- [ ] 일반 씬과 빈 페이지 혼합 가능
- [ ] 저장/로드 시 빈 페이지 정보 유지
- [ ] 기존 프로젝트 영향 없음

---

## 9. 코드 예시

### 빈 페이지 생성 예시
```typescript
// 빈 페이지 추가 버튼 클릭
onClick={() => setShowBlankPageEditor(true)}

// 유형 선택
onSelectType={(typeId) => {
  handleAddBlankPage(typeId); // 'scene-divider' 등
}}

// 생성된 씬 구조
{
  id: "abc123",
  scene_number: 5,
  title: "씬 구분",
  duration: 0,
  blank_page_type: "scene-divider",
  blank_page_content: {
    text: "제 2부"
  },
  shooting_completed: false
}
```

### 슬라이드 뷰 드래그 앤 드롭 예시
```typescript
// 드래그 시작
onDragStart={(e) => setDraggedIndex(index)}

// 드롭 위치에서
onDrop={(e) => {
  // 배열 재정렬
  const newScenes = [...scenes];
  const [draggedScene] = newScenes.splice(draggedIndex, 1);
  newScenes.splice(dropIndex, 0, draggedScene);

  // 번호 재정렬
  const renumbered = newScenes.map((s, i) => ({
    ...s,
    scene_number: i + 1
  }));

  // 콜백 호출
  onReorderScenes(renumbered);
}}
```

---

## 10. 문제 해결

### 빈 페이지가 표시되지 않음
- Scene 인터페이스에 `blank_page_type` 필드 확인
- BlankPageContent 컴포넌트가 올바르게 렌더링되는지 확인

### 슬라이드 뷰에서 드래그 작동 안 됨
- SlideView 컴포넌트의 `draggable` 속성 확인
- `onDragStart`, `onDrop` 핸들러 확인

### 데이터 저장 안 됨
- localStorage 저장 로직 확인 (기존 handleUpdateScene 사용)
- addToHistory 함수 호출 확인

---

**마지막 업데이트**: 2026-03-15
**버전**: 1.0.0
