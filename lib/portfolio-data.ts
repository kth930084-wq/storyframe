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
  // === 아로셀 ===
  '251224_Arocell_아로셀_콜라셀힐러메카니즘_40s_H264_FHD_9x16|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_Arocell_아로셀_콜라셀힐러메카니즘_40s_H264_FHD_16x9|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_Arocell_아로셀_마시는콜라겐_20s_H264_FHD_9x16|아로셀|beautyproduct,productvideo,brandfilm|1|skin+food|따뜻한|밝은|화이트+핑크',
  // === 고바이글리머 ===
  '251218_GOBYGLIMMER_고바이글리머_Wide_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|화이트+핑크',
  '251218_GOBYGLIMMER_고바이글리머_Vert_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|화이트+핑크',
  // === 더페이스샵 ===
  '251215_TFS_더페이스샵_56010193|더페이스샵|productvideo,beautyproduct|0|skin|따뜻한|차분한|화이트+베이지',
  // === 어글리러블리 ===
  '251211_Uglylovely_어글리러블리_53070003|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_Uglylovely_어글리러블리_53070002_02|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_Uglylovely_어글리러블리_53070002_01|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  // === 피지오겔 ===
  '251210_PHYSIOGEL_피지오겔_12231370_1920x1080|피지오겔|productvideo,beautyproduct,brandfilm|1|skin|차가운|밝은|화이트+블루',
  '251210_PHYSIOGEL_피지오겔_12231370_1080x1920|피지오겔|productvideo,beautyproduct,brandfilm|1|skin|차가운|밝은|화이트+블루',
  // === 닥터그루트 ===
  '251204_Drgroot_닥터그루트_11374262|닥터그루트|beautyproduct|0|hair|따뜻한|차분한|화이트',
  // === 제품영상 ===
  '251119_좋은데이_제품영상_FHD_H264_WIDE|제품영상|productvideo,beautyproduct,brandfilm|0|food|차가운|밝은|화이트+블루',
  '251119_좋은데이_브랜드필름_FHD_H264_WIDE|브랜드필름|productvideo,beautyproduct,brandfilm|0|food|차가운|밝은|화이트+블루',
  '251119_좋은데이_브랜드필름_FHD_H264_VERT|브랜드필름|productvideo,beautyproduct,brandfilm|0|food|차가운|밝은|화이트+블루',
  // === 더후 ===
  '251118_Thewhoo_더후_Clip03|더후|beautyproduct,brandfilm|0|skin|따뜻한|어두운|블랙',
  '251118_Thewhoo_더후_Clip02|더후|beautyproduct,brandfilm|0|skin|따뜻한|밝은|화이트',
  '251118_Thewhoo_더후_Clip01|더후|content|0|skin|따뜻한|밝은|화이트',
  // === 콜라겐글루타치온 ===
  '251117_파이어_콜라겐글루타치온_Clip02_FHD_H264_WIDE|콜라겐글루타치온|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_콜라겐글루타치온_Clip02_FHD_H264_VERT|콜라겐글루타치온|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_콜라겐글루타치온_Clip01_FHD_H264_WIDE|콜라겐글루타치온|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_콜라겐글루타치온_Clip01_FHD_H264_VERT|콜라겐글루타치온|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_레몬시자임_Clip02_FHD_H264_WIDE|레몬시자임|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_레몬시자임_Clip02_FHD_H264_VERT|레몬시자임|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_레몬시자임_Clip01_FHD_H264_WIDE|레몬시자임|productvideo,content|1|food|따뜻한|밝은|레드',
  '251117_파이어_레몬시자임_Clip01_FHD_H264_VERT|레몬시자임|productvideo,content|1|food|따뜻한|밝은|레드',
  // === 홈스타 ===
  '251111_Homestar_홈스타_10891385_10891386_10891387|홈스타|productvideo,content|0|lifestyle|차가운|밝은|화이트',
  // === 숨 ===
  '251104_Sum_숨_핸드크림_51905947_51905943_677456_677457_51905938_51905945|숨|content,productvideo,beautyproduct|0|skin+body|따뜻한|차분한|화이트',
  '251104_Sum_숨_소셜무비_51905947_51905943_677456_677457_51905938_51905945|숨|content,productvideo,beautyproduct|0|skin+body|따뜻한|차분한|화이트',
  // === 닥터그루트 ===
  '251103_Drgroot_닥터그루트_11373722|닥터그루트|productvideo,content|1|hair|따뜻한|차분한|화이트',
  // === 오휘 ===
  '251028_Ohui_오휘_Clip03_50710336_50710315|오휘|content|0|skin+base|따뜻한|차분한|화이트',
  '251028_Ohui_오휘_Clip02_50710336_50710315|오휘|beautyproduct,productvideo|0|skin+base|따뜻한|차분한|화이트',
  '251028_Ohui_오휘_Clip01_50710336_50710315|오휘|beautyproduct,productvideo|0|skin+base|따뜻한|차분한|화이트',
  // === 히말라야핑크솔트 ===
  '251025_Himalayapinksalt_히말라야핑크솔트_SB광고영상|히말라야핑크솔트|productvideo,content|0|tooth|차가운|선명한|화이트',
  // === 홈스타 ===
  '251023_Homestar_홈스타_10891448|홈스타|productvideo,content|0|lifestyle|따뜻한|밝은|화이트',
  // === 스택 ===
  '251018_Staaack_스택_스케치영상|스택|sketch|1|fashion|따뜻한|밝은|화이트',
  '251016_Staaack_스택_숏폼B|스택|content|1|fashion|따뜻한|밝은|화이트',
  '251016_Staaack_스택_숏폼A|스택|content|1|fashion|따뜻한|밝은|화이트',
  '251016_Staaack_스택_무빙포스터|스택|brandfilm|1|fashion|따뜻한|밝은|화이트',
  // === 어글리러블리 ===
  '251015_Uglylovely_어글리러블리_영상컨셉06_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251015_Uglylovely_어글리러블리_영상컨셉05_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251015_Uglylovely_어글리러블리_영상컨셉04_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251015_Uglylovely_어글리러블리_영상컨셉03_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251015_Uglylovely_어글리러블리_영상컨셉02_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251015_Uglylovely_어글리러블리_영상컨셉01_5307003_5307004|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  // === 브이디엘 ===
  '251014_VDL_브이디엘_1920X1080|브이디엘|productvideo,content|0|base|따뜻한|밝은|화이트',
  '251014_VDL_브이디엘_1080X1920|브이디엘|productvideo,content|0|base|따뜻한|밝은|화이트',
  // === 더마모프 ===
  '251013_Dermamof_더마모프_WIDE_30s|더마모프|productvideo,beautyproduct|0|skin|||',
  // === 홈스타 ===
  '251003_Homestar_홈스타_10891395_10891393_10891396_Full|홈스타|productvideo,content|0|lifestyle|차가운|밝은|화이트',
  '251003_Homestar_홈스타_10891395_10891393_10891396_03|홈스타|productvideo,content|0|lifestyle|차가운|밝은|화이트',
  '251003_Homestar_홈스타_10891395_10891393_10891396_02|홈스타|productvideo,content|0|lifestyle|차가운|밝은|화이트',
  '251003_Homestar_홈스타_10891395_10891393_10891396_01|홈스타|productvideo,content|0|lifestyle|차가운|밝은|화이트',
  // === 더후 ===
  '251001_TheWhoo_더후_Clip04|더후|beautyproduct,brandfilm|0|skin|차가운|밝은|화이트+블루',
  '251001_TheWhoo_더후_Clip03|더후|beautyproduct,brandfilm|0|skin|차가운|밝은|화이트+블루',
  '251001_TheWhoo_더후_Clip02|더후|beautyproduct,content|0|skin|차가운|밝은|화이트+블루',
  '251001_TheWhoo_더후_Clip01|더후|beautyproduct,brandfilm|0|skin|차가운|밝은|화이트+블루',
  // === 세이프남극솔트주방세제 ===
  '250922_자연퐁_세이프남극솔트주방세제|세이프남극솔트주방세제|productvideo,content|0|lifestyle|차가운|선명한|화이트+블루',
  // === 더페이스샵 ===
  '250919_TFS_더페이스샵_56010446_07|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_06|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_05|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_04|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_03|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_02|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  '250919_TFS_더페이스샵_56010446_01|더페이스샵|content,productvideo|0|skin|따뜻한|밝은|화이트',
  // === 스택 ===
  '250916_Staaack_스택_숏폼B|스택|content|1|fashion|따뜻한|밝은|화이트',
  '250916_Staaack_스택_숏폼A|스택|content|1|fashion|따뜻한|밝은|화이트',
  '250916_Staaack_스택_무빙커버A|스택|content|1|fashion|따뜻한|밝은|화이트',
  // === 파인 ===
  '250915_Fine_파인_WIDE_2m_final|파인|brandfilm|1|food+brand|||',
  '250915_Fine_파인_VERT_2m_final|파인|brandfilm|1|food+brand|||',
  '250915_Fine_파인_SHORT_45s_final|파인|brandfilm|1|food+brand|||',
  // === 홈스타 ===
  '250910_Homestar_홈스타_구연산수_10891393|홈스타|productvideo,content|0|lifestyle|따뜻한|밝은|화이트',
  // === 닥터그루트 ===
  '250908_Drgroot_닥터그루트_11374375|닥터그루트|beautyproduct,content|1|hair|차가운|밝은|화이트',
  // === 어글리러블리 ===
  '250905_Uglylovely_어글리러블리_영상컨셉05_5307003_5307004|어글리러블리|content,productvideo|0|skin|차가운|밝은|화이트',
  '250905_Uglylovely_어글리러블리_영상컨셉04_5307003_5307004|어글리러블리|content,productvideo|0|skin|차가운|밝은|화이트',
  '250905_Uglylovely_어글리러블리_영상컨셉03_5307003_5307004|어글리러블리|content,productvideo|0|skin|차가운|밝은|화이트',
  '250905_Uglylovely_어글리러블리_영상컨셉02_5307003_5307004|어글리러블리|content,productvideo|0|skin|차가운|밝은|화이트',
  '250905_Uglylovely_어글리러블리_영상컨셉01_5307003_5307004|어글리러블리|content,productvideo|0|skin|차가운|밝은|화이트',
  // === 닥터그루트 ===
  '250904_Drgroot_닥터그루트_SRS숏폼02|닥터그루트|content|1|hair|따뜻한|밝은|화이트',
  '250904_Drgroot_닥터그루트_SRS숏폼01|닥터그루트|content|1|hair|따뜻한|밝은|화이트',
  // === 비욘드 ===
  '250903_Beyond_비욘드_핸드크림_Full|비욘드|beautyproduct,brandfilm|0|body|따뜻한|차분한|화이트+베이지',
  '250903_Beyond_비욘드_핸드크림_15s_ver02|비욘드|beautyproduct,brandfilm|0|body|따뜻한|차분한|화이트+베이지',
  // === 스택 ===
  '250819_Staaack_스택_VERT_20s_숏폼A|스택|brandfilm,content|1|fashion|||',
  '250819_Staaack_스택_VERT_20s_무빙커버B|스택|brandfilm,content|1|fashion|||',
  '250819_Staaack_스택_VERT_20s_무빙커버A|스택|brandfilm,content|1|fashion|||',
  '250819_Staaack_스택_VERT_15s_숏폼B|스택|brandfilm,content|1|fashion|||',
  // === 글로우업바이비욘드 ===
  '250818_Glowupbybeyond_글로우업바이비욘드_WIDE_25s_영양장벽라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  '250818_Glowupbybeyond_글로우업바이비욘드_VERT_15s_영양장벽라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  // === 더후 ===
  '250813_TheWhoo_더후_VERT_20s_v3|더후|beautyproduct,brandfilm|0|skin|||',
  '250813_TheWhoo_더후_VERT_15s_v2|더후|beautyproduct,brandfilm|0|skin|||',
  '250813_TheWhoo_더후_VERT_15s_v1|더후|beautyproduct,brandfilm|0|skin|||',
  '250813_TheWhoo_더후_VERT_10s_v4|더후|content,beautyproduct|0|skin|||',
  // === 어글리러블리 ===
  '250811_Uglylovely_어글리러블리_VERT_5s_v5|어글리러블리|productvideo,content|0|skin|||',
  '250811_Uglylovely_어글리러블리_VERT_5s_v4|어글리러블리|productvideo,content|0|skin|||',
  '250811_Uglylovely_어글리러블리_VERT_5s_v3|어글리러블리|productvideo,content|0|skin|||',
  '250811_Uglylovely_어글리러블리_VERT_5s_v2|어글리러블리|productvideo,content|0|skin|||',
  '250811_Uglylovely_어글리러블리_VERT_5s_v1|어글리러블리|productvideo,content|0|skin|||',
  // === 더페이스샵 ===
  '250808_TFS_더페이스샵_VERT_45s_Full|더페이스샵|productvideo|0|skin|||',
  '250808_TFS_더페이스샵_VERT_15s_오트라인|더페이스샵|productvideo|0|skin|||',
  '250808_TFS_더페이스샵_VERT_15s_알로에라인|더페이스샵|productvideo|0|skin|||',
  '250808_TFS_더페이스샵_VERT_15s_비타씨라인|더페이스샵|productvideo|0|skin|||',
  // === 닥터그루트 ===
  '250807_Drgroot_닥터그루트_VERT_5s_CR스팟젤영상|닥터그루트|content|0|hair|||',
  '250807_Drgroot_닥터그루트_VERT_10s_CR워터스케일러영상|닥터그루트|beautyproduct|0|hair|||',
  '250807_Drgroot_닥터그루트_VERT_10s_CR10초워터스케일러영상|닥터그루트|content|0|hair|||',
  // === 이자녹스 ===
  '250806_Isaknox_이자녹스_VERT_30s_이자녹스|이자녹스|productvideo|0|base|||',
  // === 빌리프 ===
  '250804_Belif_빌리프_VERT_20s_프로즌키트|빌리프|content|0|skin+sun|||',
  // === 닥터그루트 ===
  '250718_Drgroot_닥터그루트_VERT_25s_클리니컬릴리프샴푸|닥터그루트|productvideo|0|hair|||',
  '250717_Drgroot_닥터그루트_VERT_15s_클리니컬릴리프스팟젤|닥터그루트|productvideo,howto,content|1|hair|||',
  // === 스택 ===
  '250714_Staaack_스택_VERT_25s_숏폼B|스택|brandfilm,content|1|fashion|||',
  '250714_Staaack_스택_VERT_20s_무빙커버B|스택|brandfilm,content|1|fashion|||',
  '250714_Staaack_스택_VERT_15s_숏폼A|스택|brandfilm,content|1|fashion|||',
  '250714_Staaack_스택_VERT_15s_무빙커버A|스택|brandfilm,content|1|fashion|||',
  // === 더페이스샵 ===
  '250711_TFS_더페이스샵_WIDE_20s|더페이스샵|productvideo|1|sun|||',
  '250711_TFS_더페이스샵_VERT_20s|더페이스샵|productvideo|1|sun|||',
  '250710_TFS_더페이스샵_WIDE_45s_미감수클렌저|더페이스샵|productvideo|0|skin|||',
  // === 오가니시티 ===
  '250710_Organicity_오가니시티_VERT_15s|오가니시티|productvideo|0|skin|||',
  '250710_Organicity_오가니시티_VERT_15s_레티놀복합체트라넥삼산3중히알루론산동시노출영상|오가니시티|productvideo,howto|0|skin|||',
  // === 유시몰 ===
  '250708_Euthymol_유시몰_VERT_헌터콜라보_FULL|유시몰|brandfilm,beautyproduct|1|tooth+brand|||',
  '250708_Euthymol_유시몰_VERT_15s_헌터콜라보_Night|유시몰|brandfilm,beautyproduct|1|tooth+brand|||',
  '250708_Euthymol_유시몰_VERT_15s_헌터콜라보_FULL|유시몰|brandfilm,beautyproduct|1|tooth+brand|||',
  '250708_Euthymol_유시몰_VERT_15s_헌터콜라보_Day|유시몰|brandfilm,beautyproduct|1|tooth+brand|||',
  // === 비욘드글로우 ===
  '250707_Beyondglow_비욘드글로우_WIDE_15s_600X450_헤어마스크콜라겐|비욘드글로우|productvideo|1|hair|||',
  '250707_Beyondglow_비욘드글로우_WIDE_15s_464X600_헤어마스크콜라겐|비욘드글로우|productvideo|1|hair|||',
  // === 닥터그루트 ===
  '250703_Drgroot_닥터그루트_WIDE_45s_SRS라인|닥터그루트|productvideo,content|1|hair|||',
  '250703_Drgroot_닥터그루트_VERT_45s_SRS라인|닥터그루트|productvideo,content|1|hair|||',
  // === 홈스타 ===
  '250702_Homestar_홈스타_VERT_30s|홈스타|productvideo|0|lifestyle|||',
  // === 지미존스 ===
  '250630_Jimmyjohns_지미존스_WIDE_30s|지미존스|brandfilm|0|brand+food|||',
  // === 스택 ===
  '250619_Staaack_스택_VERT_20s_숏폼A|스택|brandfilm,content|1|fashion|||',
  '250619_Staaack_스택_VERT_20s_무빙커버A|스택|brandfilm,content|1|fashion|||',
  '250619_Staaack_스택_VERT_15s_숏폼B|스택|brandfilm,content|1|fashion|||',
  '250619_Staaack_스택_VERT_15s_무빙커버B|스택|brandfilm,content|1|fashion|||',
  // === 글로벌크리에이터 ===
  '250619_Globalcreator_글로벌크리에이터_VERT_30s_HDBMakingFilm|글로벌크리에이터|sketch|1|brand|||',
  '250619_Globalcreator_글로벌크리에이터_VERT_30s_DeviceMakingFilm|글로벌크리에이터|sketch|1|brand|||',
  '250619_Globalcreator_글로벌크리에이터_VERT_30s_BeautyMakingFilm|글로벌크리에이터|sketch|1|brand|||',
  // === 더후 ===
  '250618_TheWhoo_더후_VERT_25s_v4|더후|beautyproduct,howto|1|skin|||',
  '250618_TheWhoo_더후_VERT_20s_v1|더후|beautyproduct,brandfilm|0|skin|||',
  '250618_TheWhoo_더후_VERT_15s_v3|더후|beautyproduct,brandfilm|0|skin|||',
  '250618_TheWhoo_더후_VERT_15s_v2|더후|beautyproduct,brandfilm|0|skin|||',
  // === 비욘드 ===
  '250617_Beyond_비욘드_VERT_15s|비욘드|beautyproduct|0|body|||',
  // === 닥터그루트 ===
  '250613_Drgroot_닥터그루트_VERT_25s_지루성두피샴푸|닥터그루트|b&a,productvideo|0|hair|||',
  // === 지미존스 ===
  '250612_Jimmyjohns_지미존스_WIDE_5s|지미존스|brandfilm|0|brand+food|||',
  '250612_Jimmyjohns_지미존스_WIDE_30s|지미존스|brandfilm|0|brand+food|||',
  // === 브이디엘 ===
  '250604_VDL_브이디엘_VERT_15s_치크스테인블러셔|브이디엘|productvideo,howto|0|color|||',
  // === 글로우업바이비욘드 ===
  '250527_Glowupbybeyond_글로우업바이비욘드_WIDE_45s_히알루론판테놀라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  '250527_Glowupbybeyond_글로우업바이비욘드_VERT_45s_히알루론판테놀라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  // === 더후 ===
  '250523_TheWhoo_더후_VERT_15s_환유세트_v3|더후|beautyproduct,brandfilm|0|skin|||',
  '250523_TheWhoo_더후_VERT_10s_환유진액_v2|더후|beautyproduct,brandfilm|0|skin|||',
  '250523_TheWhoo_더후_VERT_10s_아이크림|더후|beautyproduct,brandfilm|0|skin|||',
  // === 덴클 ===
  '250523_Dencle_덴클_WIDE_45s_v1|덴클|beautyproduct|0|tooth+brand|||',
  // === 유시몰 ===
  '250522_Euthymol_유시몰_VERT_20s_오리지널치약_브라이트닝치약_화이트닝치약_v1|유시몰|productvideo,content|1|tooth|||',
  '250522_Euthymol_유시몰_VERT_15s_오리지널치약_브라이트닝치약_화이트닝치약_v2|유시몰|productvideo|1|tooth|||',
  // === 스택 ===
  '250520_Staaack_스택_VERT_30s_숏폼B|스택|brandfilm,content|1|fashion|||',
  '250520_Staaack_스택_VERT_15s_숏폼A|스택|brandfilm,content|1|fashion|||',
  '250520_Staaack_스택_VERT_15s_무빙커버B|스택|brandfilm,content|1|fashion|||',
  '250520_Staaack_스택_VERT_15s_무빙커버A|스택|brandfilm,content|1|fashion|||',
  // === 글로벌크리에이터 ===
  '250516_Globalcreator_글로벌크리에이터_VERT_30s_HDB|글로벌크리에이터|sketch|1|brand|||',
  '250516_Globalcreator_글로벌크리에이터_VERT_30s_Beauty|글로벌크리에이터|sketch|1|brand|||',
  // === 닥터그루트 ===
  '250512_Drgroot_닥터그루트_VERT_25s_마이크로엑소좀|닥터그루트|productvideo|0|hair|||',
  // === 오가니스트 ===
  '250509_Organist_오가니스트_VERT_20s_바디크림|오가니스트|beautyproduct|1|body|||',
  // === 브이디엘 ===
  '250508_VDL_브이디엘_WIDE_15s_기획세트|브이디엘|productvideo|0|base+did+color|||',
  '250508_VDL_브이디엘_VERT_30s_기획세트|브이디엘|productvideo|0|base+did+color|||',
  // === 글로벌크리에이터 ===
  '250422_Globalcreator_글로벌크리에이터_VERT_30s_HDB_makingfilm|글로벌크리에이터|sketch|1|brand|||',
  '250422_Globalcreator_글로벌크리에이터_VERT_30s_Beauty_makingfilm|글로벌크리에이터|sketch|1|brand|||',
  // === 로레알 ===
  '250421_Loreal_로레알_WIDE_30s_ProductVideo|로레알|beautyproduct,brandfilm|0|skin+brand|||',
  '250421_Loreal_로레알_WIDE_30s_ASMRVideo|로레알|productvideo,content|0|skin|||',
  // === 닥터그루트 ===
  '250418_Drgroot_닥터그루트_VERT_20s_지루성두피샴푸|닥터그루트|beautyproduct|0|hair|||',
  // === 스택 ===
  '250415_Staaack_스택_VERT_20s_숏폼B|스택|brandfilm,content|1|fashion|||',
  '250415_Staaack_스택_VERT_15s_숏폼A|스택|brandfilm,content|1|fashion|||',
  '250415_Staaack_스택_VERT_15s_무빙커버A|스택|brandfilm,content|1|fashion|||',
  '250415_Staaack_스택_VERT_10s_무빙커버B|스택|brandfilm,content|1|fashion|||',
  // === 더후 ===
  '250408_TheWhoo_더후_VERT_15s_크림_v2|더후|beautyproduct,brandfilm|0|skin|||',
  '250408_TheWhoo_더후_VERT_15s_세럼_크림_아이크림|더후|beautyproduct,brandfilm|0|skin|||',
  '250408_TheWhoo_더후_VERT_10s_아이크림_v1|더후|beautyproduct,brandfilm|0|skin|||',
  // === 프릭스 ===
  '250407_Freax_프릭스_WIDE_30s_팝업_1920p_vol3|프릭스|content|0|brand|||',
  // === 비욘드글로우 ===
  '250407_Beyondglow_비욘드글로우_VERT_선밀크시카|비욘드글로우|productvideo|1|sun|||',
  // === 고바이글리머 ===
  '250404_Gobyglimmer_고바이글리머_VERT_15s|고바이글리머|beautyproduct,productvideo,brandfilm|1|lip|||',
  // === 비욘드글로우 ===
  '250404_Beyondglow_비욘드글로우_VERT_20s_립세린|비욘드글로우|beautyproduct|1|lip|||',
  // === 더페이스샵 ===
  '250402_TFS_더페이스샵_VERT_25s_알로에히알루론산수분진정세럼크림|더페이스샵|beautyproduct|0|skin|||',
  '250402_TFS_더페이스샵_VERT_10s_플랫라이너|더페이스샵|productvideo|0|color|||',
  // === 스택 ===
  '250329_Staaack_스택_WIDE_45s_오프라인스케치행사|스택|sketch|0|fashion|||',
  // === 닥터그루트 ===
  '250321_Drgroot_닥터그루트_VERT_20s_마이크로바이옴바이옴엑소좀샴푸|닥터그루트|beautyproduct|0|hair|||',
  // === 브이디엘 ===
  '250317_VDL_브이디엘_VERT_10s_커버스테인쿠션|브이디엘|beautyproduct|0|base|||',
  // === 글로우업바이비욘드 ===
  '250314_GlowupbyBeyond_글로우업바이비욘드_WIDE_45s_바쿠치올라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  '250314_GlowupbyBeyond_글로우업바이비욘드_WIDE_25s_바쿠치올라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  '250314_GlowupbyBeyond_글로우업바이비욘드_VERT_25s_바쿠치올라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  '250314_GlowupbyBeyond_글로우업바이비욘드_15s_바쿠치올라인|글로우업바이비욘드|productvideo|0|skin+did|||',
  // === 더페이스샵 ===
  '250312_TFS_더페이스샵_VERT_15s_소울퍼퓸릴리드림|더페이스샵|beautyproduct|0|brand+lifestyle|||',
  // === 유시몰 ===
  '250307_Euthymol_유시몰_VERT_20s_오리지널치약|유시몰|productvideo|1|tooth|||',
  // === 더페이스샵 ===
  '250305_TFS_더페이스샵_VERT_30s_비타토닝콜라겐마스크_v1|더페이스샵|productvideo,b&a|1|skin|||',
  '250305_TFS_더페이스샵_VERT_15s_비타토닝콜라겐마스크_v2|더페이스샵|productvideo,howto|1|skin|||',
  // === 코드글로컬러 ===
  '250231_Codeglokolor_코드글로컬러_VERT_45s_리퀴드블러셔_컨트롤밤_컨트롤베이스|코드글로컬러|productvideo|1|base+lip+did|||',
  // === 이루다 ===
  '250221_Iruda_이루다_VERT_20s_식기세척기|이루다|productvideo|1|lifestyle|||',
  '250221_Iruda_이루다_VERT_15s_로봇청소기|이루다|productvideo|1|lifestyle|||',
  '250221_Iruda_이루다_VERT_15s_냉장고|이루다|productvideo|1|lifestyle|||',
  // === 브이디엘 ===
  '250212_VDL_브이디엘_VERT_20s_톤스테인컬러코렉션쿠션|브이디엘|productvideo|0|base|||',
  // === 닥터그루트 ===
  '250212_Drgroot_닥터그루트_VERT_15s_아쿠아헤어라인부스트샷|닥터그루트|beautyproduct|0|hair|||',
  // === 유시몰 ===
  '250207_Euthymol_유시몰_VERT_20s_유씨몰_오리지널치약_v1|유시몰|beautyproduct,content|0|tooth|||',
  '250207_Euthymol_유시몰_VERT_10s_유씨몰_오리지널치약_v2|유시몰|beautyproduct,content|0|tooth|||',
  // === 비욘드글로우 ===
  '250206_Beyondglow_비욘드글로우_VERT_25s_멜팅밤클렌저_포밍클랜저_v2|비욘드글로우|productvideo,howto|1|skin|||',
  '250206_Beyondglow_비욘드글로우_VERT_15s_멜팅밤클렌저_포밍클랜저_v1|비욘드글로우|productvideo,howto|1|skin|||',
  // === 코드글로컬러 ===
  '250204_Codeglokolor_코드글로컬러_VERT_20s_픽스온스틱_픽스온프라이머|코드글로컬러|productvideo|0|base|||',
  '250204_Codeglokolor_코드글로컬러_VERT_20s_소프트블러리퀴드블러셔|코드글로컬러|productvideo,howto|0|color|||',
  // === 히말라야핑크솔트 ===
  '250203_Himalayapinksalt_히말라야핑크솔트_WIDE_20s|히말라야핑크솔트|productvideo,beautyproduct|0|hair|||',
  // === 닥터그루트 ===
  '250116_Drgroot_닥터그루트_VERT_20s_캡슐트리트먼트|닥터그루트|beautyproduct|0|hair|||',
  '250116_Drgroot_닥터그루트_VERT_20s_두피영양토닉|닥터그루트|beautyproduct|0|hair|||',
  // === 브이디엘 ===
  '250114_VDL_브이디엘_VERT_25s_에센셜아이섀도우듀오|브이디엘|productvideo,howto|0|color|||',
  // === 코드글로컬러 ===
  '250113_Codeglokolor_코드글로컬러_WIDE_30s_블러셔앤립_제품영상|코드글로컬러|beautyproduct,productvideo|1|color+lip|||',
  // === 비욘드글로우 ===
  '250107_Beyondglow_비욘드글로우_WIDE_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  '250107_Beyondglow_비욘드글로우_VERT_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  // === 더페이스샵 ===
  '250106_TFS_더페이스샵_WIDE_45s_제품5라인_다이소DiD영상|더페이스샵|productvideo|1|skin+body+hair+did|||',
  // === 비욘드 ===
  '250103_Beyond_비욘드_WIDE_30s_착색브라이트닝바디로션_제품영상|비욘드|productvideo|1|body|||',
  // === 닥터그루트 ===
  '241227_Drgroot_닥터그루트_WIDE_2m_브랜드필름|닥터그루트|brandfilm|0|hair+brand|||',
  // === 코드글로컬러 ===
  '241223_Codeglokolor_코드글로컬러_VERT_20s_핑크빔팩트_제품영상|코드글로컬러|productvideo,b&a|0|base|||',
  '241223_Codeglokolor_코드글로컬러_VERT_20s_블러셔_제품영상|코드글로컬러|productvideo,howto|0|color|||',
  // === 닥터그루트 ===
  '241220_Drgroot_닥터그루트_VERT_25s_까멜리아라인_제품영상|닥터그루트|beautyproduct,brandfilm|0|hair|||',
  // === 닥터오라클 ===
  '241213_DrOracle_닥터오라클_WIDE_30s|닥터오라클|brandfilm,beautyproduct|0|brand+skin|||',
  // === 글린트 ===
  '241206_Glint_글린트_VERT_30s_하이라이터_제품영상|글린트|content,howto,productvideo|0|color|||',
  // === 고바이글리머 ===
  '241127_GObyglimmer_고바이글리머_WIDE_25s_립치크라인_제품영상05|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_WIDE_20s_립치크라인_제품영상04|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_WIDE_20s_립치크라인_제품영상03|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_WIDE_20s_립치크라인_제품영상01|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_WIDE_15s_립치크라인_제품영상02|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_VERT_25s_립치크라인_제품영상05|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_VERT_20s_립치크라인_제품영상04|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_VERT_20s_립치크라인_제품영상03|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_VERT_20s_립치크라인_제품영상01|고바이글리머|productvideo|1|lip|||',
  '241127_GObyglimmer_고바이글리머_VERT_15s_립치크라인_제품영상02|고바이글리머|productvideo|1|lip|||',
  // === 씨앤피 ===
  '241121_CNP_씨앤피_WIDE_20s_프로폴리스립세린_제품영상|씨앤피|productvideo|1|lip|||',
  '241121_CNP_씨앤피_VERT_20s_프로폴리스립세린_제품영상|씨앤피|productvideo|1|lip|||',
  // === 세콩데 ===
  '241118_Secondaire_세콩데_WIDE_16m|세콩데|content|1|food|||',
  '241118_Secondaire_세콩데_SHORT_30s_v5|세콩데|content,interview|1|food|||',
  '241118_Secondaire_세콩데_SHORT_30s_v4|세콩데|content,interview|1|food|||',
  '241118_Secondaire_세콩데_SHORT_30s_v3|세콩데|content,interview|1|food|||',
  '241118_Secondaire_세콩데_SHORT_30s_v1|세콩데|content,interview|1|food|||',
  '241118_Secondaire_세콩데_SHORT_25s_v2|세콩데|content,interview|1|food|||',
  '241117_Secondaire_세콩데_WIDE_45s_제품영상_Ver2|세콩데|productvideo,brandfilm|0|food+brand|||',
  // === 닥터그루트 ===
  '241115_Drgroot_닥터그루트_VERT_20s_까멜리아라인_제품영상|닥터그루트|beautyproduct,brandfilm|0|hair|||',
  // === 코드글로컬러 ===
  '241112_Codeglokolor_코드글로컬러_WIDE_45s_컨트롤베이스_제품영상|코드글로컬러|beautyproduct,productvideo|0|base|||',
  // === 비클리닉스 ===
  '241109_Bclinicx_비클리닉스_WIDE_20s_브라이트닝턴온바디로션_제품영상|비클리닉스|productvideo|1|body|||',
  '241109_Bclinicx_비클리닉스_VERT_20s_브라이트닝턴온바디로션_제품영상|비클리닉스|productvideo|1|body|||',
  // === 닥터그루트 ===
  '241024_Drgroot_닥터그루트_VERT_45s_까멜리아에디션_숏폼컨텐츠|닥터그루트|content|1|hair|||',
  // === 유시몰 ===
  '241021_Euthymol_유시몰_WIDE_15s_퍼플코렉터라인_제품영상|유시몰|beautyproduct|0|tooth|||',
  // === 닥터그루트 ===
  '241017_Drgroot_닥터그루트_VERT_25s_아쿠아토탈케어헤어토닉_제품영상|닥터그루트|productvideo,b&a|0|hair|||',
  // === 히말라야핑크솔트 ===
  '241014_Himalayapinksalt_히말라야핑크솔트_WIDE_25s_네츄럴화이트닝치약_제품영상|히말라야핑크솔트|beautyproduct,productvideo|0|tooth|||',
  // === 제인패커 ===
  '241011_Janepacker_제인패커_SQUARE_10s_유로피언라일락_제품GIF영상|제인패커|beautyproduct|0|body|||',
  '241011_Janepacker_제인패커_SQUARE_10s_오션송모브_제품GIF영상|제인패커|beautyproduct|0|body|||',
  '241011_Janepacker_제인패커_SQUARE_10s_센슈얼자스민_제품GIF영상|제인패커|beautyproduct|0|body|||',
  // === 코드글로컬러 ===
  '241010_Codeglokolor_코드글로컬러_VERT_30s_프라이머인팩트_제품영상|코드글로컬러|beautyproduct|0|base|||',
  // === 리튠 ===
  '241007_Retune_리튠_SQUARE_5s_홍삼젤리_GIF영상|리튠|content|0|food+did|||',
  '241007_Retune_리튠_SQUARE_5s_콜라겐탱탱젤리_GIF영상|리튠|content|0|food+did|||',
  '241007_Retune_리튠_SQUARE_5s_비타민활력젤리_GIF영상|리튠|content|0|food+did|||',
  '241007_Retune_리튠_SQUARE_5s_다이어트젤리_GIF영상|리튠|content|0|food+did|||',
  // === 롯데 ===
  '241001_Lotte_롯데_WIDE_45s_추석마중_Full_v3|롯데|brandfilm|0|brand+food|||',
  '241001_Lotte_롯데_WIDE_30s_추석마중_Short_v2|롯데|brandfilm|0|brand+food|||',
  '241001_Lotte_롯데_WIDE_25s_패키지배출방법HOWTO_v6|롯데|howto|0|product|||',
  '241001_Lotte_롯데_VERT_콩두점점인터뷰_1m|롯데|interview|1|interview|||',
  '241001_Lotte_롯데_VERT_추석마중_FULL|롯데|brandfilm|0|brand+food|||',
  '241001_Lotte_롯데_VERT_초루인터뷰_1m|롯데|interview|1|interview|||',
  '241001_Lotte_롯데_VERT_윤여동인터뷰_1m|롯데|interview|1|interview|||',
  '241001_Lotte_롯데_VERT_양태오인터뷰_1m|롯데|interview|1|interview|||',
  '241001_Lotte_롯데_VERT_누누인터뷰_1m|롯데|interview|1|interview|||',
  '241001_Lotte_롯데_VERT_김선우인터뷰_1m|롯데|interview|1|interview|||',
  // === 코드글로컬러 ===
  '240910_Codeglokolor_코드글로컬러_VERT_30s_픽스온프라이머_제품영상|코드글로컬러|beautyproduct|0|base|||',
  // === 낫포유 ===
  '240909_Not4u_낫포유_VERT_25s_BODY_v1|낫포유|beautyproduct,brandfilm|0|skin+brand|||',
  // === BBB테라피샴푸 ===
  '240909_BBBTherapyShampoo_BBB테라피샴푸_WIDE_20s|BBB테라피샴푸|productvideo|0|hair|||',
  '240909_BBBTherapyShampoo_BBB테라피샴푸_VERT_20s|BBB테라피샴푸|productvideo|0|hair|||',
  // === 더페이스샵 ===
  '240904_TFS_더페이스샵_VERT_10s_다크컨실러_제품영상|더페이스샵|howto,productvideo|0|base|||',
  // === 닥터그루트 ===
  '240902_Drgroot_닥터그루트_VERT_20s_샴푸3종|닥터그루트|brandfilm,productvideo|0|hair|||',
  // === 브이디엘 ===
  '240827_VDL_브이디엘_VERT_30s_블러셔팔레트_제품영상01|브이디엘|beautyproduct|0|color|||',
  '240827_VDL_브이디엘_VERT_20s_블러셔팔레트VOL02_v1|브이디엘|beautyproduct|0|color|||',
  // === 에버티스 ===
  '240827_Evertis_에버티스_WIDE_45s_Reedit_v2|에버티스|brandfilm|0|brand|||',
  // === 코드글로컬러 ===
  '240821_Codeglokolor_코드글로컬러_VERT_30s_픽스온멜팅스틱_제품영상|코드글로컬러|productvideo,content|0|lip|||',
  // === 히말라야핑크솔트 ===
  '240819_Himalayapinksalt_히말라야핑크솔트_WIDE_30s_스칼프트리트먼트_제품영상|히말라야핑크솔트|beautyproduct,productvideo|1|hair|||',
  '240814_Himalayapinksalt_히말라야핑크솔트_VERT_25s_퍼플화이트닝컨텐츠|히말라야핑크솔트|content,productvideo|1|tooth|||',
  // === 강남글로우 ===
  '240814_Gangnamglow_강남글로우_VERT_20s_v2|강남글로우|beautyproduct|1|skin|||',
  // === 코튼풋 ===
  '240812_Cottonfoot_코튼풋_WIDE_30s_강아지발씻자_제품영상|코튼풋|productvideo,content|1|skin|||',
  // === 닥터그루트 ===
  '240811_Drgroot_닥터그루트_VERT_20s_헤어토닉|닥터그루트|productvideo,content|1|hair|||',
  // === 어뉴 ===
  '240730_Anew_어뉴_VERT_20s_아이리프트콜라겐부스트크림_제품영상|어뉴|productvideo,howto|1|skin|||',
  '240730_Anew_어뉴_VERT_15s_솔라페이스크림_제품영상|어뉴|beautyproduct|1|sun|||',
  '240730_Anew_어뉴_VERT_15s_솔라바디크림_제품영상|어뉴|beautyproduct|1|sun|||',
  // === 비욘드글로우 ===
  '240719_Beyondglow_비욘드글로우_WIDE_45s_나이아신아마이드제품5종_제품영상|비욘드글로우|productvideo|1|skin|||',
  '240719_Beyondglow_비욘드글로우_WIDE_45s_나이아신아마이드제품3종_제품영상|비욘드글로우|productvideo|1|skin|||',
  // === 케어존 ===
  '240718_Carezone_케어존_WIDE_45s_모공솔루션라인_DiD영상|케어존|productvideo|0|skin+did|||',
  // === 강남글로우 ===
  '240717_Gangnamglow_강남글로우_WIDE_25s_스팟브라이트닝세럼_제품영상|강남글로우|beautyproduct|1|skin|||',
  // === 코드글로컬러 ===
  '240711_Codeglokolor_코드글로컬러_VERT_25s_미니니|코드글로컬러|content|0|base|||',
  // === WIDE ===
  '240708_대한고려홍삼_WIDE_30s_참바른홍삼|WIDE|beautyproduct,productvideo|0|food+brand|||',
  // === 피지오겔 ===
  '240706_Physiogel_피지오겔_VERT_25s|피지오겔|productvideo,content|1|skin|||',
  // === 씨앤피 ===
  '240706_CNP_씨앤피_VERT_20s_프로폴리스앰플미스트|씨앤피|productvideo|1|skin|||',
  // === 비욘드글로우 ===
  '240703_Beyondglow_비욘드글로우_WIDE_30s_나이아신아마이드크림_제품영상|비욘드글로우|productvideo|1|skin|||',
  '240703_Beyondglow_비욘드글로우_VERT_30s_나이아신아마이드크림_제품영상|비욘드글로우|productvideo|1|skin|||',
  // === 프레시안 ===
  '240702_Freshian_프레시안_VERT_15s_립젤리_제품영상01|프레시안|productvideo,content|1|lip|||',
  '240702_Freshian_프레시안_VERT_10s_립젤리_제품영상02|프레시안|productvideo,content|1|lip|||',
  // === 삼립 ===
  '240624_SPC_삼립_VERT_15s_미각제빵소|삼립|productvideo|0|food|||',
  // === 글린트 ===
  '240617_Glint_글린트_VERT_30s_글린트하이라이터_뷰티영상|글린트|beautyproduct|1|color|||',
  // === 씨앤피 ===
  '240617_CNP_씨앤피_VERT_15s_프로폴리스앰플|씨앤피|beautyproduct|1|skin|||',
  // === 빌리프 ===
  '240617_Belif_빌리프_VERT_15s_SKIN_아쿠아밤크림|빌리프|beautyproduct|1|skin|||',
  // === 닥터그루트 ===
  '240605_Drgroot_닥터그루트_VERT_30s_두피가려움샴푸|닥터그루트|productvideo,content|0|hair|||',
  // === 강남글로우 ===
  '240604_Gangnamglow_강남글로우_WIDE_30s_비타민C세럼_제품영상|강남글로우|beautyproduct|1|skin|||',
  // === 코튼풋 ===
  '240603_Cottonfoot_코튼풋_WIDE_30s_발을씻자3종_제품영상|코튼풋|productvideo,content|0|skin|||',
  // === 오가니스트 ===
  '240530_Organist_오가니스트_WIDE_30s_헤어오일_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_Organist_오가니스트_WIDE_30s_헤어라인전제품_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_Organist_오가니스트_VERT_30s_헤어오일_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_Organist_오가니스트_VERT_30s_헤어라인전제품_제품영상|오가니스트|productvideo,howto|1|hair|||',
  // === 더페이스샵 ===
  '240527_TFS_더페이스샵_VERT_25s_히알루론산크림_V2|더페이스샵|productvideo|1|skin|||',
  '240527_TFS_더페이스샵_VERT_25s_히알루론산크림_V1|더페이스샵|productvideo|1|skin|||',
  '240527_TFS_더페이스샵_VERT_25s_비건뮤신펩타이드크림_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_TFS_더페이스샵_VERT_20s_올티밋멀티비타10프로세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_TFS_더페이스샵_VERT_20s_비건뮤신펩타이드8세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  // === 히말라야핑크솔트 ===
  '240522_Himalayapinksalt_히말라야핑크솔트_WIDE_25s_퍼플화이트닝치약|히말라야핑크솔트|productvideo|1|tooth|||',
  // === 팁시 ===
  '240520_Tpsy_팁시_VERT_25s_팁시세트_숏폼컨텐츠|팁시|productvideo,content|0|lip|||',
  // === 엘라스틴 ===
  '240517_Elastine_엘라스틴_WIDE_25s_웨이브샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  '240517_Elastine_엘라스틴_WIDE_25s_스트레이트샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  // === WIDE ===
  '240515_청사단_WIDE_30s_v5|WIDE|content|0|social|||',
  // === 아비브 ===
  '240515_ABIB_아비브_WIDE_45s|아비브|beautyproduct,brandfilm|1|skin+brand|||',
  // === 더페이스샵 ===
  '240513_TFS_더페이스샵_VERT_20s_페이셜클렌징폼_제품영상|더페이스샵|beautyproduct|1|skin|||',
  // === 글린트 ===
  '240513_Glint_글린트_VERT_20s_하이라이터_제품영상|글린트|beautyproduct|1|color|||',
  // === 씨앤피 ===
  '240513_CNP_씨앤피_VERT_20s_썬크림_애프터레이쿨링썬크림|씨앤피|beautyproduct|1|sun|||',
  // === 비디비치 ===
  '240507_Vidivici_비디비치_VERT_25s_COLOR_v1|비디비치|productvideo|0|skin|||',
  '240506_Vidivici_비디비치_VERT_25s_SKIN_v1|비디비치|productvideo|0|skin|||',
  '240506_Vidivici_비디비치_VERT_20s_COLOR_v2|비디비치|beautyproduct,howto|1|color+lip|||',
  '240506_Vidivici_비디비치_VERT_20s_COLOR_v1|비디비치|beautyproduct|1|lip+color|||',
  // === 뉴발란스키즈 ===
  '240506_NewbalanceKids_뉴발란스키즈_WIDE_5s|뉴발란스키즈|productvideo,content|0|lifestyle|||',
  '240506_NewbalanceKids_뉴발란스키즈_WIDE_10s_v2|뉴발란스키즈|productvideo,content|0|lifestyle|||',
  '240506_NewbalanceKids_뉴발란스키즈_WIDE_10s_v1|뉴발란스키즈|productvideo,content|0|lifestyle|||',
  // === 코카콜라 ===
  '240502_Cocacola_코카콜라_WIDE_5s_제로슈거체리_제품영상|코카콜라|productvideo|0|food|||',
  '240502_Cocacola_코카콜라_WIDE_15s_제로슈거체리_제품영상|코카콜라|productvideo|0|food|||',
  // === 강남글로우 ===
  '240429_Gangnamglow_강남글로우_WIDE_1m15s|강남글로우|interview,productvideo|1|skin+interview|||',
  '240429_Gangnamglow_강남글로우_WIDE_1m|강남글로우|interview,productvideo|1|skin+interview|||',
  // === 이들케이 ===
  '240429_EdelK_이들케이_VERT_30s_E3|이들케이|productvideo|0|lifestyle|||',
  '240429_EdelK_이들케이_VERT_30s_E1|이들케이|productvideo|0|lifestyle|||',
  // === 비욘드글로우 ===
  '240429_Beyondglow_비욘드글로우_WIDE_45s|비욘드글로우|interview,productvideo|1|skin+interview|||',
  // === 로레알 ===
  '240423_Loreal_로레알_WIDE_30s_Camomile_v1|로레알|productvideo,brandfilm|0|hair|||',
  '240423_Loreal_로레알_WIDE_30s_Avocado_v1|로레알|productvideo,brandfilm|0|hair|||',
  // === 코드글로컬러 ===
  '240423_Codeglokolor_코드글로컬러_VERT_20s_픽스온워터밤틴트|코드글로컬러|productvideo|0|lip|||',
  '240423_Codeglokolor_코드글로컬러_VERT_20s_프라이머파운데이션_제품영상|코드글로컬러|beautyproduct,productvideo|0|base|||',
  // === 더페이스샵 ===
  '240419_TFS_더페이스샵_VERT_20s_브라이트닝클렌징티슈_제품영상|더페이스샵|productvideo|1|skin|||',
  '240419_TFS_더페이스샵_VERT_15s_브라이트닝클렌징폼_제품영상|더페이스샵|productvideo|1|skin|||',
  '240419_TFS_더페이스샵_VERT_15s_라이트오일_제품영상|더페이스샵|beautyproduct,productvideo|1|skin|||',
  // === 어글리러블리 ===
  '240415_Uglylovely_어글리러블리_VERT_25s_마스크스크럽3종_숏폼컨텐츠|어글리러블리|productvideo,content|0|skin|||',
  // === 팁시 ===
  '240415_Tpsy_팁시_VERT_1m_팁시세트_숏폼컨텐츠|팁시|productvideo,content|0|lip|||',
  // === 닥터벨머 ===
  '240415_Drvelmert_닥터벨머_VERT_20s_비건톤업쿠션_숏폼컨텐츠|닥터벨머|productvideo|0|base|||',
  // === 입큰 ===
  '240413_IPKN_입큰_VERT_15s_COLOR_v1|입큰|beautyproduct,productvideo|1|color|||',
  // === 에이뮤 ===
  '240412_Aimu_에이뮤_VERT_30s_LIFESTYLE_정수기_v2|에이뮤|productvideo|0|lifestyle|||',
  '240412_Aimu_에이뮤_VERT_30s_LIFESTYLE_정수기_v1|에이뮤||0|lifestyle|||',
  '240412_Aimu_에이뮤_VERT_30s_LIFESTYLE_공기청정기_v3|에이뮤|productvideo|0|lifestyle|||',
  // === 롯데 ===
  '240407_Lotte_롯데_WIDE_2m_DiningAvenue_v9|롯데|brandfilm|1|food+brand|||',
  '240407_Lotte_롯데_WIDE_20s_DiningAvenue_Teaser|롯데|brandfilm,teaser|1|food+brand|||',
  '240407_Lotte_롯데_WIDE_1m_DiningAvenue_OLED_v8|롯데|productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_2m_DiningAvenue_FULL_DID|롯데|content,productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_25s_DiningAvenue_05우리집만두_DID|롯데|content,productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_25s_DiningAvenue_04스마일_DID|롯데|content,productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_25s_DiningAvenue_03정희_DID|롯데|content,productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_25s_DiningAvenue_02만다복_DID|롯데|content,productvideo|0|food+did|||',
  '240407_Lotte_롯데_VERT_25s_DiningAvenue_01분지로_DID|롯데|content,productvideo|0|food+did|||',
  // === 디에이브 ===
  '240405_TheAVVE_디에이브_WIDE_30s|디에이브|beautyproduct,howto|1|skin|||',
  // === 코카콜라 ===
  '240401_Cocacola_코카콜라_WIDE_15s_제로슈거제로카페인_제품영상|코카콜라|productvideo|0|food|||',
  // === 더샘 ===
  '240325_Thesaem_더샘_WIDE_30s_베리씨패드|더샘|productvideo|0|skin|||',
  '240325_Thesaem_더샘_WIDE_30s_베리씨앰플|더샘|productvideo|0|skin|||',
  '240325_Thesaem_더샘_WIDE_30s_UV퍼펙션에센스|더샘|productvideo|0|sun|||',
  '240325_Thesaem_더샘_WIDE_30s_UV퍼펙션베리프|더샘|productvideo|0|sun|||',
  // === 입큰 ===
  '240316_IPKN_입큰_VERT_15s_LIP_v1|입큰|beautyproduct,productvideo|1|lip|||',
  '240316_IPKN_입큰_VERT_15s_COLOR_v1|입큰|beautyproduct,productvideo|1|color|||',
  // === 에이딕트 ===
  '240309_Addict_에이딕트_WIDE_25s|에이딕트|beautyproduct,brandfilm|0|lifestyle+brand|||',
  // === 낫포유 ===
  '240308_Not4u_낫포유_WIDE_45s_Film|낫포유|beautyproduct,brandfilm|1|skin+brand|||',
  // === 맨베티 ===
  '240308_Menveit_맨베티_WIDE_1m|맨베티|beautyproduct,brandfilm|1|skin+brand|||',
  // === 더샘 ===
  '240306_Thesaem_더샘_WIDE_30s_콜라겐|더샘|productvideo|0|skin|||',
  '240306_Thesaem_더샘_WIDE_30s_Wood_수정본|더샘|beautyproduct|0|lifestyle|||',
  '240306_Thesaem_더샘_WIDE_30s_Flower_수정본|더샘|beautyproduct|0|lifestyle|||',
  // === 로로벨 ===
  '240305_Rorobell_로로벨_SQUARE_30s_nologo|로로벨|beautyproduct,productvideo,brandfilm|1|brand|||',
  // === 카마루 ===
  '240304_KAMARU_카마루_WIDE_45s|카마루|productvideo|0|product|||',
  '240304_KAMARU_카마루_WIDE_30s|카마루|productvideo|0|product|||',
  '240304_KAMARU_카마루_WIDE_25s|카마루|productvideo|0|product|||',
  // === 베러데이 ===
  '240303_Betterday_베러데이_WIDE_15s|베러데이|productvideo,lifestyle,brandfilm|1|food|||',
  // === 썸바이미 ===
  '240302_SOMEBYME_썸바이미_SQUARE_30s|썸바이미|productvideo,content|1|skin|||',
  '240302_SOMEBYME_썸바이미_SQUARE_25s|썸바이미|content|0|skin|||',
  '240302_SOMEBYME_썸바이미_SQUARE_20s|썸바이미|content|0|skin|||',
  // === 아로셀 ===
  '240215_Arocell_아로셀_WIDE_30s_브랜딩필름|아로셀|beautyproduct,productvideo,brandfilm|1|skin+brand|||',
  '240214_Arocell_아로셀_WIDE_45s_슈퍼샷울트라앰플_하우투|아로셀|beautyproduct,howto|1|skin|||',
  '240214_Arocell_아로셀_WIDE_30s_슈퍼샷콜트라앰플_하우투|아로셀|beautyproduct,productvideo,howto|1|skin|||',
  '240213_Arocell_아로셀_WIDE_45s_밀키드롭앰플_하우투|아로셀|beautyproduct,howto|0|skin|||',
  '240213_Arocell_아로셀_WIDE_30s_밀키드롭앰플_하우투|아로셀|beautyproduct,productvideo,howto|1|skin|||',
  '240212_Arocell_아로셀_WIDE_45s_보툴케어세럼_하우투|아로셀|beautyproduct,howto|1|skin|||',
  '240212_Arocell_아로셀_WIDE_30s_보툴케어세럼_하우투|아로셀|beautyproduct,productvideo,howto|1|skin|||',
  '240211_Arocell_아로셀_WIDE_2m_슈퍼마스크_하우투|아로셀|beautyproduct,howto|1|skin|||',
  '240211_Arocell_아로셀_WIDE_1m_슈퍼마스크_하우투|아로셀|beautyproduct,productvideo,howto|1|skin|||',
  // === 파뮤 ===
  '240210_Femmue_파뮤_WIDE_45s|파뮤|beautyproduct,productvideo,brandfilm|1|skin|||',
  '240210_Femmue_파뮤_WIDE_30s|파뮤|beautyproduct,productvideo,brandfilm|1|skin|||',
  '240209_Femmue_파뮤_WIDE_30s|파뮤|beautyproduct,productvideo,brandfilm|1|skin|||',
  '240208_Femmue_파뮤_WIDE_30s_Cream_final|파뮤|beautyproduct,productvideo,brandfilm|1|skin|||',
  '240207_Femmue_파뮤_WIDE_45s|파뮤|beautyproduct,productvideo,brandfilm|1|skin|||',
  // === 페이스리퍼블릭 ===
  '240206_Facerepublic_페이스리퍼블릭_WIDE_30s_Blooming|페이스리퍼블릭|beautyproduct|1|skin|||',
  '240206_Facerepublic_페이스리퍼블릭_WIDE_25s_Hydro_Vol2|페이스리퍼블릭|beautyproduct|1|skin|||',
  '240206_Facerepublic_페이스리퍼블릭_WIDE_25s_Hydro_Vol1|페이스리퍼블릭|beautyproduct|1|skin|||',
  // === 입큰 ===
  '240205_IPKN_입큰_WIDE_25s|입큰|beautyproduct,productvideo|1|lip+color|||',
  // === 앤서나인틴 ===
  '240204_AnswerNINETEEN_앤서나인틴_WIDE_30s|앤서나인틴|productvideo|0|skin|||',
  // === 대한축구협회 ===
  '240203_KFA_대한축구협회_WIDE_2m_인포그래픽|대한축구협회|content|0|social|||',
  // === 썸바이미 ===
  '230304_Somebyme_썸바이미_VERT_30s_SUN_v1|썸바이미|content|1|sun+lip|||',
  '230304_Somebyme_썸바이미_VERT_15s_SKIN_v1|썸바이미|content|0|skin|||',
  '230302_Somebyme_썸바이미_VERT_30s_SUN_v3|썸바이미|productvideo|0|sun|||',
  '230302_Somebyme_썸바이미_VERT_15s_SUN_v2|썸바이미|content,teaser,productvideo|0|sun+lip|||',
  '230302_Somebyme_썸바이미_VERT_10s_SUN_v1|썸바이미|content,productvideo|0|sun+lip|||',
];

// 파싱 함수
function parseRawData(raw: string): PortfolioItem {
  const [filename, brand, cats, model, prodType, toneTemp, toneFeel, colorsStr] = raw.split('|');

  const fnLower = filename.toLowerCase();
  const isWide = fnLower.includes('wide') || fnLower.includes('16x9') || fnLower.includes('1920x1080');
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
    thumbnail: THUMB_BASE + encodeURIComponent(filename) + '.jpg',
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
    // 포맷/해상도/코덱 관련 키워드를 모두 정규화 (대소문자 무시)
    const baseKey = item.filename.toLowerCase()
      .replace(/_wide/g, '_FMT')
      .replace(/_vert/g, '_FMT')
      .replace(/_16x9/g, '')
      .replace(/_9x16/g, '')
      .replace(/_1920x1080/g, '')
      .replace(/_1080x1920/g, '')
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
      const fnLow = item.filename.toLowerCase();
      const exLow = existing.filename.toLowerCase();
      const isWide = fnLow.includes('_wide') || fnLow.includes('_16x9') || fnLow.includes('_1920x1080');
      const existingIsWide = exLow.includes('_wide') || exLow.includes('_16x9') || exLow.includes('_1920x1080');
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
