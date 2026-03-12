// 카메라 앵글
export const CAMERA_ANGLES = [
  { value: "정면", icon: "👤", desc: "피사체를 정면에서 촬영" },
  { value: "측면", icon: "👥", desc: "옆에서 촬영" },
  { value: "45도", icon: "📐", desc: "대각선 앵글" },
  { value: "탑뷰", icon: "🔽", desc: "위에서 아래로" },
  { value: "로우앵글", icon: "⬆️", desc: "아래에서 위로" },
  { value: "하이앵글", icon: "⬇️", desc: "위에서 내려다봄" },
  { value: "더치 앵글", icon: "🔄", desc: "기울어진 앵글, 불안감이나 역동성 표현" },
  { value: "버드아이 뷰", icon: "🦅", desc: "높은 곳에서 수직으로 내려다보는 앵글" },
  { value: "오버 더 숄더", icon: "👤➡️", desc: "어깨 너머로 촬영, 대화 씬 필수" },
];

// 샷 크기
export const SHOT_SIZES = [
  { value: "익스트림 클로즈업", short: "ECU", desc: "눈, 입 등 극도로 가까운 샷", color: "from-neutral-900 to-neutral-800" },
  { value: "클로즈업", short: "CU", desc: "얼굴 또는 제품 전체", color: "from-neutral-800 to-neutral-700" },
  { value: "미디엄 샷", short: "MS", desc: "허리 위부터 촬영", color: "from-neutral-700 to-neutral-600" },
  { value: "와이드 샷", short: "WS", desc: "전신 + 배경 포함", color: "from-neutral-600 to-neutral-500" },
  { value: "이스태블리싱 샷", short: "ES", desc: "장소 전체를 보여줌", color: "from-neutral-500 to-neutral-400" },
  { value: "버스트 샷", short: "BS", desc: "가슴 위부터 촬영", color: "from-neutral-700 to-neutral-500" },
  { value: "풀 샷", short: "FS", desc: "머리부터 발끝까지 전신", color: "from-neutral-800 to-neutral-600" },
];

// 카메라 움직임
export const CAMERA_MOVEMENTS = [
  { value: "고정", desc: "움직임 없음", arrow: "⊙" },
  { value: "줌 인", desc: "가까이", arrow: "⊕" },
  { value: "줌 아웃", desc: "멀리", arrow: "⊖" },
  { value: "팬 좌", desc: "왼쪽으로", arrow: "←" },
  { value: "팬 우", desc: "오른쪽으로", arrow: "→" },
  { value: "틸트 업", desc: "위로", arrow: "↑" },
  { value: "틸트 다운", desc: "아래로", arrow: "↓" },
  { value: "달리 인", desc: "전진", arrow: "⇀" },
  { value: "달리 아웃", desc: "후퇴", arrow: "↽" },
  { value: "트래킹", desc: "피사체를 따라가며 촬영", arrow: "⟿" },
  { value: "핸드헬드", desc: "손으로 들고 촬영, 현장감", arrow: "〰️" },
  { value: "짐벌/스테디캠", desc: "매끄러운 이동 샷", arrow: "≈" },
  { value: "랙 포커스", desc: "초점 앞↔뒤 이동", arrow: "⇄" },
];

// 조명
export const LIGHTING_OPTIONS = [
  { value: "소프트 라이트", icon: "🌤️", desc: "부드럽고 확산된 조명" },
  { value: "하드 라이트", icon: "☀️", desc: "강한 그림자, 드라마틱" },
  { value: "자연광", icon: "🌿", desc: "자연스러운 주변광" },
  { value: "스튜디오 조명", icon: "💡", desc: "컨트롤된 인공 조명" },
  { value: "역광", icon: "🌅", desc: "뒤에서 비추는 실루엣" },
  { value: "하이 콘트라스트", icon: "🎭", desc: "명암 대비 극대화" },
  { value: "실루엣", icon: "🌑", desc: "피사체 윤곽만 살리는 조명" },
  { value: "3점 조명", icon: "💡💡💡", desc: "가장 표준적인 조명 세팅" },
  { value: "실용 조명", icon: "🏠", desc: "화면 속 실제 조명 활용" },
  { value: "컬러 젤", icon: "🟣", desc: "컬러 필터로 분위기 연출" },
];

// 전환
export const TRANSITIONS = [
  { value: "컷", icon: "✂️", desc: "즉시 전환" },
  { value: "디졸브", icon: "🌊", desc: "서서히 겹쳐서 전환" },
  { value: "페이드 인", icon: "⬛➡⬜", desc: "검정에서 밝아짐" },
  { value: "페이드 아웃", icon: "⬜➡⬛", desc: "밝은 것에서 어두워짐" },
  { value: "와이프", icon: "➡️", desc: "밀어내기 전환" },
  { value: "매치 컷", icon: "🔗", desc: "이전 씬과 형태/동작 연결" },
  { value: "스위시 팬", icon: "💨", desc: "빠르게 돌리며 전환" },
];

