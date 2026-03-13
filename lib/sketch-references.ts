/**
 * Storyboard Sketch Reference Library
 * Contains SVG-based storyboard thumbnails organized by categories
 * for video production storyboarding tool
 *
 * Categories:
 * - CHARACTER: Various character poses, angles, and compositions
 * - BACKGROUND: Interior and exterior settings
 * - COMBINED: Characters within environments
 */

export interface SketchRef {
  id: string;
  name: string;
  nameKo: string;
  category: 'character' | 'background' | 'combined';
  subcategory: string;
  shotSize?: string;
  cameraAngle?: string;
  svg: string;
  tags: string[];
}

// CHARACTER SKETCHES
const characterSketches: SketchRef[] = [
  {
    id: 'char_front_standing',
    name: 'Front View Standing',
    nameKo: '정면 서있기',
    category: 'character',
    subcategory: 'front',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Composition grid -->
        <line x1="160" y1="20" x2="160" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="80" y1="20" x2="80" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="240" y1="20" x2="240" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="160" cy="45" r="12"/>
        <!-- Body -->
        <line x1="160" y1="57" x2="160" y2="95"/>
        <!-- Arms -->
        <line x1="160" y1="65" x2="140" y2="80"/>
        <line x1="160" y1="65" x2="180" y2="80"/>
        <!-- Legs -->
        <line x1="160" y1="95" x2="150" y2="140"/>
        <line x1="160" y1="95" x2="170" y2="140"/>
        <!-- Feet -->
        <line x1="150" y1="140" x2="145" y2="150"/>
        <line x1="170" y1="140" x2="175" y2="150"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'front', 'neutral']
  },
  {
    id: 'char_front_walking',
    name: 'Front View Walking',
    nameKo: '정면 걷기',
    category: 'character',
    subcategory: 'front',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Composition guides -->
        <line x1="160" y1="20" x2="160" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="160" cy="45" r="12"/>
        <!-- Body -->
        <line x1="160" y1="57" x2="160" y2="95"/>
        <!-- Left arm up, right arm back -->
        <line x1="160" y1="65" x2="140" y2="55"/>
        <line x1="160" y1="65" x2="185" y2="85"/>
        <!-- Left leg forward, right leg back -->
        <line x1="160" y1="95" x2="145" y2="140"/>
        <line x1="160" y1="95" x2="175" y2="135"/>
        <!-- Direction indicator -->
        <path d="M 200 160 L 210 160" stroke-width="2"/>
      </g>
    </svg>`,
    tags: ['person', 'walking', 'front', 'motion']
  },
  {
    id: 'char_side_standing',
    name: 'Side View Standing',
    nameKo: '측면 서있기',
    category: 'character',
    subcategory: 'side',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Composition guide -->
        <line x1="100" y1="20" x2="100" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head profile -->
        <circle cx="100" cy="45" r="12"/>
        <line x1="112" y1="43" x2="115" y2="43"/>
        <!-- Body -->
        <line x1="100" y1="57" x2="100" y2="95"/>
        <!-- Arms -->
        <line x1="100" y1="65" x2="80" y2="80"/>
        <line x1="100" y1="65" x2="120" y2="75"/>
        <!-- Legs -->
        <line x1="100" y1="95" x2="95" y2="140"/>
        <line x1="100" y1="95" x2="105" y2="140"/>
        <!-- Feet -->
        <line x1="95" y1="140" x2="92" y2="150"/>
        <line x1="105" y1="140" x2="108" y2="150"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'side', 'profile']
  },
  {
    id: 'char_side_walking',
    name: 'Side View Walking',
    nameKo: '측면 걷기',
    category: 'character',
    subcategory: 'side',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Direction arrow -->
        <path d="M 200 160 L 240 160 M 235 155 L 240 160 L 235 165" stroke-width="2"/>
        <!-- Head -->
        <circle cx="100" cy="45" r="12"/>
        <line x1="112" y1="43" x2="115" y2="43"/>
        <!-- Body -->
        <line x1="100" y1="57" x2="100" y2="95"/>
        <!-- Left arm back, right arm forward -->
        <line x1="100" y1="65" x2="75" y2="85"/>
        <line x1="100" y1="65" x2="120" y2="55"/>
        <!-- Left leg forward, right leg back -->
        <line x1="100" y1="95" x2="85" y2="140"/>
        <line x1="100" y1="95" x2="110" y2="135"/>
      </g>
    </svg>`,
    tags: ['person', 'walking', 'side', 'motion', 'profile']
  },
  {
    id: 'char_45deg_standing',
    name: '45 Degree Standing',
    nameKo: '45도 서있기',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Rule of thirds -->
        <line x1="107" y1="20" x2="107" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="213" y1="20" x2="213" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="130" cy="45" r="12"/>
        <!-- Body (angled) -->
        <line x1="130" y1="57" x2="135" y2="95"/>
        <!-- Arms (3/4 view) -->
        <line x1="130" y1="65" x2="110" y2="78"/>
        <line x1="135" y1="70" x2="155" y2="82"/>
        <!-- Legs -->
        <line x1="135" y1="95" x2="128" y2="140"/>
        <line x1="135" y1="95" x2="142" y2="140"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', '45-degree', '3-4-view']
  },
  {
    id: 'char_back_view',
    name: 'Back View',
    nameKo: '뒷모습',
    category: 'character',
    subcategory: 'back',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head from back -->
        <circle cx="160" cy="45" r="12"/>
        <!-- Hair suggestion -->
        <path d="M 148 40 Q 160 35 172 40"/>
        <!-- Body -->
        <line x1="160" y1="57" x2="160" y2="95"/>
        <!-- Arms -->
        <line x1="160" y1="65" x2="140" y2="78"/>
        <line x1="160" y1="65" x2="180" y2="78"/>
        <!-- Legs -->
        <line x1="160" y1="95" x2="150" y2="140"/>
        <line x1="160" y1="95" x2="170" y2="140"/>
        <!-- Spine line -->
        <line x1="160" y1="45" x2="160" y2="95" stroke-opacity="0.3"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'back', 'rear']
  },
  {
    id: 'char_sitting',
    name: 'Sitting',
    nameKo: '앉아있기',
    category: 'character',
    subcategory: 'action',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <circle cx="100" cy="65" r="11"/>
        <!-- Torso -->
        <line x1="100" y1="76" x2="100" y2="110"/>
        <!-- Arms -->
        <line x1="100" y1="82" x2="75" y2="95"/>
        <line x1="100" y1="82" x2="125" y2="95"/>
        <!-- Seat -->
        <path d="M 75 110 Q 100 115 125 110"/>
        <!-- Legs -->
        <line x1="85" y1="115" x2="80" y2="140"/>
        <line x1="115" y1="115" x2="120" y2="140"/>
      </g>
    </svg>`,
    tags: ['person', 'sitting', 'seated', 'indoor']
  },
  {
    id: 'char_closeup_face_front',
    name: 'Close-up Face Front',
    nameKo: '정면 클로즈업',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'CU',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Focus rectangle -->
        <rect x="60" y="30" width="200" height="120" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="160" cy="90" r="45"/>
        <!-- Eyes -->
        <circle cx="140" cy="80" r="5"/>
        <circle cx="180" cy="80" r="5"/>
        <!-- Pupils -->
        <circle cx="140" cy="80" r="3" fill="currentColor"/>
        <circle cx="180" cy="80" r="3" fill="currentColor"/>
        <!-- Nose -->
        <line x1="160" y1="85" x2="160" y2="100"/>
        <!-- Mouth -->
        <path d="M 145 110 Q 160 115 175 110"/>
      </g>
    </svg>`,
    tags: ['face', 'closeup', 'front', 'emotion']
  },
  {
    id: 'char_closeup_face_side',
    name: 'Close-up Face Side',
    nameKo: '측면 클로즈업',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'CU',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Focus rectangle -->
        <rect x="80" y="30" width="160" height="120" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head profile -->
        <circle cx="120" cy="90" r="45"/>
        <!-- Facial features profile -->
        <circle cx="100" cy="82" r="6" fill="currentColor"/>
        <!-- Nose -->
        <line x1="130" y1="85" x2="145" y2="88"/>
        <!-- Mouth -->
        <path d="M 130 105 Q 140 110 145 105"/>
      </g>
    </svg>`,
    tags: ['face', 'closeup', 'side', 'profile', 'emotion']
  },
  {
    id: 'char_closeup_face_45deg',
    name: 'Close-up Face 45 Degree',
    nameKo: '45도 클로즈업',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'CU',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <circle cx="140" cy="90" r="45"/>
        <!-- Eyes 3/4 view -->
        <circle cx="125" cy="80" r="5"/>
        <circle cx="160" cy="78" r="5"/>
        <!-- Pupils -->
        <circle cx="125" cy="80" r="3" fill="currentColor"/>
        <circle cx="160" cy="78" r="3" fill="currentColor"/>
        <!-- Nose -->
        <line x1="140" y1="85" x2="152" y2="95"/>
        <!-- Mouth -->
        <path d="M 130 108 Q 145 115 160 108"/>
      </g>
    </svg>`,
    tags: ['face', 'closeup', '45-degree', '3-4-view', 'emotion']
  },
  {
    id: 'char_two_talking',
    name: 'Two People Talking',
    nameKo: '대화 2인',
    category: 'character',
    subcategory: 'group',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Person 1 -->
        <circle cx="80" cy="50" r="10"/>
        <line x1="80" y1="60" x2="80" y2="90"/>
        <line x1="80" y1="68" x2="60" y2="80"/>
        <line x1="80" y1="68" x2="100" y2="78"/>
        <line x1="80" y1="90" x2="75" y2="130"/>
        <line x1="80" y1="90" x2="85" y2="130"/>
        <!-- Person 2 -->
        <circle cx="240" cy="50" r="10"/>
        <line x1="240" y1="60" x2="240" y2="90"/>
        <line x1="240" y1="68" x2="220" y2="80"/>
        <line x1="240" y1="68" x2="260" y2="78"/>
        <line x1="240" y1="90" x2="235" y2="130"/>
        <line x1="240" y1="90" x2="245" y2="130"/>
        <!-- Speech indication -->
        <path d="M 120 70 Q 140 60 160 70" stroke-width="1" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['people', 'dialogue', 'conversation', 'interaction']
  },
  {
    id: 'char_two_facing',
    name: 'Two People Facing',
    nameKo: '마주보기 2인',
    category: 'character',
    subcategory: 'group',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Person 1 (left) -->
        <circle cx="90" cy="55" r="10"/>
        <line x1="90" y1="65" x2="90" y2="95"/>
        <line x1="90" y1="72" x2="70" y2="85"/>
        <line x1="90" y1="72" x2="110" y2="80"/>
        <line x1="90" y1="95" x2="85" y2="135"/>
        <line x1="90" y1="95" x2="95" y2="135"/>
        <!-- Person 2 (right) -->
        <circle cx="230" cy="55" r="10"/>
        <line x1="230" y1="65" x2="230" y2="95"/>
        <line x1="230" y1="72" x2="250" y2="85"/>
        <line x1="230" y1="72" x2="210" y2="80"/>
        <line x1="230" y1="95" x2="225" y2="135"/>
        <line x1="230" y1="95" x2="235" y2="135"/>
        <!-- Connection line -->
        <line x1="100" y1="55" x2="220" y2="55" stroke-opacity="0.3" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['people', 'facing', 'interaction', 'dialogue', 'eye-contact']
  },
  {
    id: 'char_group_3people',
    name: 'Group 3 People',
    nameKo: '3인 그룹',
    category: 'character',
    subcategory: 'group',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Person 1 (left) -->
        <circle cx="70" cy="60" r="9"/>
        <line x1="70" y1="69" x2="70" y2="95"/>
        <line x1="70" y1="75" x2="55" y2="88"/>
        <line x1="70" y1="75" x2="85" y2="85"/>
        <line x1="70" y1="95" x2="65" y2="130"/>
        <!-- Person 2 (center) -->
        <circle cx="160" cy="50" r="10"/>
        <line x1="160" y1="60" x2="160" y2="95"/>
        <line x1="160" y1="68" x2="140" y2="82"/>
        <line x1="160" y1="68" x2="180" y2="82"/>
        <line x1="160" y1="95" x2="155" y2="135"/>
        <!-- Person 3 (right) -->
        <circle cx="250" cy="60" r="9"/>
        <line x1="250" y1="69" x2="250" y2="95"/>
        <line x1="250" y1="75" x2="235" y2="88"/>
        <line x1="250" y1="75" x2="265" y2="85"/>
        <line x1="250" y1="95" x2="245" y2="130"/>
      </g>
    </svg>`,
    tags: ['people', 'group', 'three', 'gathering']
  },
  {
    id: 'char_hand_closeup',
    name: 'Hand Close-up',
    nameKo: '손 클로즈업',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'CU',
    cameraAngle: 'top-down',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Palm -->
        <path d="M 100 80 Q 120 60 140 70 Q 150 65 155 80 L 155 130 Q 140 140 100 135 Z"/>
        <!-- Fingers -->
        <line x1="105" y1="60" x2="105" y2="35"/>
        <line x1="120" y1="55" x2="120" y2="30"/>
        <line x1="135" y1="60" x2="135" y2="35"/>
        <line x1="150" y1="70" x2="160" y2="40"/>
        <!-- Knuckle lines -->
        <line x1="105" y1="75" x2="105" y2="85"/>
        <line x1="120" y1="70" x2="120" y2="85"/>
        <line x1="135" y1="75" x2="135" y2="85"/>
      </g>
    </svg>`,
    tags: ['hand', 'closeup', 'gesture', 'detail']
  },
  {
    id: 'char_over_shoulder',
    name: 'Over-the-Shoulder',
    nameKo: '어깨너머',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Foreground person (back) -->
        <circle cx="60" cy="70" r="12" stroke-width="1.2"/>
        <line x1="60" y1="82" x2="60" y2="115" stroke-width="1.2"/>
        <line x1="60" y1="88" x2="40" y2="100" stroke-width="1.2"/>
        <!-- Background person (front) -->
        <circle cx="200" cy="65" r="11"/>
        <line x1="200" y1="76" x2="200" y2="105"/>
        <line x1="200" y1="82" x2="185" y2="95"/>
        <line x1="200" y1="82" x2="215" y2="95"/>
        <!-- Shoulder line emphasis -->
        <line x1="55" y1="85" x2="75" y2="85" stroke-opacity="0.3"/>
      </g>
    </svg>`,
    tags: ['composition', 'over-shoulder', 'two-person', 'reaction']
  },
  {
    id: 'char_low_angle',
    name: 'Low Angle Person',
    nameKo: '로우앵글 인물',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'FS',
    cameraAngle: 'low',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Low angle perspective guides -->
        <line x1="80" y1="160" x2="120" y2="20" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="200" y1="160" x2="160" y2="20" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head (larger at top) -->
        <circle cx="160" cy="40" r="15"/>
        <!-- Body tapers down -->
        <path d="M 145 55 L 135 100 L 185 100 L 175 55 Z" fill="none"/>
        <!-- Legs -->
        <line x1="140" y1="100" x2="135" y2="155"/>
        <line x1="180" y1="100" x2="185" y2="155"/>
      </g>
    </svg>`,
    tags: ['angle', 'low-angle', 'power', 'perspective', 'heroic']
  },
  {
    id: 'char_high_angle',
    name: 'High Angle Person',
    nameKo: '하이앵글 인물',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'FS',
    cameraAngle: 'high',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- High angle perspective guides -->
        <line x1="80" y1="20" x2="120" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="200" y1="20" x2="160" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head (smaller) -->
        <circle cx="160" cy="55" r="12"/>
        <!-- Body expands down -->
        <path d="M 148 67 L 130 130 L 190 130 L 172 67 Z" fill="none"/>
        <!-- Legs spreads -->
        <line x1="135" y1="130" x2="130" y2="160"/>
        <line x1="185" y1="130" x2="190" y2="160"/>
      </g>
    </svg>`,
    tags: ['angle', 'high-angle', 'power', 'perspective', 'vulnerable']
  },
  {
    id: 'char_running',
    name: 'Person Running',
    nameKo: '달리기',
    category: 'character',
    subcategory: 'action',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Motion lines -->
        <line x1="20" y1="120" x2="40" y2="120" stroke-opacity="0.4"/>
        <line x1="15" y1="100" x2="35" y2="100" stroke-opacity="0.4"/>
        <!-- Head (forward) -->
        <circle cx="120" cy="50" r="11"/>
        <!-- Body lean forward -->
        <line x1="120" y1="61" x2="110" y2="100"/>
        <!-- Arms in running pose -->
        <line x1="120" y1="68" x2="95" y2="60"/>
        <line x1="110" y1="75" x2="130" y2="85"/>
        <!-- Legs in stride -->
        <line x1="110" y1="100" x2="100" y2="145"/>
        <line x1="110" y1="100" x2="125" y2="130"/>
        <!-- Speed indicator -->
        <path d="M 200 160 L 240 160" stroke-width="2"/>
        <path d="M 210 150 L 250 150" stroke-width="1.5" stroke-opacity="0.6"/>
      </g>
    </svg>`,
    tags: ['action', 'running', 'motion', 'dynamic']
  },
  {
    id: 'char_pointing',
    name: 'Person Pointing',
    nameKo: '가리키기',
    category: 'character',
    subcategory: 'action',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <circle cx="100" cy="55" r="10"/>
        <!-- Body -->
        <line x1="100" y1="65" x2="100" y2="95"/>
        <!-- Pointing arm -->
        <line x1="100" y1="70" x2="200" y2="40"/>
        <!-- Other arm -->
        <line x1="100" y1="70" x2="70" y2="85"/>
        <!-- Legs -->
        <line x1="100" y1="95" x2="95" y2="135"/>
        <line x1="100" y1="95" x2="105" y2="135"/>
        <!-- Direction arrow -->
        <path d="M 200 40 L 220 35 L 215 45" fill="none" stroke-width="1.5"/>
      </g>
    </svg>`,
    tags: ['action', 'pointing', 'gesture', 'direction']
  },
  {
    id: 'char_on_phone',
    name: 'Person on Phone',
    nameKo: '전화하기',
    category: 'character',
    subcategory: 'action',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <circle cx="100" cy="55" r="10"/>
        <!-- Body -->
        <line x1="100" y1="65" x2="100" y2="95"/>
        <!-- Phone arm -->
        <line x1="100" y1="70" x2="115" y2="50"/>
        <!-- Phone -->
        <rect x="115" y="45" width="15" height="25" rx="2"/>
        <!-- Other arm -->
        <line x1="100" y1="70" x2="75" y2="85"/>
        <!-- Legs -->
        <line x1="100" y1="95" x2="95" y2="135"/>
        <line x1="100" y1="95" x2="105" y2="135"/>
      </g>
    </svg>`,
    tags: ['action', 'phone', 'communication', 'indoor']
  },
  {
    id: 'char_with_laptop',
    name: 'Person with Laptop',
    nameKo: '노트북 사용',
    category: 'character',
    subcategory: 'action',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <circle cx="80" cy="70" r="10"/>
        <!-- Body -->
        <line x1="80" y1="80" x2="80" y2="110"/>
        <!-- Arms holding laptop -->
        <line x1="80" y1="85" x2="120" y2="75"/>
        <line x1="80" y1="85" x2="150" y2="75"/>
        <!-- Laptop -->
        <rect x="120" y="60" width="50" height="30" rx="2"/>
        <line x1="120" y1="75" x2="170" y2="75"/>
        <!-- Legs -->
        <line x1="80" y1="110" x2="75" y2="140"/>
        <line x1="80" y1="110" x2="85" y2="140"/>
      </g>
    </svg>`,
    tags: ['action', 'computer', 'work', 'tech']
  },
  {
    id: 'char_presenting',
    name: 'Person Presenting',
    nameKo: '프레젠테이션',
    category: 'character',
    subcategory: 'action',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Podium/stage line -->
        <line x1="50" y1="140" x2="270" y2="140" stroke-opacity="0.3"/>
        <!-- Head -->
        <circle cx="160" cy="55" r="12"/>
        <!-- Body -->
        <line x1="160" y1="67" x2="160" y2="105"/>
        <!-- One arm gesturing -->
        <line x1="160" y1="75" x2="130" y2="60"/>
        <!-- Other arm at side -->
        <line x1="160" y1="75" x2="190" y2="90"/>
        <!-- Legs -->
        <line x1="160" y1="105" x2="155" y2="140"/>
        <line x1="160" y1="105" x2="165" y2="140"/>
        <!-- Presentation screen area -->
        <rect x="180" y="30" width="80" height="60" stroke-opacity="0.2" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['action', 'presenting', 'speaking', 'gesture']
  },
  {
    id: 'char_interview_setup',
    name: 'Interview Setup',
    nameKo: '인터뷰 셋업',
    category: 'character',
    subcategory: 'group',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Interviewer (front, larger) -->
        <circle cx="80" cy="60" r="11"/>
        <line x1="80" y1="71" x2="80" y2="100"/>
        <line x1="80" y1="78" x2="60" y2="90"/>
        <line x1="80" y1="78" x2="100" y2="88"/>
        <line x1="80" y1="100" x2="75" y2="135"/>
        <!-- Interviewee (back, slightly smaller) -->
        <circle cx="200" cy="65" r="10"/>
        <line x1="200" y1="75" x2="200" y2="100"/>
        <line x1="200" y1="81" x2="185" y2="92"/>
        <line x1="200" y1="81" x2="215" y2="92"/>
        <!-- Microphone -->
        <circle cx="130" cy="85" r="4"/>
        <line x1="130" y1="89" x2="130" y2="105"/>
      </g>
    </svg>`,
    tags: ['interview', 'two-person', 'conversation', 'setup']
  },
  {
    id: 'char_eyes_extreme_closeup',
    name: 'Extreme Close-up Eyes',
    nameKo: '눈 극접사',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'ECU',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Left eye -->
        <ellipse cx="100" cy="90" rx="35" ry="30"/>
        <circle cx="100" cy="92" r="15" fill="none"/>
        <circle cx="100" cy="92" r="10" fill="currentColor" stroke="none"/>
        <circle cx="103" cy="90" r="4" fill="white" stroke="none"/>
        <!-- Right eye -->
        <ellipse cx="220" cy="90" rx="35" ry="30"/>
        <circle cx="220" cy="92" r="15" fill="none"/>
        <circle cx="220" cy="92" r="10" fill="currentColor" stroke="none"/>
        <circle cx="223" cy="90" r="4" fill="white" stroke="none"/>
        <!-- Eyelashes -->
        <path d="M 65 65 Q 70 55 75 60"/>
        <path d="M 245 65 Q 250 55 255 60"/>
      </g>
    </svg>`,
    tags: ['eyes', 'extreme-closeup', 'emotion', 'reaction']
  },
  {
    id: 'char_medium_shot_waist_up',
    name: 'Medium Shot Waist Up',
    nameKo: '미디엄샷 허리위',
    category: 'character',
    subcategory: 'framing',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Frame guides -->
        <line x1="50" y1="10" x2="270" y2="10" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <line x1="50" y1="140" x2="270" y2="140" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="160" cy="45" r="12"/>
        <!-- Shoulder width -->
        <line x1="130" y1="130" x2="190" y2="130" stroke-opacity="0.2"/>
        <!-- Body -->
        <line x1="160" y1="57" x2="160" y2="100"/>
        <!-- Arms -->
        <line x1="160" y1="65" x2="140" y2="80"/>
        <line x1="160" y1="65" x2="180" y2="80"/>
        <!-- Clothing suggestion -->
        <path d="M 130 100 L 160 100 L 190 100" stroke-opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['framing', 'medium-shot', 'waist-up', 'interview']
  },
  {
    id: 'char_full_body_action',
    name: 'Full Body Action',
    nameKo: '전신 액션',
    category: 'character',
    subcategory: 'action',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head tilted -->
        <circle cx="155" cy="45" r="12"/>
        <!-- Body twisting -->
        <path d="M 155 57 Q 150 75 155 95"/>
        <!-- Arm up -->
        <line x1="155" y1="65" x2="120" y2="50"/>
        <!-- Arm down -->
        <line x1="155" y1="70" x2="190" y2="85"/>
        <!-- Legs in action -->
        <line x1="155" y1="95" x2="145" y2="150"/>
        <line x1="155" y1="95" x2="170" y2="140"/>
        <!-- Motion indicator -->
        <path d="M 200 160 L 240 160" stroke-width="2"/>
      </g>
    </svg>`,
    tags: ['action', 'full-body', 'dynamic', 'motion']
  },
  {
    id: 'char_cowboy_shot',
    name: 'Cowboy Shot',
    nameKo: '카우보이샷',
    category: 'character',
    subcategory: 'framing',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Frame from mid-thigh -->
        <line x1="50" y1="55" x2="270" y2="55" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Head -->
        <circle cx="160" cy="40" r="11"/>
        <!-- Body -->
        <line x1="160" y1="51" x2="160" y2="90"/>
        <!-- Arms -->
        <line x1="160" y1="60" x2="135" y2="75"/>
        <line x1="160" y1="60" x2="185" y2="75"/>
        <!-- Waist/hip detail -->
        <line x1="155" y1="90" x2="165" y2="90" stroke-opacity="0.4"/>
        <!-- Thighs -->
        <line x1="155" y1="90" x2="150" y2="125"/>
        <line x1="165" y1="90" x2="170" y2="125"/>
      </g>
    </svg>`,
    tags: ['framing', 'cowboy-shot', 'action', 'western']
  },
  {
    id: 'char_dutch_angle',
    name: 'Dutch Angle Person',
    nameKo: '더치앵글 인물',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'FS',
    cameraAngle: 'dutch',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Tilted frame -->
        <rect x="60" y="20" width="200" height="140" stroke-opacity="0.2" stroke-dasharray="2,2" transform="rotate(-15 160 90)"/>
        <!-- Head (rotated) -->
        <circle cx="160" cy="45" r="12" transform="rotate(-15 160 45)"/>
        <!-- Body (rotated) -->
        <line x1="160" y1="57" x2="160" y2="95" stroke-width="1.5" transform="rotate(-15 160 75)"/>
        <!-- Arms -->
        <line x1="160" y1="65" x2="140" y2="80" stroke-width="1.5" transform="rotate(-15 160 75)"/>
        <line x1="160" y1="65" x2="180" y2="80" stroke-width="1.5" transform="rotate(-15 160 75)"/>
        <!-- Legs -->
        <line x1="160" y1="95" x2="150" y2="140" stroke-width="1.5" transform="rotate(-15 160 95)"/>
        <line x1="160" y1="95" x2="170" y2="140" stroke-width="1.5" transform="rotate(-15 160 95)"/>
      </g>
    </svg>`,
    tags: ['angle', 'dutch-angle', 'tilted', 'tension', 'uneasy']
  },
  {
    id: 'char_birds_eye',
    name: "Bird's Eye Person",
    nameKo: '버즈아이 인물',
    category: 'character',
    subcategory: 'angle',
    shotSize: 'FS',
    cameraAngle: 'birds-eye',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Top-down perspective -->
        <!-- Head -->
        <circle cx="160" cy="60" r="14"/>
        <!-- Shoulders -->
        <ellipse cx="160" cy="80" rx="30" ry="20"/>
        <!-- Body -->
        <path d="M 130 100 L 190 100 L 185 140 L 135 140 Z"/>
        <!-- Legs -->
        <line x1="145" y1="140" x2="145" y2="155"/>
        <line x1="175" y1="140" x2="175" y2="155"/>
        <!-- Direction arrow -->
        <path d="M 160 160 L 160 165" stroke-width="2"/>
        <path d="M 158 163 L 160 165 L 162 163" stroke-width="2"/>
      </g>
    </svg>`,
    tags: ['angle', 'birds-eye', 'overhead', 'top-down']
  },
  {
    id: 'char_silhouette',
    name: 'Silhouette',
    nameKo: '실루엣',
    category: 'character',
    subcategory: 'lighting',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Backlight indication -->
        <circle cx="280" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="0.3"/>
        <!-- Silhouette head -->
        <circle cx="160" cy="50" r="13" fill="currentColor"/>
        <!-- Silhouette body -->
        <path d="M 147 63 L 147 100 L 173 100 L 173 63 Z" fill="currentColor"/>
        <!-- Silhouette arms -->
        <path d="M 147 70 L 125 80 L 130 75 Z" fill="currentColor"/>
        <path d="M 173 70 L 195 80 L 190 75 Z" fill="currentColor"/>
        <!-- Silhouette legs -->
        <path d="M 152 100 L 148 145 L 155 145 Z" fill="currentColor"/>
        <path d="M 168 100 L 172 145 L 165 145 Z" fill="currentColor"/>
      </g>
    </svg>`,
    tags: ['silhouette', 'backlit', 'lighting', 'dramatic']
  }
];

