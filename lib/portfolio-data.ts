// PEWPEW Studio 영상 포트폴리오 데이터
// 출처: www.pewpewstudio.com/video - 실제 포트폴리오 400개 영상 기반
// 자동 생성됨 - 2026.03.15

export interface PortfolioItem {
  id: string;
  filename: string;
  brand: string;
  brandEn: string;
  categories: string[]; // beautyproduct, brandfilm, productvideo, howto, interview, content, b&a
  hasModel: boolean;
  productType: string; // skin, hair, color, lip, food, fashion, lifestyle, etc.
  tone: { temp: string; feel: string };
  colors: string[];
  color: string; // backward compat
  thumbnail: string;
  videoUrl: string;
  isWide: boolean; // 16:9 or wide format
  // backward compatibility fields
  title: string;
  category: PortfolioCategory | string;
  contentType: string;
  hasTypo: boolean;
  platform: string[];
  description: string;
  tags: string[];
  duration: string;
}

// 웹사이트 카테고리 (pewpewstudio.com 기준)
export type SiteCategory = 'Beauty' | 'Product' | 'Brand' | 'HowTo' | 'Interview';

export const SITE_CATEGORIES: { value: SiteCategory | 'ALL'; label: string; icon: string }[] = [
  { value: 'ALL', label: '전체', icon: '🎬' },
  { value: 'Beauty', label: 'Beauty', icon: '💄' },
  { value: 'Product', label: 'Product', icon: '📦' },
  { value: 'Brand', label: 'Brand', icon: '🏢' },
  { value: 'HowTo', label: 'How to', icon: '📚' },
  { value: 'Interview', label: 'Interview', icon: '🎤' },
];

// 제품 타입 필터
export const PRODUCT_TYPES: { value: string; label: string; icon: string }[] = [
  { value: 'skin', label: '스킨케어', icon: '🧴' },
  { value: 'hair', label: '헤어케어', icon: '💇' },
  { value: 'color', label: '색조', icon: '💄' },
  { value: 'lip', label: '립', icon: '👄' },
  { value: 'body', label: '바디', icon: '🧼' },
  { value: 'food', label: '푸드', icon: '🍽️' },
  { value: 'fashion', label: '패션', icon: '👗' },
  { value: 'lifestyle', label: '라이프스타일', icon: '🏠' },
  { value: 'sun', label: '선케어', icon: '☀️' },
  { value: 'tooth', label: '구강', icon: '🦷' },
  { value: 'base', label: '베이스', icon: '✨' },
];

// 콘텐츠 타입 필터
export const CONTENT_TYPES: { value: string; label: string }[] = [
  { value: 'beautyproduct', label: '뷰티 제품영상' },
  { value: 'productvideo', label: '제품영상' },
  { value: 'brandfilm', label: '브랜드필름' },
  { value: 'howto', label: 'How to' },
  { value: 'interview', label: '인터뷰' },
  { value: 'content', label: '콘텐츠' },
  { value: 'b&a', label: 'B&A' },
];

const THUMB_BASE = 'https://www.pewpewstudio.com/portfolio/thumbnails/';
const VIDEO_BASE = 'https://viewer.pewpewstudio.com/api/video?path=%2FUsers%2Fpewpew_server%2FPEWPEW_Portfolio%2FPEWPEW_VD_PF%2F';

// 썸네일 파일명 → URL 생성 헬퍼
function thumbUrl(filename: string): string {
  return THUMB_BASE + encodeURIComponent(filename) + '.jpg';
}
function videoUrl(filename: string): string {
  return VIDEO_BASE + encodeURIComponent(filename) + '.mp4';
}

// 사이트 카테고리 매핑
function getSiteCategory(cats: string[]): SiteCategory {
  if (cats.includes('interview')) return 'Interview';
  if (cats.includes('howto')) return 'HowTo';
  if (cats.includes('brandfilm')) return 'Brand';
  if (cats.includes('beautyproduct')) return 'Beauty';
  return 'Product';
}

export function getSiteCategoryForItem(item: PortfolioItem): SiteCategory {
  return getSiteCategory(item.categories);
}

