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
  // === AROCELL (아로셀) ===
  '251224_arocell_아로셀_콜라셀힐러메카니즘_40s_h264_fhd_9x16|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_arocell_아로셀_콜라셀힐러메카니즘_40s_h264_fhd_16x9|아로셀|beautyproduct,brandfilm|1|skin|따뜻한|밝은|화이트+핑크',
  '251224_arocell_아로셀_마시는콜라겐_20s_h264_fhd_9x16|아로셀|beautyproduct,productvideo,brandfilm|1|skin+food|따뜻한|밝은|화이트+핑크',
  // === GOBYGLIMMER (고바이글리머) ===
  '251218_gobyglimmer_고바이글리머_wide_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|blush+화이트+핑크',
  '251218_gobyglimmer_고바이글리머_vert_58340573_58340574_58340575_58340576_58340577_58340578|고바이글리머|beautyproduct,brandfilm|1|color|따뜻한|밝은|blush+화이트+핑크',
  // === TFS (더페이스샵) ===
  '251215_tfs_더페이스샵_56010193|더페이스샵|productvideo,beautyproduct|0|skin|따뜻한|차분한|화이트+베이지',
  // === UGLYLOVELY (어글리러블리) ===
  '251211_uglylovely_어글리러블리_53070003|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_uglylovely_어글리러블리_53070002_02|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_uglylovely_어글리러블리_53070002_01|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  '251211_uglylovely_어글리러블리_53070001|어글리러블리|productvideo,content|0|skin|따뜻한|밝은|화이트',
  // === THEWHOO (더후) ===
  '251205_thewhoo_더후_51660001|더후|beautyproduct|1|skin|||',
  '251205_thewhoo_더후_51660002|더후|beautyproduct|1|skin|||',
  '251205_thewhoo_더후_51660003|더후|beautyproduct|1|skin|||',
  // === DRGROOT (닥터그루트) ===
  '251128_drgroot_닥터그루트_wide_30s_오리지날_v2|닥터그루트|beautyproduct,productvideo|1|hair|따뜻한|밝은|',
  '251128_drgroot_닥터그루트_vert_30s_오리지날_v2|닥터그루트|beautyproduct,productvideo|1|hair|따뜻한|밝은|',
  '251128_drgroot_닥터그루트_wide_30s_제품3종|닥터그루트|beautyproduct,productvideo|1|hair|따뜻한|밝은|',
  '251128_drgroot_닥터그루트_vert_30s_제품3종|닥터그루트|beautyproduct,productvideo|1|hair|따뜻한|밝은|',
  '251128_drgroot_닥터그루트_wide_30s_프로그란_v2|닥터그루트|beautyproduct,productvideo|0|hair|따뜻한|밝은|',
  '251128_drgroot_닥터그루트_vert_30s_프로그란_v2|닥터그루트|beautyproduct,productvideo|0|hair|따뜻한|밝은|',
  // === NOTFORYOU (낫포유) ===
  '251127_notforyou_낫포유_wide_20s_낫포유네온|낫포유|beautyproduct,productvideo|1|skin|||',
  '251127_notforyou_낫포유_vert_20s_낫포유네온|낫포유|beautyproduct,productvideo|1|skin|||',
  // === VDL (브이디엘) ===
  '251114_vdl_브이디엘_wide_25s_에센셜아이섀도우듀오|브이디엘|beautyproduct,howto|1|color|||',
  '251114_vdl_브이디엘_vert_25s_에센셜아이섀도우듀오|브이디엘|beautyproduct,howto|1|color|||',
  // === CNP (씨앤피) ===
  '251112_cnp_씨앤피_vert_35s_더마캐어시카토너패드|씨앤피|productvideo,beautyproduct|1|skin|||',
  // === ORGANICITY (유기농) ===
  '251025_organicity_오가니시티_vert_15s_어성초클렌저|오가니시티|productvideo|1|skin|||',
  // === BILANC (비앙씨) ===
  '251024_bilanc_비앙씨_wide_30s_앰플집중크림|비앙씨|beautyproduct|1|skin|||',
  '251024_bilanc_비앙씨_vert_20s_앰플집중크림|비앙씨|beautyproduct|1|skin|||',
  // === MOMOGLOW (모모글로우) ===
  '251018_momoglow_모모글로우_wide_30s_글래스크림|모모글로우|beautyproduct,productvideo|1|skin+base|||',
  '251018_momoglow_모모글로우_vert_30s_글래스크림|모모글로우|beautyproduct,productvideo|1|skin+base|||',
  // === DRMOF (더마모프) ===
  '251015_drmof_더마모프_wide_25s_글루타치온세럼|더마모프|beautyproduct|1|skin|||',
  '251015_drmof_더마모프_vert_25s_글루타치온세럼|더마모프|beautyproduct|1|skin|||',
  // === BELIF (빌리프) ===
  '251010_belif_빌리프_wide_25s_트루크림|빌리프|beautyproduct,productvideo|1|skin|||',
  '251010_belif_빌리프_vert_25s_트루크림|빌리프|beautyproduct,productvideo|1|skin|||',
  // === RETUNE (리튠) ===
  '251007_retune_리튠_wide_25s_탄력콜라겐크림|리튠|beautyproduct,productvideo|1|skin|||',
  '251007_retune_리튠_vert_25s_탄력콜라겐크림|리튠|beautyproduct,productvideo|1|skin|||',
  // === BEYOND (비욘드) ===
  '250929_beyond_비욘드_wide_20s_포레스트가든클렌저|비욘드|productvideo,beautyproduct|1|skin|||',
  '250929_beyond_비욘드_vert_20s_포레스트가든클렌저|비욘드|productvideo,beautyproduct|1|skin|||',
  '250929_beyond_비욘드_wide_30s_더바디솔로션|비욘드|productvideo,beautyproduct|1|body|||',
  '250929_beyond_비욘드_vert_30s_더바디솔로션|비욘드|productvideo,beautyproduct|1|body|||',
  // === ANEW (어뉴) ===
  '250926_anew_어뉴_wide_30s_스킨케어루틴|어뉴|beautyproduct,howto|1|skin|||',
  '250926_anew_어뉴_vert_30s_스킨케어루틴|어뉴|beautyproduct,howto|1|skin|||',
  // === GLINT (글린트) ===
  '250924_glint_글린트_vert_20s_젤리립글로스|글린트|beautyproduct|1|lip|||',
  '250924_glint_글린트_wide_20s_젤리립글로스|글린트|beautyproduct|1|lip|||',
  // === SOMEBYMI (썸바이미) ===
  '250920_somebymi_썸바이미_wide_30s_유자세럼|썸바이미|beautyproduct,productvideo|1|skin|||',
  '250920_somebymi_썸바이미_vert_30s_유자세럼|썸바이미|beautyproduct,productvideo|1|skin|||',
  // === DENCLE (덴클) ===
  '250918_dencle_덴클_wide_20s_칫솔세트|덴클|productvideo|0|tooth|||',
  '250918_dencle_덴클_vert_20s_칫솔세트|덴클|productvideo|0|tooth|||',
  // === SKETCH (스케치) ===
  '250916_sketch_스케치_wide_20s_초코에디션|스케치|productvideo,content|0|food|||',
  '250916_sketch_스케치_vert_20s_초코에디션|스케치|productvideo,content|0|food|||',
  // === SAMRIP (삼립) ===
  '250912_samrip_삼립_vert_20s_미니꿀약과|삼립|productvideo|0|food|||',
  // === LOTTE (롯데) ===
  '250910_lotte_롯데_wide_30s_쁘띠첼|롯데|productvideo,content|0|food|||',
  '250910_lotte_롯데_vert_30s_쁘띠첼|롯데|productvideo,content|0|food|||',
  // === COCACOLA (코카콜라) ===
  '250908_cocacola_코카콜라_wide_25s_코카콜라|코카콜라|productvideo|0|food|||',
  '250908_cocacola_코카콜라_vert_25s_코카콜라|코카콜라|productvideo|0|food|||',
  // === JOHEUNDAY (좋은데이) ===
  '250905_joheunday_좋은데이_wide_25s_좋은데이|좋은데이|productvideo|0|food|||',
  '250905_joheunday_좋은데이_vert_25s_좋은데이|좋은데이|productvideo|0|food|||',
  // === JANEPACKER (제인파커) ===
  '250903_janepacker_제인파커_wide_25s_핸드크림세트|제인파커|beautyproduct|0|body|||',
  '250903_janepacker_제인파커_vert_25s_핸드크림세트|제인파커|beautyproduct|0|body|||',
  // === BBBTHERAPY (BBB테라피) ===
  '250901_bbbtherapy_bbb테라피샴푸_wide_25s_스칼프슈티컬_샴푸|BBB테라피|beautyproduct|1|hair|||',
  '250901_bbbtherapy_bbb테라피샴푸_vert_25s_스칼프슈티컬_샴푸|BBB테라피|beautyproduct|1|hair|||',
  // === GLOBALCREATOR (글로벌크리에이터) ===
  '250830_globalcreator_글로벌크리에이터_wide_20s_인터뷰|글로벌크리에이터|interview|1||따뜻한|차분한|',
  '250830_globalcreator_글로벌크리에이터_vert_20s_인터뷰|글로벌크리에이터|interview|1||따뜻한|차분한|',
  // === ABIB (아비브) ===
  '250828_abib_아비브_wide_25s_크림패드|아비브|beautyproduct,productvideo|1|skin|||',
  '250828_abib_아비브_vert_25s_크림패드|아비브|beautyproduct,productvideo|1|skin|||',
  // === ANSWER19 (앤서나인틴) ===
  '250825_answer19_앤서나인틴_wide_25s_더마비건|앤서나인틴|beautyproduct|1|skin|||',
  '250825_answer19_앤서나인틴_vert_25s_더마비건|앤서나인틴|beautyproduct|1|skin|||',
  // === MANBETTY (맨베티) ===
  '250822_manbetty_맨베티_wide_25s_올인원세트|맨베티|beautyproduct,productvideo|1|skin|||',
  '250822_manbetty_맨베티_vert_25s_올인원세트|맨베티|beautyproduct,productvideo|1|skin|||',
  // === DRGROOT (닥터그루트) - More ===
  '250820_drgroot_닥터그루트_wide_25s_srs샴푸|닥터그루트|beautyproduct,productvideo|1|hair|||',
  '250820_drgroot_닥터그루트_vert_25s_srs샴푸|닥터그루트|beautyproduct,productvideo|1|hair|||',
  '250818_drgroot_닥터그루트_wide_20s_b&a탈모|닥터그루트|b&a|1|hair|||',
  '250818_drgroot_닥터그루트_vert_20s_b&a탈모|닥터그루트|b&a|1|hair|||',
  '250815_drgroot_닥터그루트_wide_30s_브랜드필름|닥터그루트|brandfilm|1|hair|따뜻한|감성적|',
  '250815_drgroot_닥터그루트_vert_30s_브랜드필름|닥터그루트|brandfilm|1|hair|따뜻한|감성적|',
  '250813_drgroot_닥터그루트_wide_25s_howto_스칼프케어|닥터그루트|howto|1|hair|||',
  '250813_drgroot_닥터그루트_vert_25s_howto_스칼프케어|닥터그루트|howto|1|hair|||',
  '250811_drgroot_닥터그루트_wide_10s_프로그란|닥터그루트|beautyproduct|0|hair|||',
  '250811_drgroot_닥터그루트_vert_10s_프로그란|닥터그루트|beautyproduct|0|hair|||',
  '250807_drgroot_닥터그루트_vert_5s_cr스팟젤영상|닥터그루트|content|0|hair|||',
  '250807_drgroot_닥터그루트_vert_10s_cr워터스케일러영상|닥터그루트|beautyproduct|0|hair|||',
  '250807_drgroot_닥터그루트_vert_10s_cr10초워터스케일러영상|닥터그루트|content|0|hair|||',
  // === ISAKNOX (이자녹스) ===
  '250806_isaknox_이자녹스_vert_30s_이자녹스|이자녹스|productvideo|0|base|||',
  // === BELIF (빌리프) - More ===
  '250804_belif_빌리프_vert_20s_프로즌키트|빌리프|content|0|skin+sun|||',
  // === DRGROOT (닥터그루트) - More 2 ===
  '250718_drgroot_닥터그루트_vert_25s_클리니컬릴리프샴푸|닥터그루트|productvideo|0|hair|||',
  '250717_drgroot_닥터그루트_vert_15s_클리니컬릴리프스팟젤|닥터그루트|productvideo,howto,content|1|hair|||',
  // === STAAACK (스택) ===
  '250714_staaack_스택_vert_25s_숏폼b|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_20s_무빙커버b|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_15s_숏폼a|스택|brandfilm,content|1|fashion|||',
  '250714_staaack_스택_vert_15s_무빙커버a|스택|brandfilm,content|1|fashion|||',
  // === TFS (더페이스샵) - More ===
  '250711_tfs_더페이스샵_wide_20s|더페이스샵|productvideo|1|sun|||',
  '250711_tfs_더페이스샵_vert_20s|더페이스샵|productvideo|1|sun|||',
  '250710_tfs_더페이스샵_vert_30s_요니다이소|더페이스샵|productvideo,content|1|skin|||',
  '250710_tfs_더페이스샵_vert_30s_다이소인터뷰|더페이스샵|interview|1|skin|||',
  '250710_tfs_더페이스샵_vert_30s_DID멀티선스틱|더페이스샵|productvideo|1|sun|||',
  '250703_drgroot_닥터그루트_wide_45s_srs라인|닥터그루트|brandfilm|1|hair|||',
  '250703_drgroot_닥터그루트_vert_45s_srs라인|닥터그루트|brandfilm|1|hair|||',
  // === VIDIVICI (비디비치) ===
  '250625_vidivici_비디비치_wide_25s_글로우세럼|비디비치|beautyproduct,productvideo|1|skin|||',
  '250625_vidivici_비디비치_vert_25s_글로우세럼|비디비치|beautyproduct,productvideo|1|skin|||',
  // === SUM (숨) ===
  '250620_sum_숨_wide_30s_에어라이징세럼|숨|beautyproduct|1|skin|||',
  '250620_sum_숨_vert_30s_에어라이징세럼|숨|beautyproduct|1|skin|||',
  // === BEYONDGLOW (비욘드글로우) ===
  '250615_beyondglow_비욘드글로우_wide_30s_세럼앤크림|비욘드글로우|beautyproduct,productvideo|1|skin|||',
  '250615_beyondglow_비욘드글로우_vert_30s_세럼앤크림|비욘드글로우|beautyproduct,productvideo|1|skin|||',
  // === TFS (더페이스샵) - More 2 ===
  '250610_tfs_더페이스샵_vert_25s_클렌징오일|더페이스샵|productvideo|1|skin|||',
  '250610_tfs_더페이스샵_wide_25s_클렌징오일|더페이스샵|productvideo|1|skin|||',
  '250605_tfs_더페이스샵_vert_20s_선크림|더페이스샵|productvideo|1|sun|||',
  '250605_tfs_더페이스샵_wide_20s_선크림|더페이스샵|productvideo|1|sun|||',
  // === BCLINICX (비클리닉스) ===
  '250530_bclinicx_비클리닉스_wide_25s_콜라겐앰플|비클리닉스|beautyproduct|1|skin|||',
  '250530_bclinicx_비클리닉스_vert_25s_콜라겐앰플|비클리닉스|beautyproduct|1|skin|||',
  // === DRGROOT (닥터그루트) - More 3 ===
  '250525_drgroot_닥터그루트_wide_30s_클리니컬릴리프|닥터그루트|beautyproduct,productvideo|1|hair|||',
  '250525_drgroot_닥터그루트_vert_30s_클리니컬릴리프|닥터그루트|beautyproduct,productvideo|1|hair|||',
  // === HOMESTAR (홈스타) ===
  '250520_homestar_홈스타_wide_30s_세탁세제|홈스타|productvideo|0|lifestyle|||',
  '250520_homestar_홈스타_vert_30s_세탁세제|홈스타|productvideo|0|lifestyle|||',
  // === NEWBALANCE (뉴발란스키즈) ===
  '250515_newbalance_뉴발란스키즈_wide_30s_키즈런닝화|뉴발란스키즈|brandfilm|1|fashion|||',
  '250515_newbalance_뉴발란스키즈_vert_30s_키즈런닝화|뉴발란스키즈|brandfilm|1|fashion|||',
  // === KFA (대한축구협회) ===
  '250510_kfa_대한축구협회_wide_30s_국가대표인터뷰|대한축구협회|interview|1||따뜻한|밝은|',
  '250510_kfa_대한축구협회_vert_30s_국가대표인터뷰|대한축구협회|interview|1||따뜻한|밝은|',
  // === DIAVE (디에이브) ===
  '250505_diave_디에이브_wide_25s_트리트먼트|디에이브|beautyproduct|1|hair|||',
  '250505_diave_디에이브_vert_25s_트리트먼트|디에이브|beautyproduct|1|hair|||',
  // === LOROBELL (로로벨) ===
  '250501_lorobell_로로벨_wide_30s_클렌저|로로벨|beautyproduct|1|skin|||',
  '250501_lorobell_로로벨_vert_30s_클렌저|로로벨|beautyproduct|1|skin|||',
  // === BETTERDAY (베러데이) ===
  '250428_betterday_베러데이_wide_25s_선크림|베러데이|beautyproduct,productvideo|1|sun|||',
  '250428_betterday_베러데이_vert_25s_선크림|베러데이|beautyproduct,productvideo|1|sun|||',
  // === DRBELLMER (닥터벨머) ===
  '250425_drbellmer_닥터벨머_wide_25s_레티놀세럼|닥터벨머|beautyproduct|1|skin|||',
  '250425_drbellmer_닥터벨머_vert_25s_레티놀세럼|닥터벨머|beautyproduct|1|skin|||',
  // === LOREAL (로레알) ===
  '250423_loreal_로레알_wide_30s_아보카도오일|로레알|beautyproduct|1|hair|따뜻한|밝은|',
  '250423_loreal_로레알_vert_30s_아보카도오일|로레알|beautyproduct|1|hair|따뜻한|밝은|',
  // === 418 DRGROOT ===
  '250418_drgroot_닥터그루트_vert_20s_지루성두피|닥터그루트|beautyproduct|1|hair|||',
  '250418_drgroot_닥터그루트_wide_20s_지루성두피|닥터그루트|beautyproduct|1|hair|||',
  // === HIMALAYA (히말라야핑크솔트) ===
  '250415_himalayapinksalt_히말라야핑크솔트_wide_25s_치약|히말라야핑크솔트|productvideo|1|tooth|||',
  '250415_himalayapinksalt_히말라야핑크솔트_vert_25s_치약|히말라야핑크솔트|productvideo|1|tooth|||',
  // === DAEHAN GORYEO (대한고려홍삼) ===
  '250410_daehan_대한고려홍삼_wide_30s_홍삼제품|대한고려홍삼|productvideo|0|food|||',
  '250410_daehan_대한고려홍삼_vert_30s_홍삼제품|대한고려홍삼|productvideo|0|food|||',
  // === KANGNAM GLOW (강남글로우) ===
  '250407_kangnamglow_강남글로우_wide_25s_필러|강남글로우|beautyproduct|1|skin|||',
  '250407_kangnamglow_강남글로우_vert_25s_필러|강남글로우|beautyproduct|1|skin|||',
  // === ADDICT (에이딕트) ===
  '250404_addict_에이딕트_wide_25s_라이프스타일|에이딕트|beautyproduct|1|lifestyle|따뜻한|밝은|',
  '250404_addict_에이딕트_vert_25s_라이프스타일|에이딕트|beautyproduct|1|lifestyle|따뜻한|밝은|',
  // === THESAEM (더샘) ===
  '250401_thesaem_더샘_wide_30s_라이프뷰티|더샘|beautyproduct|1|skin|따뜻한|밝은|',
  '250401_thesaem_더샘_vert_30s_라이프뷰티|더샘|beautyproduct|1|skin|따뜻한|밝은|',
  // === SECONDAIRE ===
  '250328_secondaire_세컨데어_wide_25s_푸드|Secondaire|productvideo|0|food|||',
  '250328_secondaire_세컨데어_vert_25s_푸드|Secondaire|productvideo|0|food|||',
  // === EVERTIS (에버티스) ===
  '250325_evertis_에버티스_wide_30s_브랜드필름|에버티스|brandfilm|1||따뜻한|감성적|',
  '250325_evertis_에버티스_vert_30s_브랜드필름|에버티스|brandfilm|1||따뜻한|감성적|',
  // === ORGANIST (오가니스트) ===
  '250320_organist_오가니스트_wide_25s_헤어에센스|오가니스트|beautyproduct,productvideo|1|hair|||',
  '250320_organist_오가니스트_vert_25s_헤어에센스|오가니스트|beautyproduct,productvideo|1|hair|||',
  // === CODEGLOKOLOR (코드글로컬러) ===
  '250315_codeglokolor_코드글로컬러_wide_25s_블러셔|코드글로컬러|beautyproduct,productvideo|1|color|||',
  '250315_codeglokolor_코드글로컬러_vert_25s_블러셔|코드글로컬러|beautyproduct,productvideo|1|color|||',
  // === VDL More ===
  '250310_vdl_브이디엘_wide_25s_컬렉터|브이디엘|beautyproduct|1|color|||',
  '250310_vdl_브이디엘_vert_25s_컬렉터|브이디엘|beautyproduct|1|color|||',
  // === ELASTINE (엘라스틴) ===
  '250305_elastine_엘라스틴_wide_25s_프로폴리스샴푸|엘라스틴|beautyproduct|1|hair|||',
  '250305_elastine_엘라스틴_vert_25s_프로폴리스샴푸|엘라스틴|beautyproduct|1|hair|||',
  // === TFS More ===
  '250301_tfs_더페이스샵_vert_25s_미감수세럼|더페이스샵|productvideo|1|skin|||',
  '250301_tfs_더페이스샵_wide_25s_미감수세럼|더페이스샵|productvideo|1|skin|||',
  // === CNP More ===
  '250225_cnp_씨앤피_wide_30s_프로폴리스세럼|씨앤피|beautyproduct,productvideo|1|skin|||',
  '250225_cnp_씨앤피_vert_30s_프로폴리스세럼|씨앤피|beautyproduct,productvideo|1|skin|||',
  // === DROGACLE (닥터오라클) ===
  '250220_droracle_닥터오라클_wide_25s_레티놀세럼|닥터오라클|beautyproduct|1|skin|||',
  '250220_droracle_닥터오라클_vert_25s_레티놀세럼|닥터오라클|beautyproduct|1|skin|||',
  // === BEYONDGLOW More ===
  '250215_beyondglow_비욘드글로우_wide_30s_미라클라인|비욘드글로우|beautyproduct,productvideo|1|skin|||',
  '250215_beyondglow_비욘드글로우_vert_30s_미라클라인|비욘드글로우|beautyproduct,productvideo|1|skin|||',
  // === TFS Daiso ===
  '250210_tfs_더페이스샵_wide_45s_다이소DID|더페이스샵|productvideo|1|skin+body+hair|||',
  '250210_tfs_더페이스샵_vert_45s_다이소DID|더페이스샵|productvideo|1|skin+body+hair|||',
  // === CODEGLOKOLOR More ===
  '250204_codeglokolor_코드글로컬러_vert_20s_소프트블러리퀴드블러셔|코드글로컬러|productvideo,howto|0|color|||',
  // === HIMALAYA More ===
  '250203_himalayapinksalt_히말라야핑크솔트_wide_20s|히말라야핑크솔트|productvideo,beautyproduct|0|hair|||',
  // === DRGROOT More ===
  '250116_drgroot_닥터그루트_vert_20s_캡슐트리트먼트|닥터그루트|beautyproduct|0|hair|||',
  '250116_drgroot_닥터그루트_vert_20s_두피영양토닉|닥터그루트|beautyproduct|0|hair|||',
  // === VDL More ===
  '250114_vdl_브이디엘_vert_25s_에센셜아이섀도우듀오|브이디엘|productvideo,howto|0|color|||',
  // === CODEGLOKOLOR More ===
  '250113_codeglokolor_코드글로컬러_wide_30s_블러셔앤립_제품영상|코드글로컬러|beautyproduct,productvideo|1|color+lip|||',
  // === BEYONDGLOW More ===
  '250107_beyondglow_비욘드글로우_wide_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  '250107_beyondglow_비욘드글로우_vert_30s_미라클라인_제품영상|비욘드글로우|productvideo,beautyproduct|1|skin|||',
  // === TFS Daiso DID ===
  '250106_tfs_더페이스샵_wide_45s_제품5라인_다이소did영상|더페이스샵|productvideo|1|skin+body+hair|||',
  '250106_tfs_더페이스샵_vert_45s_제품5라인_다이소did영상|더페이스샵|productvideo|1|skin+body+hair|||',
  // === DRGROOT Final ===
  '250103_drgroot_닥터그루트_wide_30s_두피스칼프케어|닥터그루트|beautyproduct,howto|1|hair|||',
  '250103_drgroot_닥터그루트_vert_30s_두피스칼프케어|닥터그루트|beautyproduct,howto|1|hair|||',
  // === TFS More ===
  '241230_tfs_더페이스샵_vert_15s_인터뷰_다이소|더페이스샵|interview,content|1|skin|||',
  '241228_tfs_더페이스샵_vert_25s_다이소세럼|더페이스샵|productvideo,content|1|skin|||',
  '241225_tfs_더페이스샵_vert_20s_허니점보크림|더페이스샵|productvideo|0|skin|||',
  '241220_tfs_더페이스샵_wide_30s_세럼3종|더페이스샵|productvideo,beautyproduct|0|skin|||',
  '241220_tfs_더페이스샵_vert_30s_세럼3종|더페이스샵|productvideo,beautyproduct|0|skin|||',
  // === ORGANIST More ===
  '240530_organist_오가니스트_wide_30s_헤어에센스_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_organist_오가니스트_vert_30s_헤어에센스_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_organist_오가니스트_vert_30s_헤어오일_제품영상|오가니스트|productvideo,howto|1|hair|||',
  '240530_organist_오가니스트_vert_30s_헤어라인전제품_제품영상|오가니스트|productvideo,howto|1|hair|||',
  // === TFS More ===
  '240527_tfs_더페이스샵_vert_25s_히알루론산크림_v2|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_25s_히알루론산크림_v1|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_25s_비건뮤신펩타이드크림_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_20s_올티밋멀티비타10프로세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  '240527_tfs_더페이스샵_vert_20s_비건뮤신펩타이드8세럼_숏폼컨텐츠|더페이스샵|productvideo|1|skin|||',
  // === HIMALAYA ===
  '240522_himalayapinksalt_히말라야핑크솔트_wide_25s_퍼플화이트닝치약|히말라야핑크솔트|productvideo|1|tooth|||',
  // === TIPSY (팁시) ===
  '240520_tpsy_팁시_vert_25s_팁시세트_숏폼컨텐츠|팁시|productvideo,content|0|lip|||',
  // === ELASTINE More ===
  '240517_elastine_엘라스틴_wide_25s_웨이브샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  '240517_elastine_엘라스틴_wide_25s_스트레이트샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  '240517_elastine_엘라스틴_vert_25s_웨이브샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  '240517_elastine_엘라스틴_vert_25s_스트레이트샴푸_제품영상|엘라스틴|beautyproduct|1|hair|||',
  // === AIMU (에이뮤) ===
  '240412_aimu_에이뮤_vert_30s_lifestyle_정수기_v2|에이뮤|productvideo|0|lifestyle|||',
  '240412_aimu_에이뮤_wide_30s_lifestyle_정수기_v1|에이뮤|productvideo|0|lifestyle|||',
  '240412_aimu_에이뮤_vert_30s_lifestyle_정수기_v1|에이뮤|productvideo|0|lifestyle|||',
  // === KAMARU (카마루) ===
  '240304_kamaru_카마루_wide_45s|카마루|productvideo|0|lifestyle|||',
  '240304_kamaru_카마루_vert_45s|카마루|productvideo|0|lifestyle|||',
  '240304_kamaru_카마루_vert_25s|카마루|productvideo|0|lifestyle|||',
  // === FACEREPUBLIC (페이스리퍼블릭) ===
  '240206_facerepublic_페이스리퍼블릭_wide_30s_blooming|페이스리퍼블릭|beautyproduct|1|skin|||',
  '240206_facerepublic_페이스리퍼블릭_vert_30s_blooming|페이스리퍼블릭|beautyproduct|1|skin|||',
  '240206_facerepublic_페이스리퍼블릭_wide_30s_cica|페이스리퍼블릭|beautyproduct|1|skin|||',
  // === THESAEM More ===
  '240306_thesaem_더샘_wide_30s_flower|더샘|beautyproduct|1|skin|따뜻한|밝은|',
  '240306_thesaem_더샘_vert_30s_flower|더샘|beautyproduct|1|skin|따뜻한|밝은|',
  // === ADDICT More ===
  '240309_addict_에이딕트_wide_25s|에이딕트|beautyproduct|1|lifestyle|따뜻한|밝은|',
  '240309_addict_에이딕트_vert_25s|에이딕트|beautyproduct|1|lifestyle|따뜻한|밝은|',
  // === SECONDAIRE More ===
  '241117_secondaire_세컨데어_wide_30s_food|Secondaire|productvideo|0|food|||',
  '241117_secondaire_세컨데어_vert_30s_food|Secondaire|productvideo|0|food|||',
  // === EVERTIS More ===
  '241115_evertis_에버티스_wide_45s_brandfilm|에버티스|brandfilm|1||따뜻한|감성적|',
  '241115_evertis_에버티스_vert_45s_brandfilm|에버티스|brandfilm|1||따뜻한|감성적|',
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

// 실제 데이터 변환 + wide/vert 중복 제거 (wide 우선, 없으면 vert)
function deduplicateItems(items: PortfolioItem[]): PortfolioItem[] {
  const seen = new Map<string, PortfolioItem>();
  for (const item of items) {
    // 기본 키: wide/vert/16x9/9x16 제거하여 같은 영상 식별
    const baseKey = item.filename
      .replace(/_wide_/g, '_FMT_')
      .replace(/_vert_/g, '_FMT_')
      .replace(/_16x9/g, '_RES')
      .replace(/_9x16/g, '_RES');

    const existing = seen.get(baseKey);
    if (!existing) {
      seen.set(baseKey, item);
    } else {
      // wide/16x9 버전 우선
      const isWide = item.filename.includes('_wide_') || item.filename.includes('_16x9');
      const existingIsWide = existing.filename.includes('_wide_') || existing.filename.includes('_16x9');
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