// BACKGROUND SKETCHES
const backgroundSketches: SketchRef[] = [
  {
    id: 'bg_office_interior',
    name: 'Office Interior',
    nameKo: '사무실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Door -->
        <rect x="220" y="90" width="40" height="70"/>
        <circle cx="257" cy="125" r="3" fill="currentColor"/>
        <!-- Window -->
        <rect x="60" y="40" width="60" height="40"/>
        <line x1="90" y1="40" x2="90" y2="80"/>
        <line x1="60" y1="60" x2="120" y2="60"/>
        <!-- Desk -->
        <rect x="140" y="110" width="70" height="50"/>
        <line x1="140" y1="130" x2="210" y2="130"/>
        <!-- Chair back -->
        <ellipse cx="175" cy="95" rx="20" ry="25"/>
        <!-- Shelves -->
        <line x1="80" y1="95" x2="120" y2="95"/>
        <line x1="80" y1="110" x2="120" y2="110"/>
        <line x1="80" y1="125" x2="120" y2="125"/>
      </g>
    </svg>`,
    tags: ['interior', 'office', 'workplace', 'corporate']
  },
  {
    id: 'bg_living_room',
    name: 'Living Room',
    nameKo: '거실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Sofa -->
        <path d="M 60 120 L 60 100 L 140 100 L 140 120"/>
        <line x1="70" y1="100" x2="70" y2="120"/>
        <line x1="100" y1="100" x2="100" y2="120"/>
        <line x1="130" y1="100" x2="130" y2="120"/>
        <!-- Coffee table -->
        <rect x="150" y="110" width="50" height="30"/>
        <!-- TV stand -->
        <rect x="220" y="85" width="40" height="45"/>
        <!-- TV -->
        <rect x="225" y="90" width="30" height="20"/>
        <!-- Window curtain -->
        <path d="M 80 40 Q 90 35 100 40 L 100 80"/>
        <path d="M 100 40 Q 110 35 120 40 L 120 80"/>
      </g>
    </svg>`,
    tags: ['interior', 'living-room', 'home', 'residential']
  },
  {
    id: 'bg_cafe_interior',
    name: 'Cafe Interior',
    nameKo: '카페',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Counter -->
        <rect x="200" y="50" width="60" height="100"/>
        <line x1="205" y1="50" x2="255" y2="50"/>
        <!-- Equipment on counter -->
        <rect x="210" y="55" width="20" height="20"/>
        <rect x="240" y="55" width="15" height="25"/>
        <!-- Tables -->
        <circle cx="90" cy="100" r="20"/>
        <circle cx="150" cy="110" r="18"/>
        <!-- Chairs -->
        <rect x="75" y="120" width="8" height="15"/>
        <rect x="105" y="120" width="8" height="15"/>
        <!-- Menu board -->
        <rect x="60" y="40" width="40" height="50"/>
      </g>
    </svg>`,
    tags: ['interior', 'cafe', 'restaurant', 'social']
  },
  {
    id: 'bg_street_scene',
    name: 'Street Scene',
    nameKo: '거리',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Buildings -->
        <rect x="50" y="40" width="80" height="100"/>
        <rect x="190" y="50" width="80" height="90"/>
        <!-- Windows -->
        <rect x="60" y="50" width="15" height="15"/>
        <rect x="80" y="50" width="15" height="15"/>
        <rect x="60" y="75" width="15" height="15"/>
        <rect x="80" y="75" width="15" height="15"/>
        <!-- Street line -->
        <line x1="50" y1="140" x2="270" y2="140" stroke-width="2"/>
        <!-- Road markings -->
        <line x1="80" y1="140" x2="80" y2="150" stroke-opacity="0.5"/>
        <line x1="120" y1="140" x2="120" y2="150" stroke-opacity="0.5"/>
        <!-- Sidewalk -->
        <path d="M 50 140 L 50 160 L 270 160 L 270 140" stroke-opacity="0.3"/>
        <!-- Lamppost -->
        <line x1="130" y1="30" x2="130" y2="140"/>
        <circle cx="130" cy="30" r="5"/>
      </g>
    </svg>`,
    tags: ['exterior', 'street', 'urban', 'city']
  },
  {
    id: 'bg_park_nature',
    name: 'Park/Nature',
    nameKo: '공원/자연',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <line x1="50" y1="60" x2="270" y2="60" stroke-opacity="0.2"/>
        <!-- Trees -->
        <circle cx="80" cy="50" r="20"/>
        <line x1="80" y1="70" x2="80" y2="120"/>
        <circle cx="200" cy="55" r="18"/>
        <line x1="200" y1="73" x2="200" y2="120"/>
        <!-- Grass -->
        <path d="M 50 120 Q 160 110 270 120"/>
        <!-- Path -->
        <path d="M 50 130 Q 160 125 270 130" stroke-opacity="0.5"/>
        <!-- Bench -->
        <line x1="120" y1="115" x2="150" y2="115"/>
        <rect x="110" y="118" width="40" height="3"/>
      </g>
    </svg>`,
    tags: ['exterior', 'park', 'nature', 'outdoors', 'landscape']
  },
  {
    id: 'bg_studio_blank',
    name: 'Studio Blank',
    nameKo: '스튜디오',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Infinity curve -->
        <path d="M 50 90 Q 80 40 160 40 Q 240 40 270 90"/>
        <!-- Ground line -->
        <line x1="50" y1="160" x2="270" y2="160" stroke-opacity="0.5"/>
        <!-- Lighting rigs -->
        <line x1="60" y1="20" x2="60" y2="50" stroke-opacity="0.3"/>
        <circle cx="60" cy="20" r="5" stroke-opacity="0.3"/>
        <line x1="260" y1="25" x2="260" y2="55" stroke-opacity="0.3"/>
        <circle cx="260" cy="25" r="5" stroke-opacity="0.3"/>
        <!-- Depth markers -->
        <line x1="160" y1="40" x2="160" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['studio', 'backdrop', 'blank', 'minimal', 'professional']
  },
  {
    id: 'bg_rooftop_cityscape',
    name: 'Rooftop Cityscape',
    nameKo: '옥상 도시',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <line x1="50" y1="50" x2="270" y2="50" stroke-opacity="0.2"/>
        <!-- Distant buildings -->
        <path d="M 60 50 L 60 100 L 90 70 L 120 100 L 150 65 L 180 100"/>
        <path d="M 180 65 L 210 100 L 240 70 L 270 100"/>
        <!-- Near rooftop -->
        <line x1="50" y1="110" x2="270" y2="110" stroke-width="2"/>
        <!-- Rooftop elements -->
        <rect x="70" y="80" width="25" height="30"/>
        <rect x="210" y="85" width="30" height="25"/>
        <!-- Railing suggestion -->
        <line x1="50" y1="112" x2="270" y2="112" stroke-opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['exterior', 'rooftop', 'cityscape', 'urban', 'skyline']
  },
  {
    id: 'bg_hallway_corridor',
    name: 'Hallway/Corridor',
    nameKo: '복도',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Perspective lines -->
        <line x1="80" y1="40" x2="160" y2="160"/>
        <line x1="240" y1="40" x2="160" y2="160"/>
        <!-- Ceiling -->
        <line x1="80" y1="40" x2="240" y2="40"/>
        <!-- Floor -->
        <line x1="80" y1="160" x2="240" y2="160"/>
        <!-- Left wall -->
        <line x1="80" y1="40" x2="80" y2="160"/>
        <!-- Right wall -->
        <line x1="240" y1="40" x2="240" y2="160"/>
        <!-- Doors -->
        <rect x="90" y="70" width="30" height="50"/>
        <rect x="220" y="75" width="30" height="50"/>
        <!-- Vanishing point marker -->
        <circle cx="160" cy="160" r="2" fill="currentColor" stroke="none"/>
      </g>
    </svg>`,
    tags: ['interior', 'hallway', 'corridor', 'perspective']
  },
  {
    id: 'bg_conference_room',
    name: 'Conference Room',
    nameKo: '회의실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Conference table -->
        <ellipse cx="160" cy="100" rx="70" ry="35"/>
        <!-- Chairs around table -->
        <rect x="75" y="85" width="12" height="15"/>
        <rect x="233" y="85" width="12" height="15"/>
        <rect x="80" y="120" width="12" height="15"/>
        <rect x="228" y="120" width="12" height="15"/>
        <!-- Whiteboard -->
        <rect x="220" y="40" width="50" height="40"/>
        <!-- Window -->
        <rect x="60" y="40" width="50" height="40"/>
        <line x1="85" y1="40" x2="85" y2="80"/>
        <line x1="60" y1="60" x2="110" y2="60"/>
      </g>
    </svg>`,
    tags: ['interior', 'conference', 'meeting', 'corporate']
  },
  {
    id: 'bg_kitchen',
    name: 'Kitchen',
    nameKo: '주방',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Counter -->
        <rect x="50" y="100" width="220" height="60"/>
        <!-- Cabinets -->
        <rect x="60" y="40" width="40" height="30"/>
        <rect x="110" y="40" width="40" height="30"/>
        <rect x="160" y="40" width="40" height="30"/>
        <!-- Sink -->
        <circle cx="200" cy="115" r="12"/>
        <!-- Stove -->
        <rect x="85" y="105" width="30" height="25"/>
        <circle cx="90" cy="110" r="4"/>
        <circle cx="105" cy="110" r="4"/>
        <circle cx="90" cy="125" r="4"/>
        <circle cx="105" cy="125" r="4"/>
        <!-- Window -->
        <rect x="130" y="45" width="50" height="30"/>
      </g>
    </svg>`,
    tags: ['interior', 'kitchen', 'home', 'residential']
  },
  {
    id: 'bg_bedroom',
    name: 'Bedroom',
    nameKo: '침실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Bed -->
        <rect x="60" y="90" width="100" height="70"/>
        <line x1="60" y1="105" x2="160" y2="105"/>
        <!-- Headboard -->
        <rect x="60" y="85" width="100" height="8"/>
        <!-- Nightstand -->
        <rect x="180" y="100" width="35" height="30"/>
        <!-- Lamp -->
        <circle cx="197" cy="95" r="4"/>
        <!-- Window -->
        <rect x="220" y="40" width="50" height="50"/>
        <!-- Curtain -->
        <path d="M 220 45 Q 225 50 220 55"/>
        <path d="M 270 45 Q 265 50 270 55"/>
      </g>
    </svg>`,
    tags: ['interior', 'bedroom', 'home', 'residential', 'intimate']
  },
  {
    id: 'bg_restaurant',
    name: 'Restaurant',
    nameKo: '레스토랑',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Tables -->
        <circle cx="90" cy="90" r="22"/>
        <circle cx="160" cy="100" r="22"/>
        <circle cx="230" cy="85" r="22"/>
        <!-- Chairs -->
        <rect x="70" y="115" width="8" height="15"/>
        <rect x="105" y="115" width="8" height="15"/>
        <!-- Kitchen counter -->
        <rect x="50" y="40" width="60" height="30"/>
        <!-- Window -->
        <rect x="220" y="40" width="50" height="40"/>
      </g>
    </svg>`,
    tags: ['interior', 'restaurant', 'dining', 'social']
  },
  {
    id: 'bg_warehouse_industrial',
    name: 'Warehouse/Industrial',
    nameKo: '창고/공장',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Large space perspective -->
        <line x1="80" y1="50" x2="160" y2="160"/>
        <line x1="240" y1="50" x2="160" y2="160"/>
        <line x1="80" y1="50" x2="240" y2="50" stroke-width="2"/>
        <!-- High ceiling -->
        <line x1="80" y1="40" x2="240" y2="40"/>
        <!-- Support beam -->
        <rect x="155" y="30" width="10" height="130"/>
        <!-- Industrial storage -->
        <rect x="85" y="110" width="50" height="50" stroke-opacity="0.6"/>
        <rect x="225" y="115" width="45" height="45" stroke-opacity="0.6"/>
        <!-- Lighting -->
        <circle cx="100" cy="35" r="5" stroke-opacity="0.3"/>
        <circle cx="220" cy="35" r="5" stroke-opacity="0.3"/>
      </g>
    </svg>`,
    tags: ['interior', 'warehouse', 'industrial', 'factory', 'large']
  },
  {
    id: 'bg_classroom',
    name: 'Classroom',
    nameKo: '교실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Blackboard -->
        <rect x="220" y="40" width="50" height="50"/>
        <!-- Student desks -->
        <rect x="60" y="75" width="25" height="20"/>
        <rect x="95" y="75" width="25" height="20"/>
        <rect x="130" y="75" width="25" height="20"/>
        <rect x="60" y="105" width="25" height="20"/>
        <rect x="95" y="105" width="25" height="20"/>
        <!-- Teacher desk -->
        <rect x="180" y="115" width="50" height="25"/>
        <!-- Window -->
        <rect x="65" y="40" width="50" height="35"/>
      </g>
    </svg>`,
    tags: ['interior', 'classroom', 'education', 'school']
  },
  {
    id: 'bg_hospital_room',
    name: 'Hospital Room',
    nameKo: '병실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Walls -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Hospital bed -->
        <rect x="60" y="95" width="100" height="50"/>
        <line x1="60" y1="115" x2="160" y2="115"/>
        <!-- Bedside equipment -->
        <rect x="170" y="85" width="25" height="40"/>
        <circle cx="182" cy="90" r="4"/>
        <!-- IV stand -->
        <line x1="200" y1="50" x2="200" y2="110"/>
        <circle cx="200" cy="48" r="6"/>
        <!-- Monitor -->
        <rect x="210" y="80" width="40" height="30"/>
        <!-- Window -->
        <rect x="80" y="40" width="50" height="35"/>
      </g>
    </svg>`,
    tags: ['interior', 'hospital', 'medical', 'healthcare']
  },
  {
    id: 'bg_beach_ocean',
    name: 'Beach/Ocean',
    nameKo: '해변',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <line x1="50" y1="60" x2="270" y2="60" stroke-opacity="0.3"/>
        <!-- Ocean waves -->
        <path d="M 50 70 Q 90 65 130 70 T 210 70 T 270 70" stroke-opacity="0.5"/>
        <path d="M 50 80 Q 90 75 130 80 T 210 80 T 270 80" stroke-opacity="0.4"/>
        <!-- Sand -->
        <path d="M 50 90 L 270 90"/>
        <!-- Horizon line -->
        <line x1="50" y1="70" x2="270" y2="70" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Sun -->
        <circle cx="240" cy="50" r="15" stroke-opacity="0.3"/>
        <!-- Beach elements -->
        <circle cx="80" cy="120" r="8" stroke-opacity="0.4"/>
        <path d="M 180 85 L 185 110 L 175 110 Z" stroke-opacity="0.5"/>
      </g>
    </svg>`,
    tags: ['exterior', 'beach', 'ocean', 'water', 'landscape']
  },
  {
    id: 'bg_mountain_landscape',
    name: 'Mountain Landscape',
    nameKo: '산',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <line x1="50" y1="80" x2="270" y2="80" stroke-opacity="0.3"/>
        <!-- Mountains -->
        <path d="M 50 80 L 100 40 L 160 65 L 210 35 L 270 80"/>
        <!-- Foreground mountains -->
        <path d="M 50 120 L 110 85 L 180 110 L 240 75 L 270 120"/>
        <!-- Ground -->
        <line x1="50" y1="160" x2="270" y2="160"/>
        <!-- Clouds -->
        <path d="M 70 50 Q 80 45 90 50" stroke-opacity="0.3"/>
        <path d="M 220 55 Q 230 50 240 55" stroke-opacity="0.3"/>
      </g>
    </svg>`,
    tags: ['exterior', 'mountain', 'landscape', 'nature', 'scenery']
  },
  {
    id: 'bg_night_city',
    name: 'Night City',
    nameKo: '야경',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dark sky -->
        <rect x="50" y="30" width="220" height="70" fill="none" stroke="none"/>
        <!-- Buildings -->
        <rect x="55" y="40" width="50" height="70"/>
        <rect x="120" y="50" width="60" height="60"/>
        <rect x="195" y="45" width="55" height="65"/>
        <!-- Lit windows -->
        <rect x="62" y="50" width="8" height="8" fill="currentColor"/>
        <rect x="75" y="50" width="8" height="8" fill="currentColor"/>
        <rect x="62" y="65" width="8" height="8" fill="currentColor"/>
        <rect x="75" y="65" width="8" height="8" fill="currentColor"/>
        <rect x="130" y="60" width="10" height="10" fill="currentColor"/>
        <rect x="150" y="60" width="10" height="10" fill="currentColor"/>
        <!-- Street lights -->
        <circle cx="100" cy="120" r="8" stroke-opacity="0.5"/>
        <circle cx="220" cy="125" r="8" stroke-opacity="0.5"/>
      </g>
    </svg>`,
    tags: ['exterior', 'night', 'city', 'urban', 'lighting']
  },
  {
    id: 'bg_subway_train',
    name: 'Subway/Train',
    nameKo: '지하철',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Train car interior -->
        <rect x="50" y="50" width="220" height="90"/>
        <!-- Seats -->
        <line x1="60" y1="85" x2="120" y2="85"/>
        <line x1="200" y1="85" x2="260" y2="85"/>
        <!-- Handrails -->
        <line x1="160" y1="50" x2="160" y2="140"/>
        <line x1="120" y1="60" x2="200" y2="60"/>
        <!-- Windows -->
        <rect x="70" y="55" width="30" height="25" stroke-opacity="0.5"/>
        <rect x="220" y="55" width="30" height="25" stroke-opacity="0.5"/>
        <!-- Doors -->
        <rect x="85" y="135" width="30" height="15"/>
        <rect x="205" y="135" width="30" height="15"/>
      </g>
    </svg>`,
    tags: ['interior', 'transport', 'subway', 'train', 'public']
  },
  {
    id: 'bg_car_interior',
    name: 'Car Interior',
    nameKo: '자동차 내부',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Windshield -->
        <path d="M 70 50 Q 160 40 250 50" stroke-width="2"/>
        <!-- Dashboard -->
        <path d="M 70 100 L 250 100"/>
        <!-- Steering wheel -->
        <circle cx="100" cy="95" r="15"/>
        <circle cx="100" cy="95" r="10" fill="none"/>
        <!-- Seats -->
        <path d="M 70 105 L 70 140 L 130 140 L 130 105"/>
        <path d="M 190 105 L 190 140 L 250 140 L 250 105"/>
        <!-- Side window -->
        <rect x="130" y="60" width="40" height="45" stroke-opacity="0.5"/>
        <!-- Rear window -->
        <path d="M 75 155 L 245 155" stroke-opacity="0.3"/>
      </g>
    </svg>`,
    tags: ['interior', 'car', 'vehicle', 'driving', 'transportation']
  }
];