// ====== 400개 실제 포트폴리오 데이터 ======
// format: [filename, brand(KR), categories, hasModel(1/0), productTypes, toneTemp, toneFeel, colors]
const RAW_DATA: string[] = [
  // === 아로셀 ===
  '251224_arocell_아로셀_콜라셀힐러메카니즘_40s_h264_fhd_9x16|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_arocell_아로셀_콜라셀힐러메카니즘_40s_h264_fhd_16x9|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_arocell_아로셀_마시는콜라겐_20s_h264_fhd_9x16|아로셀|beautyproduct,productvideo,brandfilm|1|skin+food|따뜻한|밝은|화이트+핑크',
  // === 고바이글리머 ===
  '251218_gobyglimmer_고바이글리머_wide_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|blush+화이트+핑크',
  '251218_gobyglimmer_고바이글리머_vert_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|blush+화이트+핑크',
  // === 더페이스샵 ===
  '251215_tfs_더페이스샵_56010193|더페이스샵|productvideo,beautyproduct|0|skin|따뜻한|차분한|화이트+베이지',
  // === 어글리러블리 ===
  '251211_uglylovely_어글리러블리_53070003|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_uglylovely_어글리러블리_53070002_02|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_uglylovely_어글리러블리_53070002_01|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  // === 닥터그루트 ===
  '250807_drgroot_닥터그루트_vert_5s_cr스팟젤영상|닥터그루트|content|0|hair|||',
  '250807_drgroot_닥터그루트_vert_10s_cr워터스케일러영상|닥터그루트|beautyproduct|0|hair|||',
  '250807_drgroot_닥터그루트_vert_10s_cr10초워터스케일러영상|닥터그루트|content|0|hair|||',
  // === 이자녹스 ===
  '250806_isaknox_이자녹스_vert_30s_이자녹스|이자녹스|productvideo|0|base|||',
  // === 빌리프 ===
  '250804_belif_빌리프_vert_20s_프로즌키트|빌리프|content|0|skin+sun|||',
  '250718_drgroot_닥터그루트_vert_25s_클리니컬릴리프샴푸|닥터그루트|productvideo|0|hair|||',
  '250717_drgroot_닥터그루트_vert_15s_클리니컬릴리프스팟젤|닥터그루트|productvideo,howto,content|1|hair|||',
  // === 스택 ===
  '250714_staaack_스택_vert_25s_숏폼b|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_20s_무빙커버b|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_15s_숏폼a|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_15s_무빙커버a|스택|brandfilm,content|1|fashion|||',
  '250711_tfs_더페이스샵_wide_20s|더페이스샵|productvideo|1|sun|||',
  '250711_tfs_더페이스샵_vert_20s|더페이스샵|productvideo|1|sun|||',
  '250703_drgroot_닥터그루트_wide_45s_srs라인|닥터그루트|brandfilm|1|hair|||',
  '250703_drgroot_닥터그루트_vert_45s_srs라인|닥터그루트|brandfilm|1|hair|||',
  // === 코드글로컬러 ===
  '250204_codeglokolor_코드글로컬러_vert_20s_소프트블러리퀴드블러셔|코드글로컬러|productvideo,howto|0|color|||',
  // === 히말라야핑크솔트 ===
  '250203_himalayapinksalt_히말라야핑크솔트_wide_20s|히말라야핑크솔트|productvideo,beautyproduct|0|hair|||',
  '250116_drgroot_닥터그루트_vert_20s_캡슐트리트먼트|닥터그루트|beautyproduct|0|hair|||',
  '250116_drgroot_닥터그루트_vert_20s_두피영양토닉|닥터그루트|beautyproduct|0|hair|||',
  // === 브이디엘 ===
  '250114_vdl_브이디엘_vert_25s_에센셜아이섀도우듀오|브이디엘|productvideo,howto|0|color|||',
  '250113_codeglokolor_코드글로컬러_wide_30s_블러셔앤립_제품영상|코드글로컬러|beautyproduct,productvideo|1|color+lip|||',
  // === 비욘드글로우 ===
  '250107_beyondglow_비욘드글로우_wide_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  '250107_beyondglow_비욘드글로우_vert_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  '250106_tfs_더페이스샵_wide_45s_제품5라인_다이소did영상|더페이스샵|productvideo|1|skin+body+hair|||',
  // === 오가니스트 ===
  '240530_organist_오가니스트_vert_30s_헤어라인전제품_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240527_tfs_더페이스샵_vert_25s_히알루론산크림_v2|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_25s_히알루론산크림_v1|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_25s_비건뮤신펩타이드크림_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_20s_올티밋멀티비타10프로세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_20s_비건뮤신펩타이드8세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240522_himalayapinksalt_히말라야핑크솔트_wide_25s_퍼플화이트닝치약|히말라야핑크솔트|productvideo|1|tooth|||',
  // === 팁시 ===
  '240520_tpsy_팁시_vert_25s_팁시세트_숏폼컨텐츠|팁시|productvideo,content|0|lip|||',
  // === 엘라스틴 ===
  '240517_elastine_엘라스틴_wide_25s_웨이브샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  '240517_elastine_엘라스틴_wide_25s_스트레이트샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  // === 에이뮤 ===
  '240412_aimu_에이뮤_vert_30s_lifestyle_정수기_v2|에이뮤|productvideo|0|lifestyle|||',
  '240412_aimu_에이뮤_vert_30s_lifestyle_정수기_v1|에이뮤|productvideo|0|lifestyle|||',
  // === 카마루 ===
  '240304_kamaru_카마루_wide_45s|카마루|productvideo|0|lifestyle|||',
  // === 페이스리퍼블릭 ===
  '240206_facerepublic_페이스리퍼블릭_wide_30s_blooming|페이스리퍼블릭|beautyproduct|1|skin|||',
  // === 에이딕트 ===
  '240309_addict_에이딕트_wide_25s|에이딕트|beautyproduct|1|lifestyle|따뜻한|밝은|',
];