// 렌즈 설정
export const LENS_OPTIONS = [
  { value: "광각 (Wide)", desc: "넓은 화각, 공간감 강조", focal: "16-35mm" },
  { value: "표준 (Normal)", desc: "자연스러운 시야각", focal: "35-50mm" },
  { value: "망원 (Tele)", desc: "피사체 압축, 배경 흐림", focal: "70-200mm" },
  { value: "매크로 (Macro)", desc: "극도로 가까운 접사 촬영", focal: "100mm" },
  { value: "24mm", desc: "약간 넓은 화각", focal: "24mm" },
  { value: "35mm", desc: "자연스러운 광각", focal: "35mm" },
  { value: "50mm", desc: "표준 렌즈", focal: "50mm" },
  { value: "85mm", desc: "인물 촬영 최적", focal: "85mm" },
];

// 프레임레이트 설정
export const FRAMERATE_OPTIONS = [
  { value: "24fps", desc: "영화 표준 프레임레이트" },
  { value: "30fps", desc: "TV/웹 표준" },
  { value: "60fps", desc: "스포츠/액션용 부드러운 영상" },
  { value: "120fps", desc: "슬로우 모션용" },
  { value: "타임랩스", desc: "시간 압축 촬영" },
];

export const VIDEO_TYPES = ["광고", "제품 커머셜", "브랜드 필름", "소셜미디어 숏폼", "인터뷰 영상", "뮤직비디오", "다큐멘터리", "튜토리얼"];
export const PLATFORMS = ["유튜브", "인스타그램", "틱톡", "페이스북", "TV", "극장", "웹"];
export const TONES = ["프로페셔널", "캐주얼", "드라마틱", "유쾌한", "럭셔리", "미니멀", "에너지틱", "감성적"];

