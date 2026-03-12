// PEWPEW Studio 영상 포트폴리오 데이터
// 출처: www.pewpewstudio.com/video

export interface PortfolioItem {
  id: string;
  title: string;
  brand: string;
  category: PortfolioCategory;
  contentType: ContentType;
  platform: string[];
  tone: { temp: string; feel: string };
  color: string;
  hasModel: boolean;
  hasTypo: boolean;
  thumbnail: string;
  description: string;
  tags: string[];
  duration?: string; // 영상 길이 (예: '30초', '1분')
  videoUrl?: string; // pewpewstudio.com 영상 링크
}

export type PortfolioCategory = 'BEAUTY' | 'SKINCARE' | 'HAIRCARE' | 'FOOD' | 'FASHION' | 'LIFESTYLE' | 'INTERIOR' | 'TECH';
export type ContentType = 'ProductVideo' | 'BrandFilm' | 'HowTo' | 'Interview' | 'ShortForm' | 'Content' | 'TVC';

export const PORTFOLIO_CATEGORIES: { value: PortfolioCategory; label: string; icon: string }[] = [
  { value: 'BEAUTY', label: '뷰티', icon: '💄' },
  { value: 'SKINCARE', label: '스킨케어', icon: '🧴' },
  { value: 'HAIRCARE', label: '헤어케어', icon: '💇' },
  { value: 'FOOD', label: '푸드', icon: '🍽️' },
  { value: 'FASHION', label: '패션', icon: '👗' },
  { value: 'LIFESTYLE', label: '라이프스타일', icon: '🏠' },
  { value: 'INTERIOR', label: '인테리어', icon: '🪑' },
  { value: 'TECH', label: '테크/전자', icon: '📱' },
];

export const CONTENT_TYPES: { value: ContentType; label: string }[] = [
  { value: 'ProductVideo', label: '제품 영상' },
  { value: 'BrandFilm', label: '브랜드 필름' },
  { value: 'HowTo', label: '하우투 / 튜토리얼' },
  { value: 'Interview', label: '인터뷰' },
  { value: 'ShortForm', label: '숏폼 (릴스/틱톡)' },
  { value: 'Content', label: '콘텐츠 영상' },
  { value: 'TVC', label: 'TVC / 광고' },
];

export const PLATFORM_OPTIONS = ['Instagram', 'TikTok', 'YouTube', 'Web', '네이버', '기타'];

export const TONE_OPTIONS = {
  temp: ['따뜻한', '차가운', '중립'],
  feel: ['밝은', '차분한', '어두운', '감성적', '역동적', '고급스러운'],
};

export const TARGET_AUDIENCE_OPTIONS = [
  '10대', '20대 여성', '20대 남성', '30대 여성', '30대 남성',
  '40대 이상', 'MZ세대', '전연령', '기타',
];

export const VIDEO_PURPOSE_OPTIONS = [
  '브랜드 인지도 향상', '신제품 출시', '매출 증대',
  '소셜미디어 바이럴', '기업 홍보', '이벤트/캠페인', '기타',
];

export const DELIVERY_FORMAT_OPTIONS = [
  '16:9 (가로형)', '9:16 (세로형/릴스)', '1:1 (정사각형)',
  '4:5 (인스타그램 피드)', '복수 비율 납품',
];