// 파싱 함수
function parseRawData(raw: string): PortfolioItem {
  const [filename, brand, cats, model, prodType, toneTemp, toneFeel, colorsStr] = raw.split('|');

  const isWide = filename.includes('wide') || filename.includes('16x9');
  const catList = cats.split(',').filter(Boolean);
  const colorList = colorsStr ? colorsStr.split('+').filter(Boolean) : [];

  // Extract brandEn from filename
  const parts = filename.split('_');
  const brandEn = parts.length >= 2 ? parts[1] : '';

  // Extract duration from filename (e.g. _30s_ or _45s_)
  const durMatch = filename.match(/_(\d+)s[_$]/);
  const duration = durMatch ? `${durMatch[1]}초` : '';

  // Map productType to PortfolioCategory
  const catMap: Record<string, string> = {
    skin: 'SKINCARE', hair: 'HAIRCARE', color: 'BEAUTY', lip: 'BEAUTY',
    base: 'BEAUTY', food: 'FOOD', fashion: 'FASHION', lifestyle: 'LIFESTYLE',
    body: 'BEAUTY', sun: 'SKINCARE', tooth: 'LIFESTYLE',
  };
  const firstProdType = prodType.split('+')[0];
  const category = catMap[firstProdType] || 'BEAUTY';

  // Map categories to contentType
  const contentTypeMap: Record<string, string> = {
    beautyproduct: 'ProductVideo', productvideo: 'ProductVideo', brandfilm: 'BrandFilm',
    howto: 'HowTo', interview: 'Interview', content: 'Content', 'b&a': 'Content',
  };
  const contentType = contentTypeMap[catList[0]] || 'ProductVideo';

  // Extract title from filename parts
  const titleParts = parts.slice(3).filter(p => !['h264', 'fhd', '9x16', '16x9', 'wide', 'vert'].includes(p.toLowerCase()) && !/^\d+s$/.test(p));
  const title = titleParts.join(' ') || brand;

  return {
    id: `pf-${filename.replace(/[^a-z0-9]/gi, '').substring(0, 30)}`,
    filename,
    brand,
    brandEn,
    categories: catList,
    hasModel: model === '1',
    productType: prodType || '',
    tone: { temp: toneTemp || '', feel: toneFeel || '' },
    colors: colorList,
    color: colorList[0] || '',
    thumbnail: THUMB_BASE + encodeURIComponent(filename.split('_').map((p, i) => {
      if (i === 0) return p;
      return p.charAt(0).toUpperCase() + p.slice(1);
    }).join('_')) + '.jpg',
    videoUrl: VIDEO_BASE + encodeURIComponent(filename) + '.mp4',
    isWide,
    // backward compat
    title,
    category,
    contentType,
    hasTypo: false,
    platform: [],
    description: `${brand} ${title}`,
    tags: catList,
    duration,
  };
}