export const TEMPLATES = [
  {
    id: "product-ad",
    name: "제품 광고",
    icon: "📦",
    description: "핵심 기능을 보여주는 30초 제품 쇼케이스",
    videoType: "광고",
    scenes: [
      { title: "오프닝 훅", duration: 3, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "달리 인", lighting: "스튜디오 조명", description: "브랜드 로고 애니메이션과 함께 드라마틱한 제품 공개." },
      { title: "제품 클로즈업", duration: 4, camera_angle: "45도", shot_size: "클로즈업", camera_movement: "줌 인", lighting: "소프트 라이트", description: "제품의 질감과 디자인을 상세하게 보여주는 클로즈업." },
      { title: "특징 하이라이트 1", duration: 5, camera_angle: "측면", shot_size: "미디엄 샷", camera_movement: "팬 우", lighting: "자연광", description: "라이프스타일 세팅에서 첫 번째 핵심 기능 시연." },
      { title: "특징 하이라이트 2", duration: 5, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "팬 좌", lighting: "자연광", description: "핸즈온 인터랙션과 함께 두 번째 핵심 기능 시연." },
      { title: "라이프스타일 샷", duration: 5, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "고정", lighting: "자연광", description: "실제 사용 환경에서의 제품 모습." },
      { title: "콜투액션", duration: 4, camera_angle: "정면", shot_size: "미디엄 샷", camera_movement: "줌 인", lighting: "스튜디오 조명", description: "브랜드 로고, 가격, 구매 정보 표시." },
      { title: "엔드카드", duration: 4, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "고정", lighting: "스튜디오 조명", description: "웹사이트와 SNS 핸들이 포함된 마지막 브랜딩." },
    ]
  },
  {
    id: "beauty-commercial",
    name: "뷰티 커머셜",
    icon: "💄",
    description: "우아한 뷰티 제품 쇼케이스",
    videoType: "제품 커머셜",
    scenes: [
      { title: "추상적 오프닝", duration: 3, camera_angle: "탑뷰", shot_size: "익스트림 클로즈업", camera_movement: "줌 아웃", lighting: "소프트 라이트", description: "크림, 파우더 또는 리퀴드의 매크로 질감 샷." },
      { title: "모델 소개", duration: 4, camera_angle: "정면", shot_size: "클로즈업", camera_movement: "고정", lighting: "소프트 라이트", description: "완벽한 피부와 조명으로 모델 얼굴 공개." },
      { title: "사용 장면", duration: 6, camera_angle: "45도", shot_size: "클로즈업", camera_movement: "팬 우", lighting: "스튜디오 조명", description: "슬로우 모션으로 제품 사용 장면." },
      { title: "비포 & 애프터", duration: 5, camera_angle: "정면", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "변화를 보여주는 분할 또는 트랜지션." },
      { title: "제품 뷰티 샷", duration: 4, camera_angle: "45도", shot_size: "클로즈업", camera_movement: "달리 인", lighting: "역광", description: "우아한 스타일링의 히어로 제품 샷." },
      { title: "브랜드 클로징", duration: 3, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "고정", lighting: "스튜디오 조명", description: "태그라인과 함께 로고 공개." },
    ]
  },
  {
    id: "food-video",
    name: "푸드 영상",
    icon: "🍕",
    description: "식욕을 자극하는 푸드 쇼케이스 또는 레시피 영상",
    videoType: "소셜미디어 숏폼",
    scenes: [
      { title: "재료 배치", duration: 4, camera_angle: "탑뷰", shot_size: "와이드 샷", camera_movement: "고정", lighting: "자연광", description: "모든 재료를 아름답게 펼쳐놓은 버즈아이 뷰." },
      { title: "조리 액션", duration: 6, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "팬 우", lighting: "자연광", description: "셰프가 역동적인 움직임으로 요리하는 장면." },
      { title: "시즐 샷", duration: 3, camera_angle: "측면", shot_size: "클로즈업", camera_movement: "줌 인", lighting: "하드 라이트", description: "지글거리고, 붓고, 뒤집는 조리 액션 클로즈업." },
      { title: "플레이팅", duration: 4, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "가니시 디테일과 함께 정성스러운 플레이팅." },
      { title: "히어로 샷", duration: 5, camera_angle: "로우앵글", shot_size: "클로즈업", camera_movement: "달리 인", lighting: "자연광", description: "완성된 요리의 최종 뷰티 샷." },
      { title: "시식", duration: 3, camera_angle: "정면", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "첫 한입을 맛보며 리액션하는 모습." },
    ]
  },
  {
    id: "interview",
    name: "인터뷰 영상",
    icon: "🎙️",
    description: "B-롤이 포함된 프로페셔널 인터뷰 세팅",
    videoType: "인터뷰 영상",
    scenes: [
      { title: "장소 이스태블리싱", duration: 4, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "팬 우", lighting: "자연광", description: "인터뷰 장소와 세팅의 와이드 샷." },
      { title: "게스트 소개", duration: 6, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "하단 자막에 이름과 직함이 표시된 게스트 착석 모습." },
      { title: "인터뷰 A카메라", duration: 30, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "게스트를 향한 메인 인터뷰 앵글." },
      { title: "인터뷰어 컷어웨이", duration: 5, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "고개를 끄덕이며 경청하는 인터뷰어 리액션 샷." },
      { title: "B-롤 시퀀스", duration: 10, camera_angle: "정면", shot_size: "와이드 샷", camera_movement: "달리 인", lighting: "자연광", description: "인터뷰 주제와 관련된 보조 영상." },
      { title: "클로징", duration: 5, camera_angle: "정면", shot_size: "미디엄 샷", camera_movement: "줌 아웃", lighting: "소프트 라이트", description: "감사 인사와 브랜딩이 포함된 아웃트로." },
    ]
  },
  {
    id: "social-short",
    name: "소셜미디어 숏폼",
    icon: "📱",
    description: "릴스/틱톡용 15초 세로 영상",
    videoType: "소셜미디어 숏폼",
    scenes: [
      { title: "훅", duration: 2, camera_angle: "정면", shot_size: "클로즈업", camera_movement: "줌 인", lighting: "자연광", description: "시선을 사로잡는 오프닝 프레임." },
      { title: "메인 콘텐츠", duration: 5, camera_angle: "45도", shot_size: "미디엄 샷", camera_movement: "팬 좌", lighting: "자연광", description: "핵심 메시지 또는 제품 쇼케이스." },
      { title: "트랜지션", duration: 2, camera_angle: "탑뷰", shot_size: "클로즈업", camera_movement: "줌 아웃", lighting: "스튜디오 조명", description: "다음 세그먼트로의 크리에이티브 전환." },
      { title: "하이라이트", duration: 3, camera_angle: "로우앵글", shot_size: "와이드 샷", camera_movement: "달리 인", lighting: "하드 라이트", description: "핵심 순간 또는 리빌." },
      { title: "CTA", duration: 3, camera_angle: "정면", shot_size: "미디엄 샷", camera_movement: "고정", lighting: "소프트 라이트", description: "텍스트 오버레이가 포함된 콜투액션." },
    ]
  }
];

export const getAdminEmails = () => {
  const emails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return emails.split(',').map(e => e.trim()).filter(Boolean);
};

export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email);
};