// PEWPEW Studio 대표 포트폴리오 (pewpewstudio.com/video 기반 - 최신 업데이트)
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // === AROCELL (아로셀) ===
  {
    id: 'pf-001', title: '콜라셀힐러 제품 영상', brand: 'AROCELL (아로셀)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '따뜻한', feel: '고급스러운' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/arocell_collacellhealer.jpg',
    description: '콜라겐 성분을 강조한 프리미엄 스킨케어 제품 영상. 화이트 배경에 제품 클로즈업과 텍스처 연출.',
    tags: ['스킨케어', '크림', '프리미엄', '제품촬영', '화이트톤'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-002', title: '마시는 콜라겐 브랜드필름', brand: 'AROCELL (아로셀)',
    category: 'BEAUTY', contentType: 'BrandFilm', platform: ['YouTube', 'Web'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/arocell_drinkcollagen.jpg',
    description: '이너뷰티 제품의 브랜드 스토리를 담은 감성 필름. 모델과 제품의 조화로운 연출.',
    tags: ['이너뷰티', '콜라겐', '브랜드필름', '모델', '감성'],
    duration: '1분', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-003', title: '보툴케어 세럼 숏폼', brand: 'AROCELL (아로셀)',
    category: 'SKINCARE', contentType: 'ShortForm', platform: ['Instagram', 'TikTok'],
    tone: { temp: '차가운', feel: '역동적' }, color: '블루', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/arocell_botulcare.jpg',
    description: '세럼 텍스처와 드롭 장면을 다이나믹하게 편집한 15초 숏폼 콘텐츠.',
    tags: ['세럼', '숏폼', '틱톡', '다이나믹', '텍스처'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-025', title: '아로셀 앰플 영상', brand: 'AROCELL (아로셀)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '고급스러운' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/arocell_ampoule.jpg',
    description: '앰플 제품의 고급스러운 텍스처와 드롭감을 표현한 제품 영상.',
    tags: ['앰플', '스킨케어', '텍스처', '드롭', '프리미엄'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === THE WHOO (더후) ===
  {
    id: 'pf-004', title: '더후 크림 럭셔리 영상', brand: 'THE WHOO (더후)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Web', 'YouTube'],
    tone: { temp: '따뜻한', feel: '고급스러운' }, color: '골드', hasModel: false, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/thewhoo_cream.jpg',
    description: '한방 럭셔리 브랜드의 프리미엄 크림 제품 영상. 골드 톤의 고급스러운 연출.',
    tags: ['럭셔리', '한방', '크림', '골드', '프리미엄'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-005', title: '더후 세럼 시리즈', brand: 'THE WHOO (더후)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '차가운', feel: '차분한' }, color: '블랙', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/thewhoo_serum.jpg',
    description: '세럼 라인업 전체를 소개하는 시리즈 제품 영상. 다크 배경의 시크한 무드.',
    tags: ['세럼', '시리즈', '다크무드', '시크', '라인업'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === 강남글로우 ===
  {
    id: 'pf-006', title: '스팟 브라이트닝 세럼', brand: '강남글로우 (Gangnamglow)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '밝은' }, color: '화이트', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/gangnamglow_spotserum.jpg',
    description: '브라이트닝 세럼의 투명한 텍스처와 모델 사용 장면을 결합한 제품 영상.',
    tags: ['브라이트닝', '세럼', '투명', '모델', '클린뷰티'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === LOTTE (롯데) ===
  {
    id: 'pf-007', title: '롯데 브랜드필름', brand: 'LOTTE (롯데)',
    category: 'FOOD', contentType: 'BrandFilm', platform: ['YouTube', 'Web'],
    tone: { temp: '따뜻한', feel: '감성적' }, color: '레드', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/lotte_brandfilm.jpg',
    description: '롯데의 브랜드 가치와 스토리를 담은 감성적인 브랜드 필름.',
    tags: ['브랜드필름', '감성', '스토리텔링', '기업', '대기업'],
    duration: '1분 30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-008', title: '롯데 다이닝 에비뉴', brand: 'LOTTE (롯데)',
    category: 'FOOD', contentType: 'Content', platform: ['Instagram', 'YouTube'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '오렌지', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/lotte_dining.jpg',
    description: '롯데 다이닝 에비뉴의 음식과 공간을 아름답게 담아낸 콘텐츠 영상.',
    tags: ['푸드', '레스토랑', '공간', '다이닝', '분위기'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === MUHAK (무학) ===
  {
    id: 'pf-009', title: '좋은데이 제품 영상', brand: 'MUHAK (무학)',
    category: 'FOOD', contentType: 'ProductVideo', platform: ['Instagram', 'TikTok'],
    tone: { temp: '차가운', feel: '역동적' }, color: '그린', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/muhak_goodday.jpg',
    description: '소주 브랜드 좋은데이의 청량감을 강조한 제품 영상. 물방울과 얼음 연출.',
    tags: ['주류', '청량', '제품촬영', '얼음', '다이나믹'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-010', title: '좋은데이 브랜드필름', brand: 'MUHAK (무학)',
    category: 'FOOD', contentType: 'BrandFilm', platform: ['YouTube', 'Web'],
    tone: { temp: '따뜻한', feel: '감성적' }, color: '그린', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/muhak_brandfilm.jpg',
    description: '좋은데이 브랜드의 감성 스토리를 담은 시네마틱 브랜드 필름.',
    tags: ['브랜드필름', '시네마틱', '감성', '스토리', '주류'],
    duration: '1분', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === STAAACK (스택) ===
  {
    id: 'pf-011', title: '스택 무빙커버', brand: 'STAAACK (스택)',
    category: 'FASHION', contentType: 'Content', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '역동적' }, color: '블랙', hasModel: true, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/staaack_movingcover.jpg',
    description: '패션 브랜드 스택의 무빙 커버 촬영. 모델의 다이나믹한 움직임을 포착.',
    tags: ['패션', '무빙커버', '모델', '다이나믹', '스트릿'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-012', title: '스택 숏폼 콘텐츠', brand: 'STAAACK (스택)',
    category: 'FASHION', contentType: 'ShortForm', platform: ['Instagram', 'TikTok'],
    tone: { temp: '차가운', feel: '역동적' }, color: '블랙', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/staaack_shortform.jpg',
    description: '스트릿 패션 브랜드의 틱톡/릴스용 숏폼 콘텐츠 시리즈.',
    tags: ['패션', '숏폼', '릴스', '틱톡', '스트릿웨어'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-024', title: '스택 스케치 영상', brand: 'STAAACK (스택)',
    category: 'FASHION', contentType: 'Content', platform: ['YouTube'],
    tone: { temp: '차가운', feel: '차분한' }, color: '그레이', hasModel: true, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/staaack_sketch.jpg',
    description: '패션 브랜드 비하인드 씬 스케치 영상. 촬영 현장의 자연스러운 분위기.',
    tags: ['비하인드', '스케치', '패션', '현장', '자연스러운'],
    duration: '2분', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === OHUI (오휘) ===
  {
    id: 'pf-013', title: '오휘 파운데이션', brand: 'OHUI (오휘)',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '따뜻한', feel: '고급스러운' }, color: '베이지', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/ohui_foundation.jpg',
    description: '파운데이션 텍스처와 커버력을 보여주는 프리미엄 뷰티 제품 영상.',
    tags: ['파운데이션', '뷰티', '텍스처', '커버력', '프리미엄'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-014', title: '오휘 크림 라인', brand: 'OHUI (오휘)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Web'],
    tone: { temp: '따뜻한', feel: '차분한' }, color: '골드', hasModel: false, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/ohui_cream.jpg',
    description: '오휘 프리미엄 크림 라인의 제품 클로즈업 및 텍스처 영상.',
    tags: ['크림', '프리미엄', '텍스처', '클로즈업', '럭셔리'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === CODE GLOKOLOR ===
  {
    id: 'pf-015', title: '코드글로컬러 립 제품', brand: 'CODE GLOKOLOR',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram', 'TikTok'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '레드', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/codeglokolor_lip.jpg',
    description: '비비드한 립 컬러를 강조한 뷰티 제품 영상. 모델 적용샷 포함.',
    tags: ['립', '컬러', '뷰티', '비비드', '모델'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === DR.GROOT ===
  {
    id: 'pf-016', title: '닥터그루트 샴푸', brand: 'DR.GROOT (닥터그루트)',
    category: 'HAIRCARE', contentType: 'ProductVideo', platform: ['Instagram', 'YouTube'],
    tone: { temp: '차가운', feel: '차분한' }, color: '그린', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/drgroat_shampoo.jpg',
    description: '두피 케어 전문 브랜드의 샴푸 제품 영상. 자연 성분과 깨끗한 느낌 강조.',
    tags: ['샴푸', '헤어케어', '두피', '자연', '클린'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === VDL ===
  {
    id: 'pf-017', title: 'VDL 메이크업 콘텐츠', brand: 'VDL',
    category: 'BEAUTY', contentType: 'HowTo', platform: ['Instagram', 'YouTube'],
    tone: { temp: '차가운', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/vdl_makeup.jpg',
    description: 'VDL 메이크업 제품을 활용한 하우투 콘텐츠. 모델의 메이크업 과정 시연.',
    tags: ['메이크업', '하우투', '튜토리얼', '모델', '뷰티'],
    duration: '1분', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-032', title: 'VDL 베이스 쿠션', brand: 'VDL',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/vdl_cushion.jpg',
    description: 'VDL 베이스 쿠션 제품의 발림성과 커버력을 보여주는 10초 숏 영상.',
    tags: ['쿠션', '베이스', '뷰티', '커버력', '발림성'],
    duration: '10초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === FINE (파인) ===
  {
    id: 'pf-018', title: '파인 브랜드필름', brand: 'FINE (파인)',
    category: 'FOOD', contentType: 'BrandFilm', platform: ['YouTube', 'Web'],
    tone: { temp: '따뜻한', feel: '감성적' }, color: '브라운', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/fine_brandfilm.jpg',
    description: '프리미엄 식품 브랜드의 원재료와 정성을 담은 시네마틱 브랜드 필름.',
    tags: ['푸드', '브랜드필름', '원재료', '시네마틱', '프리미엄'],
    duration: '1분 30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === HOMESTAR ===
  {
    id: 'pf-019', title: '홈스타 인테리어 영상', brand: 'HOMESTAR (홈스타)',
    category: 'INTERIOR', contentType: 'Content', platform: ['Instagram', 'YouTube'],
    tone: { temp: '따뜻한', feel: '차분한' }, color: '우드', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/homestar_interior.jpg',
    description: '인테리어/가구 브랜드의 공간 연출 영상. 따뜻한 우드톤의 감성적 무드.',
    tags: ['인테리어', '가구', '공간', '우드톤', '감성'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === L'ORÉAL ===
  {
    id: 'pf-020', title: '로레알 헤어 제품', brand: "L'ORÉAL (로레알)",
    category: 'HAIRCARE', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '따뜻한', feel: '고급스러운' }, color: '골드', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/loreal_hair.jpg',
    description: '글로벌 뷰티 브랜드 로레알의 헤어케어 제품 영상. 윤기나는 헤어 연출.',
    tags: ['헤어', '로레알', '글로벌', '윤기', '프리미엄'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === UCIMALL ===
  {
    id: 'pf-021', title: '유시몰 스킨케어', brand: 'UCIMALL (유시몰)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '밝은' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/ucimall_skincare.jpg',
    description: '클린 스킨케어 제품의 미니멀한 제품 영상. 화이트 배경 깔끔한 연출.',
    tags: ['스킨케어', '미니멀', '클린', '화이트', '깔끔'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === EVERTIS ===
  {
    id: 'pf-022', title: '에버티스 제품 영상', brand: 'EVERTIS (에버티스)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '차가운', feel: '차분한' }, color: '블루', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/evertis_product.jpg',
    description: '수분 케어 제품의 워터 텍스처를 강조한 시원한 느낌의 제품 영상.',
    tags: ['수분', '워터', '텍스처', '시원한', '클린'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === JIMMY JOHN'S ===
  {
    id: 'pf-023', title: '지미존스 푸드 콘텐츠', brand: "JIMMY JOHN'S",
    category: 'FOOD', contentType: 'Content', platform: ['Instagram', 'TikTok'],
    tone: { temp: '따뜻한', feel: '역동적' }, color: '옐로우', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/jimmyjohns_food.jpg',
    description: '샌드위치 브랜드의 식욕을 자극하는 역동적인 푸드 콘텐츠.',
    tags: ['푸드', '샌드위치', '역동적', '식욕', 'F&B'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  // === 신규 추가: pewpewstudio.com 최신 확인 브랜드들 ===
  {
    id: 'pf-026', title: '페이스리퍼블릭 크림 영상', brand: 'FACEREPUBLIC (페이스리퍼블릭)',
    category: 'SKINCARE', contentType: 'ProductVideo', platform: ['Instagram', 'Web'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/facerepublic_cream.jpg',
    description: '페이스리퍼블릭 스킨케어 크림의 부드러운 텍스처와 제품 디테일 영상.',
    tags: ['스킨케어', '크림', '텍스처', '클린', '밝은'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-027', title: '더샘 라이프 뷰티', brand: 'THE SAEM (더샘)',
    category: 'BEAUTY', contentType: 'Content', platform: ['Instagram', 'YouTube'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/thesaem_life.jpg',
    description: '더샘 뷰티 라이프스타일 콘텐츠. 일상 속 뷰티 루틴을 감성적으로 담아냄.',
    tags: ['뷰티', '라이프스타일', '감성', '일상', '루틴'],
    duration: '30초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-028', title: '제인패커 핸드크림', brand: 'JANEPACKER (제인패커)',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '따뜻한', feel: '고급스러운' }, color: '베이지', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/janepacker_handcream.jpg',
    description: '보디/핸드크림 제품의 고급스러운 패키징과 텍스처를 표현한 영상.',
    tags: ['핸드크림', '보디케어', '고급', '패키징', '텍스처'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-029', title: '입큰 립틴트', brand: 'IPKN (입큰)',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram', 'TikTok'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '레드', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/ipkn_liptint.jpg',
    description: '립틴트 제품의 발색력과 지속력을 보여주는 뷰티 제품 영상.',
    tags: ['립틴트', '발색', '뷰티', '모델', '컬러풀'],
    duration: '25초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-030', title: '엘라스틴 샴푸', brand: 'ELASTINE (엘라스틴)',
    category: 'HAIRCARE', contentType: 'ProductVideo', platform: ['Instagram', 'YouTube'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/elastine_shampoo.jpg',
    description: '엘라스틴 샴푸의 풍성한 거품과 향기로운 이미지를 담은 헤어케어 영상.',
    tags: ['샴푸', '헤어케어', '거품', '향기', '모델'],
    duration: '25초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-031', title: 'CNP 립밤', brand: 'CNP (씨앤피)',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '차가운', feel: '차분한' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/cnp_lipbalm.jpg',
    description: '더마 코스메틱 브랜드 CNP의 립밤 제품 미니멀 영상.',
    tags: ['립밤', '더마', '미니멀', '클린', '제품촬영'],
    duration: '20초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-033', title: '뉴발란스키즈 라이프스타일', brand: '뉴발란스키즈 (New Balance Kids)',
    category: 'LIFESTYLE', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '화이트', hasModel: true, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/nbkids_lifestyle.jpg',
    description: '뉴발란스 키즈 라인의 밝고 활기찬 제품 라이프스타일 영상.',
    tags: ['키즈', '라이프스타일', '활기', '밝은', '스포츠'],
    duration: '5초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-034', title: '코카콜라 제품 영상', brand: 'COCA-COLA (코카콜라)',
    category: 'FOOD', contentType: 'ProductVideo', platform: ['Instagram', 'TikTok'],
    tone: { temp: '차가운', feel: '역동적' }, color: '레드', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/cocacola_product.jpg',
    description: '코카콜라의 청량감과 역동적인 이미지를 담은 제품 영상.',
    tags: ['음료', '청량', '역동적', '글로벌', '제품촬영'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-035', title: '이루다 라이프스타일', brand: 'IRUDA (이루다)',
    category: 'LIFESTYLE', contentType: 'ProductVideo', platform: ['Instagram'],
    tone: { temp: '따뜻한', feel: '감성적' }, color: '베이지', hasModel: true, hasTypo: false,
    thumbnail: '/portfolio/thumbnails/iruda_lifestyle.jpg',
    description: '이루다 라이프스타일 제품의 감성적인 일상 연출 영상.',
    tags: ['라이프스타일', '감성', '일상', '따뜻한', '모델'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-036', title: '팁시 립틴트', brand: 'TIPSY (팁시)',
    category: 'BEAUTY', contentType: 'ProductVideo', platform: ['Instagram', 'TikTok'],
    tone: { temp: '따뜻한', feel: '밝은' }, color: '핑크', hasModel: true, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/tipsy_liptint.jpg',
    description: '팁시 립틴트의 비비드한 컬러와 글로시한 질감을 보여주는 뷰티 영상.',
    tags: ['립틴트', '뷰티', '비비드', '글로시', '컬러'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
  {
    id: 'pf-037', title: '유시몰 치약 브랜드필름', brand: 'UCIMALL (유시몰)',
    category: 'LIFESTYLE', contentType: 'BrandFilm', platform: ['YouTube', 'Web'],
    tone: { temp: '차가운', feel: '차분한' }, color: '화이트', hasModel: false, hasTypo: true,
    thumbnail: '/portfolio/thumbnails/ucimall_toothpaste.jpg',
    description: '유시몰 구강케어 제품의 깨끗하고 신뢰감 있는 브랜드 필름.',
    tags: ['치약', '구강케어', '브랜드필름', '깨끗', '신뢰'],
    duration: '15초', videoUrl: 'https://www.pewpewstudio.com/video',
  },
];

// 기획안 인터페이스
export interface ProposalData {
  // 클라이언트 정보
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  // 프로젝트 정보
  projectTitle: string;
  projectDescription: string;
  category: PortfolioCategory | '';
  contentType: ContentType | '';
  platforms: string[];
  tonePref: { temp: string; feel: string };
  // 신규 필드
  targetAudience: string;
  videoPurpose: string;
  desiredDuration: string;
  deliveryFormat: string[];
  // 레퍼런스
  selectedPortfolios: string[]; // portfolio item ids
  referenceNotes: string;
  referenceItemNotes: Record<string, string>; // 개별 포트폴리오 아이템별 노트
  // 일정/예산
  desiredDate: string;
  budget: string;
  deadline: string;
  // 추가 요청
  additionalNotes: string;
  hasModel: boolean;
  hasTypo: boolean;
}

export const BUDGET_RANGES = [
  '100만원 이하',
  '100~300만원',
  '300~500만원',
  '500~1000만원',
  '1000~3000만원',
  '3000만원 이상',
  '예산 미정 (상담 후 결정)',
];

export const DURATION_OPTIONS = [
  '5~15초 (숏폼)',
  '15~30초 (SNS 광고)',
  '30초~1분',
  '1~3분',
  '3분 이상',
  '미정 (상담 후 결정)',
];

export const createEmptyProposal = (): ProposalData => ({
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  clientPhone: '',
  projectTitle: '',
  projectDescription: '',
  category: '',
  contentType: '',
  platforms: [],
  tonePref: { temp: '', feel: '' },
  targetAudience: '',
  videoPurpose: '',
  desiredDuration: '',
  deliveryFormat: [],
  selectedPortfolios: [],
  referenceNotes: '',
  referenceItemNotes: {},
  desiredDate: '',
  budget: '',
  deadline: '',
  additionalNotes: '',
  hasModel: false,
  hasTypo: false,
});

// 선택한 포트폴리오 기반 스마트 기본값 생성
export function getSmartDefaults(selectedIds: string[]): Partial<ProposalData> {
  const items = PORTFOLIO_ITEMS.filter(item => selectedIds.includes(item.id));
  if (items.length === 0) return {};

  // 가장 많이 나오는 카테고리
  const catCount: Record<string, number> = {};
  const typeCount: Record<string, number> = {};
  const platformSet = new Set<string>();
  const toneTemp: Record<string, number> = {};
  const toneFeel: Record<string, number> = {};

  items.forEach(item => {
    catCount[item.category] = (catCount[item.category] || 0) + 1;
    typeCount[item.contentType] = (typeCount[item.contentType] || 0) + 1;
    item.platform.forEach(p => platformSet.add(p));
    toneTemp[item.tone.temp] = (toneTemp[item.tone.temp] || 0) + 1;
    toneFeel[item.tone.feel] = (toneFeel[item.tone.feel] || 0) + 1;
  });

  const topCat = Object.entries(catCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const topType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const topTemp = Object.entries(toneTemp).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
  const topFeel = Object.entries(toneFeel).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  return {
    category: topCat as PortfolioCategory,
    contentType: topType as ContentType,
    platforms: Array.from(platformSet),
    tonePref: { temp: topTemp, feel: topFeel },
    hasModel: items.some(i => i.hasModel),
    hasTypo: items.some(i => i.hasTypo),
  };
}