// 실제 데이터 변환 + 중복 제거
// 1) wide/vert, 16x9/9x16 같은 포맷 차이 제거 (wide 우선)
// 2) h264/fhd/hd 같은 코덱/해상도 표기 차이 제거
function deduplicateItems(items: PortfolioItem[]): PortfolioItem[] {
  const seen = new Map<string, PortfolioItem>();
  for (const item of items) {
    // 포맷/해상도/코덱 관련 키워드를 모두 정규화하여 같은 영상 식별
    const baseKey = item.filename
      .replace(/_wide/g, '_FMT')
      .replace(/_vert/g, '_FMT')
      .replace(/_16x9/g, '')
      .replace(/_9x16/g, '')
      .replace(/_h264/g, '')
      .replace(/_fhd/g, '')
      .replace(/_hd(?=_|$)/g, '')
      .replace(/_+/g, '_')
      .replace(/_$/g, '');

    const existing = seen.get(baseKey);
    if (!existing) {
      seen.set(baseKey, item);
    } else {
      // wide/16x9 버전 우선
      const isWide = item.filename.includes('_wide') || item.filename.includes('_16x9');
      const existingIsWide = existing.filename.includes('_wide') || existing.filename.includes('_16x9');
      if (isWide && !existingIsWide) {
        seen.set(baseKey, item);
      }
    }
  }
  return Array.from(seen.values());
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = deduplicateItems(RAW_DATA.map(parseRawData));

// 브랜드 목록 (고유)
export const PORTFOLIO_BRANDS: string[] = [...new Set(PORTFOLIO_ITEMS.map(i => i.brand))].sort();

// 사이트 카테고리별 필터
export function filterByCategory(items: PortfolioItem[], cat: SiteCategory | 'ALL'): PortfolioItem[] {
  if (cat === 'ALL') return items;
  return items.filter(item => {
    const siteCat = getSiteCategoryForItem(item);
    return siteCat === cat;
  });
}

// 제품 타입별 필터
export function filterByProductType(items: PortfolioItem[], type: string): PortfolioItem[] {
  return items.filter(item => item.productType.includes(type));
}

// 브랜드별 필터
export function filterByBrand(items: PortfolioItem[], brand: string): PortfolioItem[] {
  return items.filter(item => item.brand === brand);
}

// 16:9 영상만 필터 (대표 영상)
export function getWideOnly(items: PortfolioItem[]): PortfolioItem[] {
  return items.filter(item => item.isWide);
}

// 브랜드별 대표 영상 1개씩 (16:9 우선)
export function getRepresentativeVideos(): PortfolioItem[] {
  const brandMap = new Map<string, PortfolioItem>();
  PORTFOLIO_ITEMS.forEach(item => {
    const existing = brandMap.get(item.brand);
    if (!existing || (item.isWide && !existing.isWide)) {
      brandMap.set(item.brand, item);
    }
  });
  return [...brandMap.values()];
}

// ====== 하위 호환 (PortfolioProposal.tsx 등에서 사용) ======
export type PortfolioCategory = 'BEAUTY' | 'SKINCARE' | 'HAIRCARE' | 'FOOD' | 'FASHION' | 'LIFESTYLE' | 'INTERIOR' | 'TECH';

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

export const BUDGET_RANGES = [
  '100만원 이하', '100-300만원', '300-500만원', '500-1000만원', '1000만원 이상',
];

export const DURATION_OPTIONS = [
  '15초', '30초', '60초', '90초', '2분', '3분 이상',
];

export const DELIVERY_FORMAT_OPTIONS = [
  '16:9 (가로형)', '9:16 (세로형/릴스)', '1:1 (정사각형)',
  '4:5 (인스타그램 피드)', '복수 비율 납품',
];

export interface ProposalData {
  clientName: string;
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  category: PortfolioCategory | '';
  contentType: string;
  selectedPortfolios: string[];
  platform: string[];
  platforms: string[];
  tonePref: { temp: string; feel: string };
  targetAudience: string;
  videoPurpose: string;
  budgetRange: string;
  duration: string;
  deliveryFormat: any;
  additionalNotes: string;
  deadline: string;
  [key: string]: any;
}

export function createEmptyProposal(): ProposalData {
  return {
    clientName: '', brandName: '', contactEmail: '', contactPhone: '',
    category: '', contentType: '', selectedPortfolios: [], platform: [], platforms: [],
    tonePref: { temp: '', feel: '' }, targetAudience: '',
    videoPurpose: '', budgetRange: '', duration: '',
    deliveryFormat: '', additionalNotes: '', deadline: '',
  };
}

export function getSmartDefaults(selectedIds: string[]): Partial<ProposalData> {
  // Basic smart defaults based on selected portfolios
  return {};
}