// COMBINED SKETCHES
const combinedSketches: SketchRef[] = [
  {
    id: 'combined_person_office',
    name: 'Person in Office',
    nameKo: '사무실 인물',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Office background -->
        <rect x="50" y="30" width="220" height="130"/>
        <rect x="200" y="60" width="60" height="90"/>
        <line x1="200" y1="80" x2="260" y2="80"/>
        <!-- Window -->
        <rect x="60" y="40" width="50" height="35"/>
        <!-- Person at desk -->
        <circle cx="120" cy="75" r="11"/>
        <line x1="120" y1="86" x2="120" y2="110"/>
        <line x1="120" y1="92" x2="95" y2="105"/>
        <line x1="120" y1="92" x2="145" y2="105"/>
        <line x1="120" y1="110" x2="115" y2="140"/>
        <line x1="120" y1="110" x2="125" y2="140"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'office', 'work']
  },
  {
    id: 'combined_person_cafe',
    name: 'Person at Cafe',
    nameKo: '카페 인물',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cafe background -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Counter -->
        <rect x="200" y="60" width="60" height="100"/>
        <!-- Table -->
        <circle cx="140" cy="110" r="25"/>
        <!-- Person sitting at table -->
        <circle cx="120" cy="75" r="10"/>
        <line x1="120" y1="85" x2="120" y2="110"/>
        <line x1="120" y1="91" x2="100" y2="100"/>
        <line x1="120" y1="91" x2="140" y2="95"/>
        <!-- Cup on table -->
        <circle cx="150" cy="125" r="8"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'cafe', 'social']
  },
  {
    id: 'combined_person_street',
    name: 'Person on Street',
    nameKo: '거리 인물',
    category: 'combined',
    subcategory: 'outdoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Street scene -->
        <rect x="50" y="40" width="80" height="100"/>
        <rect x="190" y="50" width="80" height="90"/>
        <line x1="50" y1="140" x2="270" y2="140" stroke-width="2"/>
        <!-- Lamppost -->
        <line x1="130" y1="30" x2="130" y2="140"/>
        <circle cx="130" cy="30" r="5" stroke-opacity="0.5"/>
        <!-- Person walking -->
        <circle cx="100" cy="100" r="11"/>
        <line x1="100" y1="111" x2="100" y2="140"/>
        <line x1="100" y1="118" x2="80" y2="130"/>
        <line x1="100" y1="118" x2="120" y2="125"/>
        <line x1="100" y1="140" x2="93" y2="160"/>
        <line x1="100" y1="140" x2="107" y2="155"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'street', 'urban']
  },
  {
    id: 'combined_two_meeting',
    name: 'Two People in Meeting',
    nameKo: '회의 2인',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Meeting room -->
        <rect x="50" y="30" width="220" height="130"/>
        <!-- Table -->
        <rect x="100" y="90" width="120" height="50"/>
        <!-- Whiteboard -->
        <rect x="220" y="40" width="50" height="40"/>
        <!-- Person 1 -->
        <circle cx="85" cy="70" r="10"/>
        <line x1="85" y1="80" x2="85" y2="110"/>
        <line x1="85" y1="86" x2="65" y2="98"/>
        <line x1="85" y1="110" x2="80" y2="140"/>
        <!-- Person 2 -->
        <circle cx="235" cy="70" r="10"/>
        <line x1="235" y1="80" x2="235" y2="110"/>
        <line x1="235" y1="86" x2="255" y2="98"/>
        <line x1="235" y1="110" x2="240" y2="140"/>
      </g>
    </svg>`,
    tags: ['combined', 'people', 'meeting', 'discussion']
  },
  {
    id: 'combined_person_desk',
    name: 'Person at Desk',
    nameKo: '책상 인물',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Desk -->
        <rect x="100" y="100" width="120" height="50"/>
        <line x1="100" y1="100" x2="130" y2="100"/>
        <!-- Desk items -->
        <rect x="110" y="85" width="20" height="15"/>
        <circle cx="150" cy="90" r="8"/>
        <!-- Chair back -->
        <ellipse cx="160" cy="80" rx="25" ry="30"/>
        <!-- Person sitting -->
        <circle cx="160" cy="55" r="11"/>
        <line x1="160" y1="66" x2="160" y2="95"/>
        <line x1="160" y1="72" x2="140" y2="85"/>
        <line x1="160" y1="72" x2="180" y2="85"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'desk', 'work', 'sitting']
  },
  {
    id: 'combined_person_studio',
    name: 'Person in Studio',
    nameKo: '스튜디오 인물',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Studio backdrop -->
        <path d="M 50 80 Q 80 40 160 40 Q 240 40 270 80"/>
        <!-- Ground -->
        <line x1="50" y1="160" x2="270" y2="160" stroke-opacity="0.5"/>
        <!-- Depth guide -->
        <line x1="160" y1="40" x2="160" y2="160" stroke-opacity="0.2" stroke-dasharray="2,2"/>
        <!-- Person in center -->
        <circle cx="160" cy="80" r="12"/>
        <line x1="160" y1="92" x2="160" y2="130"/>
        <line x1="160" y1="100" x2="140" y2="115"/>
        <line x1="160" y1="100" x2="180" y2="115"/>
        <line x1="160" y1="130" x2="155" y2="160"/>
        <line x1="160" y1="130" x2="165" y2="160"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'studio', 'professional', 'minimal']
  },
  {
    id: 'combined_walking_park',
    name: 'Walking in Park',
    nameKo: '공원 걷기',
    category: 'combined',
    subcategory: 'outdoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Trees -->
        <circle cx="80" cy="50" r="20"/>
        <line x1="80" y1="70" x2="80" y2="120"/>
        <circle cx="220" cy="55" r="18"/>
        <line x1="220" y1="73" x2="220" y2="125"/>
        <!-- Path -->
        <path d="M 50 120 Q 160 115 270 120"/>
        <!-- Grass -->
        <line x1="50" y1="130" x2="270" y2="130" stroke-opacity="0.3"/>
        <!-- Person walking -->
        <circle cx="140" cy="90" r="11"/>
        <line x1="140" y1="101" x2="140" y2="130"/>
        <line x1="140" y1="108" x2="120" y2="120"/>
        <line x1="140" y1="108" x2="160" y2="115"/>
        <!-- Motion indicator -->
        <path d="M 180 145 L 220 145" stroke-width="1.5" stroke-opacity="0.6"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'park', 'outdoor', 'nature']
  },
  {
    id: 'combined_driving',
    name: 'Driving',
    nameKo: '운전',
    category: 'combined',
    subcategory: 'vehicle',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Windshield -->
        <path d="M 70 50 Q 160 40 250 50" stroke-width="2"/>
        <!-- Dashboard -->
        <path d="M 70 100 L 250 100"/>
        <!-- Road ahead -->
        <path d="M 50 160 L 80 100 L 240 100 L 270 160"/>
        <!-- Person driving -->
        <circle cx="110" cy="85" r="10"/>
        <line x1="110" y1="95" x2="110" y2="120"/>
        <line x1="110" y1="100" x2="90" y2="110"/>
        <circle cx="100" cy="95" r="15"/>
        <circle cx="100" cy="95" r="10" fill="none"/>
      </g>
    </svg>`,
    tags: ['combined', 'person', 'driving', 'vehicle', 'transportation']
  },
  {
    id: 'combined_interview_studio',
    name: 'Interview in Studio',
    nameKo: '스튜디오 인터뷰',
    category: 'combined',
    subcategory: 'indoor',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Studio backdrop -->
        <path d="M 50 80 Q 90 40 160 40 Q 230 40 270 80"/>
        <!-- Ground -->
        <line x1="50" y1="160" x2="270" y2="160" stroke-opacity="0.5"/>
        <!-- Interviewer (foreground) -->
        <circle cx="70" cy="85" r="10"/>
        <line x1="70" y1="95" x2="70" y2="125"/>
        <line x1="70" y1="101" x2="50" y2="112"/>
        <!-- Interviewee (background) -->
        <circle cx="200" cy="90" r="11"/>
        <line x1="200" y1="101" x2="200" y2="130"/>
        <line x1="200" y1="107" x2="180" y2="118"/>
        <line x1="200" y1="107" x2="220" y2="118"/>
        <!-- Microphone -->
        <circle cx="130" cy="110" r="4"/>
        <line x1="130" y1="114" x2="130" y2="130"/>
      </g>
    </svg>`,
    tags: ['combined', 'interview', 'studio', 'professional', 'setup']
  },
  {
    id: 'combined_product_hand',
    name: 'Product Close-up with Hand',
    nameKo: '제품 클로즈업',
    category: 'combined',
    subcategory: 'detail',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Product -->
        <rect x="120" y="60" width="80" height="60" rx="5"/>
        <!-- Product detail lines -->
        <line x1="130" y1="70" x2="190" y2="70" stroke-opacity="0.5"/>
        <line x1="130" y1="85" x2="190" y2="85" stroke-opacity="0.5"/>
        <line x1="130" y1="100" x2="190" y2="100" stroke-opacity="0.5"/>
        <!-- Hand holding product -->
        <path d="M 100 100 Q 110 90 120 95"/>
        <line x1="100" y1="100" x2="95" y2="120"/>
        <line x1="100" y1="100" x2="110" y2="125"/>
        <!-- Fingers -->
        <line x1="105" y1="115" x2="100" y2="130"/>
        <line x1="115" y1="122" x2="115" y2="135"/>
      </g>
    </svg>`,
    tags: ['combined', 'product', 'hand', 'detail', 'closeup']
  }
];

// Combine all sketches
export const SKETCH_REFERENCES: SketchRef[] = [
  ...characterSketches,
  ...backgroundSketches,
  ...combinedSketches
];

// Export organized structure
export const SKETCHES_BY_CATEGORY = {
  character: characterSketches,
  background: backgroundSketches,
  combined: combinedSketches
};

// Export helper to get sketches by category
export function getSketchesByCategory(category: 'character' | 'background' | 'combined'): SketchRef[] {
  return SKETCHES_BY_CATEGORY[category];
}

// Export helper to search sketches
export function searchSketches(query: string): SketchRef[] {
  const lowerQuery = query.toLowerCase();
  return SKETCH_REFERENCES.filter(
    sketch =>
      sketch.name.toLowerCase().includes(lowerQuery) ||
      sketch.nameKo.includes(query) ||
      sketch.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      sketch.subcategory.toLowerCase().includes(lowerQuery)
  );
}

// Export sketch count stats
export const SKETCH_STATS = {
  total: SKETCH_REFERENCES.length,
  character: characterSketches.length,
  background: backgroundSketches.length,
  combined: combinedSketches.length
};
