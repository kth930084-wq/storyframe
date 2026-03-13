/**
 * Storyboard Sketch Reference Library
 * Contains professional SVG-based storyboard thumbnails organized by categories
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
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="160" cy="40" rx="13" ry="16"/>
        <path d="M 155 50 Q 160 54 165 50" stroke-width="1"/>
        <!-- Torso with mass -->
        <path d="M 148 56 L 145 95 Q 145 100 150 100 L 170 100 Q 175 100 175 95 L 172 56 Q 170 52 160 52 Q 150 52 148 56" fill="currentColor" fill-opacity="0.08"/>
        <!-- Shoulders outline -->
        <path d="M 145 56 L 175 56" stroke-width="1.2"/>
        <!-- Arms -->
        <path d="M 145 60 Q 135 70 130 95" stroke-width="1.3"/>
        <path d="M 175 60 Q 185 70 190 95" stroke-width="1.3"/>
        <!-- Legs with taper -->
        <path d="M 150 100 Q 148 120 145 160" stroke-width="1.2"/>
        <path d="M 170 100 Q 172 120 175 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="145" y1="160" x2="140" y2="168"/>
        <line x1="175" y1="160" x2="180" y2="168"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'front', 'neutral', 'full-body']
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
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="140" cy="40" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 128 56 L 125 95 Q 125 100 130 100 L 150 100 Q 155 100 155 95 L 152 56 Q 150 52 140 52 Q 130 52 128 56" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 125 56 L 155 56" stroke-width="1.2"/>
        <!-- Left arm up (walking motion) -->
        <path d="M 125 60 Q 115 50 110 45" stroke-width="1.3"/>
        <!-- Right arm back -->
        <path d="M 155 60 Q 165 75 170 100" stroke-width="1.3"/>
        <!-- Left leg forward -->
        <path d="M 130 100 Q 128 125 125 160" stroke-width="1.2"/>
        <!-- Right leg back -->
        <path d="M 150 100 Q 152 120 155 155" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="125" y1="160" x2="120" y2="168"/>
        <line x1="155" y1="155" x2="160" y2="163"/>
        <!-- Motion indicator -->
        <path d="M 200 160 L 215 160" stroke-width="2" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['person', 'walking', 'front', 'motion', 'stride']
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
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head profile -->
        <ellipse cx="100" cy="40" rx="14" ry="17"/>
        <!-- Nose -->
        <line x1="114" y1="38" x2="118" y2="40"/>
        <!-- Ear suggestion -->
        <path d="M 86 42 Q 82 45 84 50" stroke-width="1"/>
        <!-- Torso profile -->
        <path d="M 90 57 L 88 98 Q 88 102 93 102 L 115 102 Q 120 102 120 98 L 118 57 Q 116 53 100 53 Q 84 53 90 57" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 88 57 L 120 57" stroke-width="1.2"/>
        <!-- Front arm -->
        <path d="M 93 62 Q 80 75 75 100" stroke-width="1.3"/>
        <!-- Back arm -->
        <path d="M 115 62 Q 128 73 135 98" stroke-width="1.3"/>
        <!-- Front leg -->
        <path d="M 95 102 Q 93 130 92 162" stroke-width="1.2"/>
        <!-- Back leg -->
        <path d="M 115 102 Q 118 130 120 162" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="92" y1="162" x2="88" y2="170"/>
        <line x1="120" y1="162" x2="125" y2="170"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'side', 'profile', 'neutral']
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
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="110" cy="38" rx="14" ry="17"/>
        <!-- Torso -->
        <path d="M 100 55 L 98 96 Q 98 100 103 100 L 125 100 Q 130 100 130 96 L 128 55 Q 126 51 110 51 Q 94 51 100 55" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 98 55 L 130 55" stroke-width="1.2"/>
        <!-- Front arm raised -->
        <path d="M 103 60 Q 90 45 85 35" stroke-width="1.3"/>
        <!-- Back arm -->
        <path d="M 125 60 Q 140 75 145 95" stroke-width="1.3"/>
        <!-- Front leg forward -->
        <path d="M 105 100 Q 100 125 95 160" stroke-width="1.2"/>
        <!-- Back leg back -->
        <path d="M 125 100 Q 132 120 138 155" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="95" y1="160" x2="90" y2="168"/>
        <line x1="138" y1="155" x2="143" y2="163"/>
        <!-- Motion line -->
        <path d="M 180 90 L 200 90" stroke-width="2" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['person', 'walking', 'side', 'motion', 'stride']
  },
  {
    id: 'char_back_standing',
    name: 'Back View Standing',
    nameKo: '후면 서있기',
    category: 'character',
    subcategory: 'back',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head back view -->
        <ellipse cx="160" cy="40" rx="13" ry="16"/>
        <!-- Hair back mass -->
        <path d="M 150 38 Q 160 32 170 38" stroke-width="1.2"/>
        <!-- Torso back -->
        <path d="M 148 56 L 145 95 Q 145 100 150 100 L 170 100 Q 175 100 175 95 L 172 56 Q 170 52 160 52 Q 150 52 148 56" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 145 56 L 175 56" stroke-width="1.2"/>
        <!-- Spine line -->
        <line x1="160" y1="56" x2="160" y2="100" stroke-opacity="0.4" stroke-width="1"/>
        <!-- Left arm down -->
        <path d="M 145 62 Q 130 75 125 100" stroke-width="1.3"/>
        <!-- Right arm down -->
        <path d="M 175 62 Q 190 75 195 100" stroke-width="1.3"/>
        <!-- Legs -->
        <path d="M 150 100 Q 148 130 145 160" stroke-width="1.2"/>
        <path d="M 170 100 Q 172 130 175 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="145" y1="160" x2="140" y2="168"/>
        <line x1="175" y1="160" x2="180" y2="168"/>
      </g>
    </svg>`,
    tags: ['person', 'standing', 'back', 'rear', 'neutral']
  },
  {
    id: 'char_closeup_face',
    name: 'Close-up Face',
    nameKo: '클로즈업 얼굴',
    category: 'character',
    subcategory: 'closeup',
    shotSize: 'CU',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head circle -->
        <circle cx="160" cy="90" r="45"/>
        <!-- Jaw definition -->
        <path d="M 125 115 Q 160 135 195 115" stroke-width="1.2"/>
        <!-- Eyes -->
        <ellipse cx="145" cy="80" rx="6" ry="8"/>
        <ellipse cx="175" cy="80" rx="6" ry="8"/>
        <!-- Pupils -->
        <circle cx="145" cy="82" r="2" fill="currentColor"/>
        <circle cx="175" cy="82" r="2" fill="currentColor"/>
        <!-- Eyebrows -->
        <path d="M 138 72 Q 145 70 152 72" stroke-width="1"/>
        <path d="M 168 72 Q 175 70 182 72" stroke-width="1"/>
        <!-- Nose -->
        <path d="M 160 80 L 160 100" stroke-width="1.2"/>
        <path d="M 157 100 Q 160 102 163 100" stroke-width="1"/>
        <!-- Mouth -->
        <path d="M 145 110 Q 160 118 175 110" stroke-width="1.2"/>
        <!-- Hair -->
        <path d="M 120 55 Q 160 35 200 55" stroke-width="1.5"/>
        <path d="M 125 50 Q 160 42 195 50" stroke-width="1"/>
      </g>
    </svg>`,
    tags: ['person', 'closeup', 'face', 'emotion', 'detail']
  },
  {
    id: 'char_sitting_chair',
    name: 'Sitting on Chair',
    nameKo: '의자에 앉기',
    category: 'character',
    subcategory: 'sitting',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Chair back -->
        <path d="M 110 60 L 110 140" stroke-width="1.2"/>
        <path d="M 140 60 L 140 140" stroke-width="1.2"/>
        <path d="M 110 60 L 140 60" stroke-width="1.2"/>
        <!-- Chair seat -->
        <path d="M 110 110 L 140 110" stroke-width="1.2"/>
        <!-- Head -->
        <ellipse cx="145" cy="45" rx="12" ry="15"/>
        <!-- Torso sitting -->
        <path d="M 138 60 L 135 105 Q 135 110 140 110 L 150 110 Q 155 110 155 105 L 152 60 Q 150 56 145 56 Q 140 56 138 60" fill="currentColor" fill-opacity="0.08"/>
        <!-- Arms -->
        <path d="M 138 70 Q 125 80 120 95" stroke-width="1.3"/>
        <path d="M 152 70 Q 165 80 170 95" stroke-width="1.3"/>
        <!-- Legs folded -->
        <path d="M 140 110 Q 138 130 135 155" stroke-width="1.2"/>
        <path d="M 150 110 Q 152 130 155 155" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="135" y1="155" x2="130" y2="163"/>
        <line x1="155" y1="155" x2="160" y2="163"/>
      </g>
    </svg>`,
    tags: ['person', 'sitting', 'chair', 'seated', 'furniture']
  },
  {
    id: 'char_lying_down',
    name: 'Lying Down',
    nameKo: '누워있기',
    category: 'character',
    subcategory: 'lying',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head on pillow -->
        <ellipse cx="60" cy="70" rx="15" ry="18"/>
        <!-- Pillow -->
        <ellipse cx="55" cy="78" rx="20" ry="12" fill="currentColor" fill-opacity="0.05"/>
        <!-- Torso horizontal -->
        <path d="M 80 65 L 180 60 Q 185 60 185 65 L 185 85 Q 185 90 180 90 L 80 95 Q 75 95 75 90 L 75 65 Q 75 60 80 65" fill="currentColor" fill-opacity="0.08"/>
        <!-- Arms -->
        <path d="M 80 70 L 60 75" stroke-width="1.3"/>
        <path d="M 80 80 L 65 95" stroke-width="1.3"/>
        <!-- Legs -->
        <path d="M 180 70 Q 200 72 215 80" stroke-width="1.2"/>
        <path d="M 180 85 Q 205 88 220 95" stroke-width="1.2"/>
        <!-- Bed line -->
        <line x1="40" y1="100" x2="240" y2="100" stroke-opacity="0.5"/>
      </g>
    </svg>`,
    tags: ['person', 'lying', 'sleeping', 'resting', 'horizontal']
  },
  {
    id: 'char_arms_raised',
    name: 'Arms Raised Celebrating',
    nameKo: '팔 들어 축하하기',
    category: 'character',
    subcategory: 'gesture',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="160" cy="38" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 148 54 L 145 92 Q 145 96 150 96 L 170 96 Q 175 96 175 92 L 172 54 Q 170 50 160 50 Q 150 50 148 54" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 145 54 L 175 54" stroke-width="1.2"/>
        <!-- Left arm raised -->
        <path d="M 148 58 Q 130 35 120 20" stroke-width="1.3"/>
        <path d="M 120 20 L 115 25" stroke-width="1.2"/>
        <!-- Right arm raised -->
        <path d="M 172 58 Q 190 35 200 20" stroke-width="1.3"/>
        <path d="M 200 20 L 205 25" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 150 96 Q 148 125 145 160" stroke-width="1.2"/>
        <path d="M 170 96 Q 172 125 175 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="145" y1="160" x2="140" y2="168"/>
        <line x1="175" y1="160" x2="180" y2="168"/>
      </g>
    </svg>`,
    tags: ['person', 'celebration', 'arms-raised', 'gesture', 'emotion']
  },
  {
    id: 'char_reaching',
    name: 'Reaching Up',
    nameKo: '위로 뻗기',
    category: 'character',
    subcategory: 'gesture',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="160" cy="40" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 148 56 L 145 94 Q 145 98 150 98 L 170 98 Q 175 98 175 94 L 172 56 Q 170 52 160 52 Q 150 52 148 56" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 145 56 L 175 56" stroke-width="1.2"/>
        <!-- Left arm reaching up -->
        <path d="M 148 60 Q 140 40 135 15" stroke-width="1.3"/>
        <!-- Right arm at side -->
        <path d="M 172 60 Q 180 75 185 98" stroke-width="1.3"/>
        <!-- Legs -->
        <path d="M 150 98 Q 148 128 145 160" stroke-width="1.2"/>
        <path d="M 170 98 Q 172 128 175 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="145" y1="160" x2="140" y2="168"/>
        <line x1="175" y1="160" x2="180" y2="168"/>
      </g>
    </svg>`,
    tags: ['person', 'reaching', 'gesture', 'action', 'stretch']
  },
  {
    id: 'char_pointing',
    name: 'Pointing',
    nameKo: '가리키기',
    category: 'character',
    subcategory: 'gesture',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="100" cy="42" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 88 58 L 85 96 Q 85 100 90 100 L 110 100 Q 115 100 115 96 L 112 58 Q 110 54 100 54 Q 90 54 88 58" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 85 58 L 115 58" stroke-width="1.2"/>
        <!-- Left arm pointing right -->
        <path d="M 88 65 L 180 65" stroke-width="1.3"/>
        <path d="M 180 60 L 190 65 L 180 70" stroke-width="1.2"/>
        <!-- Right arm at side -->
        <path d="M 112 65 Q 120 80 125 100" stroke-width="1.3"/>
        <!-- Legs -->
        <path d="M 90 100 Q 88 130 85 160" stroke-width="1.2"/>
        <path d="M 110 100 Q 112 130 115 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="85" y1="160" x2="80" y2="168"/>
        <line x1="115" y1="160" x2="120" y2="168"/>
      </g>
    </svg>`,
    tags: ['person', 'pointing', 'gesture', 'direction', 'action']
  },
  {
    id: 'char_thinking',
    name: 'Thinking Pose',
    nameKo: '생각하기',
    category: 'character',
    subcategory: 'gesture',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="160" cy="42" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 148 58 L 145 96 Q 145 100 150 100 L 170 100 Q 175 100 175 96 L 172 58 Q 170 54 160 54 Q 150 54 148 58" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 145 58 L 175 58" stroke-width="1.2"/>
        <!-- Hand on chin -->
        <path d="M 172 65 Q 185 75 190 90" stroke-width="1.3"/>
        <circle cx="190" cy="100" r="4" fill="currentColor" fill-opacity="0.1"/>
        <!-- Left arm -->
        <path d="M 148 65 Q 135 80 130 100" stroke-width="1.3"/>
        <!-- Legs -->
        <path d="M 150 100 Q 148 130 145 160" stroke-width="1.2"/>
        <path d="M 170 100 Q 172 130 175 160" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="145" y1="160" x2="140" y2="168"/>
        <line x1="175" y1="160" x2="180" y2="168"/>
        <!-- Thought bubble -->
        <circle cx="220" cy="45" r="8" stroke-opacity="0.6"/>
        <circle cx="208" cy="55" r="5" stroke-opacity="0.6"/>
        <circle cx="202" cy="68" r="3" stroke-opacity="0.6"/>
      </g>
    </svg>`,
    tags: ['person', 'thinking', 'emotion', 'contemplation', 'gesture']
  },
  {
    id: 'char_running',
    name: 'Running',
    nameKo: '뛰기',
    category: 'character',
    subcategory: 'motion',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="140" cy="38" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 128 54 L 125 92 Q 125 96 130 96 L 150 96 Q 155 96 155 92 L 152 54 Q 150 50 140 50 Q 130 50 128 54" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 125 54 L 155 54" stroke-width="1.2"/>
        <!-- Left arm forward -->
        <path d="M 128 60 Q 115 45 110 30" stroke-width="1.3"/>
        <!-- Right arm back -->
        <path d="M 152 60 Q 165 75 170 95" stroke-width="1.3"/>
        <!-- Left leg back -->
        <path d="M 130 96 Q 128 120 125 155" stroke-width="1.2"/>
        <!-- Right leg forward -->
        <path d="M 150 96 Q 152 110 155 145" stroke-width="1.2"/>
        <!-- Feet -->
        <line x1="125" y1="155" x2="120" y2="163"/>
        <line x1="155" y1="145" x2="160" y2="153"/>
        <!-- Motion lines -->
        <path d="M 180 80 L 200 80" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.6"/>
        <path d="M 185 90 L 205 90" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.6"/>
      </g>
    </svg>`,
    tags: ['person', 'running', 'motion', 'action', 'speed']
  },
  {
    id: 'char_jumping',
    name: 'Jumping',
    nameKo: '점프하기',
    category: 'character',
    subcategory: 'motion',
    shotSize: 'FS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Head -->
        <ellipse cx="160" cy="35" rx="13" ry="16"/>
        <!-- Torso -->
        <path d="M 148 51 L 145 89 Q 145 93 150 93 L 170 93 Q 175 93 175 89 L 172 51 Q 170 47 160 47 Q 150 47 148 51" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 145 51 L 175 51" stroke-width="1.2"/>
        <!-- Both arms up -->
        <path d="M 148 55 Q 135 35 130 15" stroke-width="1.3"/>
        <path d="M 172 55 Q 185 35 190 15" stroke-width="1.3"/>
        <!-- Legs bent upward -->
        <path d="M 150 93 Q 148 105 150 125" stroke-width="1.2"/>
        <path d="M 170 93 Q 172 105 170 125" stroke-width="1.2"/>
        <!-- Ground reference -->
        <line x1="100" y1="165" x2="220" y2="165" stroke-opacity="0.5"/>
        <!-- Height indicator -->
        <path d="M 210 165 L 210 35" stroke-width="1" stroke-dasharray="2,2" stroke-opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['person', 'jumping', 'motion', 'action', 'airborne']
  },
  {
    id: 'char_twoperson_conversation',
    name: 'Two Person Conversation',
    nameKo: '두 사람 대화',
    category: 'character',
    subcategory: 'group',
    shotSize: 'MS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Person 1 Left -->
        <ellipse cx="80" cy="50" rx="12" ry="15"/>
        <path d="M 70 65 L 68 98 Q 68 102 72 102 L 88 102 Q 92 102 92 98 L 90 65 Q 88 62 80 62 Q 72 62 70 65" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 68 65 L 92 65" stroke-width="1.2"/>
        <path d="M 70 70 Q 55 80 50 98" stroke-width="1.3"/>
        <path d="M 90 70 Q 105 80 110 98" stroke-width="1.3"/>
        <path d="M 72 102 Q 70 130 68 160" stroke-width="1.2"/>
        <path d="M 88 102 Q 90 130 92 160" stroke-width="1.2"/>
        <!-- Person 2 Right -->
        <ellipse cx="240" cy="50" rx="12" ry="15"/>
        <path d="M 230 65 L 228 98 Q 228 102 232 102 L 248 102 Q 252 102 252 98 L 250 65 Q 248 62 240 62 Q 232 62 230 65" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 228 65 L 252 65" stroke-width="1.2"/>
        <path d="M 230 70 Q 215 80 210 98" stroke-width="1.3"/>
        <path d="M 250 70 Q 265 80 270 98" stroke-width="1.3"/>
        <path d="M 232 102 Q 230 130 228 160" stroke-width="1.2"/>
        <path d="M 248 102 Q 250 130 252 160" stroke-width="1.2"/>
        <!-- Connection line showing interaction -->
        <path d="M 110 85 L 210 85" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['people', 'conversation', 'interaction', 'group', 'dialogue']
  },
  {
    id: 'char_three_group',
    name: 'Group of Three',
    nameKo: '세 명 그룹',
    category: 'character',
    subcategory: 'group',
    shotSize: 'WS',
    cameraAngle: 'eye-level',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Center person (tallest) -->
        <ellipse cx="160" cy="45" rx="12" ry="15"/>
        <path d="M 150 60 L 148 95 Q 148 99 152 99 L 168 99 Q 172 99 172 95 L 170 60 Q 168 57 160 57 Q 152 57 150 60" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 148 60 L 172 60" stroke-width="1.2"/>
        <path d="M 150 65 Q 135 78 130 99" stroke-width="1.3"/>
        <path d="M 170 65 Q 185 78 190 99" stroke-width="1.3"/>
        <path d="M 152 99 Q 150 130 148 160" stroke-width="1.2"/>
        <path d="M 168 99 Q 170 130 172 160" stroke-width="1.2"/>
        <!-- Left person -->
        <ellipse cx="100" cy="52" rx="11" ry="14"/>
        <path d="M 91 66 L 89 98 Q 89 102 93 102 L 107 102 Q 111 102 111 98 L 109 66 Q 107 63 100 63 Q 93 63 91 66" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 89 66 L 111 66" stroke-width="1.2"/>
        <path d="M 91 71 Q 75 85 70 102" stroke-width="1.2"/>
        <path d="M 109 71 Q 120 82 125 102" stroke-width="1.2"/>
        <path d="M 93 102 Q 91 130 89 160" stroke-width="1.2"/>
        <!-- Right person -->
        <ellipse cx="220" cy="52" rx="11" ry="14"/>
        <path d="M 211 66 L 209 98 Q 209 102 213 102 L 227 102 Q 231 102 231 98 L 229 66 Q 227 63 220 63 Q 213 63 211 66" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 209 66 L 231 66" stroke-width="1.2"/>
        <path d="M 211 71 Q 195 85 190 102" stroke-width="1.2"/>
        <path d="M 229 71 Q 240 82 245 102" stroke-width="1.2"/>
        <path d="M 213 102 Q 211 130 209 160" stroke-width="1.2"/>
      </g>
    </svg>`,
    tags: ['people', 'group', 'crowd', 'ensemble', 'multiple']
  }
];

// BACKGROUND SKETCHES
const backgroundSketches: SketchRef[] = [
  {
    id: 'bg_office_interior',
    name: 'Office Interior',
    nameKo: '사무실 내부',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Perspective lines -->
        <line x1="160" y1="30" x2="100" y2="150" stroke-opacity="0.3"/>
        <line x1="160" y1="30" x2="220" y2="150" stroke-opacity="0.3"/>
        <!-- Back wall -->
        <rect x="60" y="30" width="200" height="110" fill="currentColor" fill-opacity="0.03"/>
        <!-- Window -->
        <rect x="100" y="45" width="60" height="50" fill="currentColor" fill-opacity="0.06"/>
        <line x1="130" y1="45" x2="130" y2="95" stroke-opacity="0.5"/>
        <line x1="100" y1="70" x2="160" y2="70" stroke-opacity="0.5"/>
        <!-- Desk -->
        <path d="M 70 140 L 85 125 L 235 125 L 250 140" fill="currentColor" fill-opacity="0.05"/>
        <line x1="70" y1="140" x2="250" y2="140" stroke-width="1.3"/>
        <!-- Desk legs -->
        <line x1="85" y1="125" x2="85" y2="150"/>
        <line x1="235" y1="125" x2="235" y2="150"/>
        <!-- Computer monitor -->
        <rect x="155" y="100" width="30" height="25" fill="currentColor" fill-opacity="0.05"/>
        <line x1="170" y1="100" x2="170" y2="125"/>
        <!-- Chair back -->
        <path d="M 120 100 Q 120 75 140 75 Q 160 75 160 100" fill="currentColor" fill-opacity="0.05"/>
        <!-- Shelf on wall -->
        <line x1="220" y1="50" x2="240" y2="50" stroke-width="1.3"/>
        <line x1="220" y1="65" x2="240" y2="65" stroke-width="1.3"/>
        <line x1="220" y1="80" x2="240" y2="80" stroke-width="1.3"/>
      </g>
    </svg>`,
    tags: ['interior', 'office', 'workplace', 'desk', 'professional']
  },
  {
    id: 'bg_living_room',
    name: 'Living Room',
    nameKo: '거실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Fireplace -->
        <rect x="60" y="80" width="50" height="60" fill="currentColor" fill-opacity="0.04"/>
        <rect x="70" y="95" width="30" height="35" stroke-width="1.3"/>
        <!-- Mantle shelf -->
        <line x1="60" y1="80" x2="110" y2="80" stroke-width="1.3"/>
        <!-- Couch -->
        <path d="M 150 140 L 150 100 L 260 100 L 260 140" fill="currentColor" fill-opacity="0.06"/>
        <line x1="150" y1="100" x2="260" y2="100" stroke-width="1.3"/>
        <!-- Couch back pillow -->
        <ellipse cx="205" cy="92" rx="40" ry="10" fill="currentColor" fill-opacity="0.04"/>
        <!-- Coffee table -->
        <rect x="140" y="135" width="50" height="35" fill="currentColor" fill-opacity="0.05"/>
        <line x1="140" y1="145" x2="190" y2="145" stroke-opacity="0.5"/>
        <!-- Rug -->
        <ellipse cx="160" cy="155" rx="70" ry="25" fill="currentColor" fill-opacity="0.03"/>
        <!-- TV on wall -->
        <rect x="230" y="45" width="50" height="35" fill="currentColor" fill-opacity="0.05"/>
      </g>
    </svg>`,
    tags: ['interior', 'living-room', 'home', 'furniture', 'domestic']
  },
  {
    id: 'bg_bedroom',
    name: 'Bedroom',
    nameKo: '침실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back wall -->
        <rect x="30" y="20" width="260" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Bed -->
        <path d="M 50 100 L 50 140 L 200 140 L 200 100 Q 200 85 180 85 L 70 85 Q 50 85 50 100" fill="currentColor" fill-opacity="0.06"/>
        <!-- Bed frame -->
        <line x1="50" y1="100" x2="200" y2="100" stroke-width="1.3"/>
        <!-- Pillows -->
        <ellipse cx="90" cy="92" rx="15" ry="12" fill="currentColor" fill-opacity="0.05"/>
        <ellipse cx="130" cy="90" rx="18" ry="14" fill="currentColor" fill-opacity="0.05"/>
        <!-- Nightstand -->
        <rect x="210" y="105" width="35" height="35" fill="currentColor" fill-opacity="0.05"/>
        <line x1="210" y1="115" x2="245" y2="115" stroke-opacity="0.5"/>
        <!-- Lamp on nightstand -->
        <circle cx="227" cy="100" r="5" fill="currentColor" fill-opacity="0.05"/>
        <line x1="227" y1="105" x2="227" y2="115"/>
        <!-- Window -->
        <rect x="80" y="25" width="50" height="45" fill="currentColor" fill-opacity="0.06"/>
        <line x1="105" y1="25" x2="105" y2="70" stroke-opacity="0.5"/>
        <line x1="80" y1="47" x2="130" y2="47" stroke-opacity="0.5"/>
        <!-- Door -->
        <rect x="240" y="40" width="35" height="70" fill="currentColor" fill-opacity="0.03"/>
        <circle cx="273" cy="75" r="3" fill="currentColor"/>
      </g>
    </svg>`,
    tags: ['interior', 'bedroom', 'home', 'sleeping', 'furniture']
  },
  {
    id: 'bg_kitchen',
    name: 'Kitchen',
    nameKo: '주방',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Cabinetry -->
        <rect x="40" y="30" width="100" height="95" fill="currentColor" fill-opacity="0.04"/>
        <!-- Cabinet doors -->
        <rect x="45" y="35" width="45" height="40" stroke-opacity="0.6"/>
        <rect x="95" y="35" width="45" height="40" stroke-opacity="0.6"/>
        <rect x="45" y="80" width="45" height="40" stroke-opacity="0.6"/>
        <rect x="95" y="80" width="45" height="40" stroke-opacity="0.6"/>
        <!-- Stove -->
        <rect x="160" y="50" width="40" height="40" fill="currentColor" fill-opacity="0.05"/>
        <!-- Burners -->
        <circle cx="168" cy="58" r="4" fill="currentColor" fill-opacity="0.05"/>
        <circle cx="188" cy="58" r="4" fill="currentColor" fill-opacity="0.05"/>
        <circle cx="168" cy="78" r="4" fill="currentColor" fill-opacity="0.05"/>
        <circle cx="188" cy="78" r="4" fill="currentColor" fill-opacity="0.05"/>
        <!-- Counter -->
        <path d="M 40 125 L 280 130" stroke-width="1.3"/>
        <!-- Sink -->
        <rect x="210" y="95" width="35" height="25" fill="currentColor" fill-opacity="0.06"/>
        <line x1="220" y1="95" x2="220" y2="120" stroke-opacity="0.5"/>
        <!-- Window -->
        <rect x="255" y="35" width="35" height="40" fill="currentColor" fill-opacity="0.06"/>
      </g>
    </svg>`,
    tags: ['interior', 'kitchen', 'home', 'cooking', 'appliances']
  },
  {
    id: 'bg_bathroom',
    name: 'Bathroom',
    nameKo: '욕실',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Mirror -->
        <rect x="60" y="30" width="60" height="70" fill="currentColor" fill-opacity="0.05"/>
        <!-- Sink counter -->
        <rect x="50" y="105" width="80" height="35" fill="currentColor" fill-opacity="0.05"/>
        <!-- Sink basin -->
        <ellipse cx="90" cy="115" rx="20" ry="15" fill="currentColor" fill-opacity="0.06"/>
        <!-- Faucet -->
        <path d="M 90 100 L 90 110" stroke-width="1.3"/>
        <!-- Toilet -->
        <ellipse cx="180" cy="120" rx="25" ry="30" fill="currentColor" fill-opacity="0.05"/>
        <path d="M 160 95 L 160 85 L 200 85 L 200 95" fill="currentColor" fill-opacity="0.04"/>
        <!-- Bathtub -->
        <path d="M 220 105 L 220 145 Q 220 150 225 150 L 275 150 Q 280 150 280 145 L 280 105" fill="currentColor" fill-opacity="0.05"/>
        <line x1="220" y1="105" x2="280" y2="105" stroke-width="1.3"/>
        <!-- Towel rack -->
        <line x1="210" y1="60" x2="210" y2="75"/>
        <line x1="205" y1="65" x2="215" y2="65" stroke-width="1.2"/>
      </g>
    </svg>`,
    tags: ['interior', 'bathroom', 'home', 'sanitary', 'fixtures']
  },
  {
    id: 'bg_exterior_street',
    name: 'Exterior Street',
    nameKo: '외부 거리',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <rect x="40" y="20" width="240" height="60" fill="currentColor" fill-opacity="0.02"/>
        <!-- Buildings left -->
        <rect x="40" y="45" width="70" height="95" fill="currentColor" fill-opacity="0.04"/>
        <rect x="50" y="55" width="15" height="20" stroke-opacity="0.6"/>
        <rect x="70" y="55" width="15" height="20" stroke-opacity="0.6"/>
        <rect x="50" y="80" width="15" height="20" stroke-opacity="0.6"/>
        <rect x="70" y="80" width="15" height="20" stroke-opacity="0.6"/>
        <rect x="50" y="105" width="15" height="20" stroke-opacity="0.6"/>
        <rect x="70" y="105" width="15" height="20" stroke-opacity="0.6"/>
        <!-- Building center -->
        <rect x="145" y="30" width="60" height="110" fill="currentColor" fill-opacity="0.04"/>
        <!-- Windows center building -->
        <rect x="155" y="40" width="10" height="10" stroke-opacity="0.6"/>
        <rect x="170" y="40" width="10" height="10" stroke-opacity="0.6"/>
        <rect x="185" y="40" width="10" height="10" stroke-opacity="0.6"/>
        <!-- Door -->
        <rect x="170" y="125" width="20" height="15" stroke-opacity="0.6"/>
        <!-- Building right -->
        <rect x="240" y="60" width="50" height="80" fill="currentColor" fill-opacity="0.04"/>
        <!-- Street -->
        <path d="M 40 140 L 280 140" stroke-width="1.3"/>
        <!-- Road markings -->
        <line x1="100" y1="145" x2="120" y2="145" stroke-dasharray="3,3" stroke-opacity="0.4"/>
        <line x1="150" y1="145" x2="170" y2="145" stroke-dasharray="3,3" stroke-opacity="0.4"/>
        <line x1="200" y1="145" x2="220" y2="145" stroke-dasharray="3,3" stroke-opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['exterior', 'street', 'urban', 'buildings', 'outdoor']
  },
  {
    id: 'bg_park',
    name: 'Park',
    nameKo: '공원',
    category: 'background',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <rect x="40" y="20" width="240" height="70" fill="currentColor" fill-opacity="0.02"/>
        <!-- Grass -->
        <path d="M 40 90 L 280 90" stroke-width="1.3" stroke-opacity="0.5"/>
        <!-- Tree left -->
        <path d="M 80 50 L 80 95" stroke-width="2"/>
        <circle cx="80" cy="45" r="20" fill="currentColor" fill-opacity="0.05"/>
        <path d="M 65 70 Q 70 75 75 70" stroke-opacity="0.6"/>
        <!-- Tree right -->
        <path d="M 240" y1="55" x2="240" y2="100" stroke-width="2"/>
        <circle cx="240" cy="50" r="18" fill="currentColor" fill-opacity="0.05"/>
        <!-- Bench -->
        <rect x="150" y="110" width="60" height="8" fill="currentColor" fill-opacity="0.05"/>
        <line x1="160" y1="118" x2="160" y2="135" stroke-width="1.2"/>
        <line x1="200" y1="118" x2="200" y2="135" stroke-width="1.2"/>
        <!-- Path -->
        <path d="M 120 95 L 200 140" stroke-width="2" stroke-opacity="0.4"/>
        <!-- Flowers -->
        <circle cx="120" cy="85" r="3" stroke-opacity="0.6"/>
        <circle cx="220" cy="80" r="3" stroke-opacity="0.6"/>
      </g>
    </svg>`,
    tags: ['exterior', 'park', 'nature', 'outdoor', 'trees', 'green']
  },
  {
    id: 'bg_coffee_shop',
    name: 'Coffee Shop',
    nameKo: '카페',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Counter with shelves -->
        <line x1="40" y1="130" x2="150" y2="130" stroke-width="1.3"/>
        <line x1="40" y1="100" x2="150" y2="100" stroke-opacity="0.5"/>
        <line x1="40" y1="70" x2="150" y2="70" stroke-opacity="0.5"/>
        <!-- Coffee equipment symbols -->
        <circle cx="70" cy="60" r="8" fill="currentColor" fill-opacity="0.05"/>
        <circle cx="100" cy="60" r="8" fill="currentColor" fill-opacity="0.05"/>
        <!-- Tables -->
        <circle cx="200" cy="100" r="20" fill="currentColor" fill-opacity="0.05"/>
        <line x1="200" y1="120" x2="200" y2="140" stroke-width="1.2"/>
        <circle cx="260" cy="110" r="18" fill="currentColor" fill-opacity="0.05"/>
        <line x1="260" y1="128" x2="260" y2="145" stroke-width="1.2"/>
        <!-- Chairs around tables -->
        <circle cx="180" cy="90" r="5" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="220" cy="90" r="5" fill="currentColor" fill-opacity="0.06"/>
        <!-- Window -->
        <rect x="240" y="25" width="50" height="50" fill="currentColor" fill-opacity="0.06"/>
      </g>
    </svg>`,
    tags: ['interior', 'cafe', 'coffee', 'commercial', 'dining']
  },
  {
    id: 'bg_store',
    name: 'Store/Retail',
    nameKo: '상점',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Display shelves left -->
        <line x1="50" y1="50" x2="110" y2="50" stroke-width="1.3"/>
        <line x1="50" y1="75" x2="110" y2="75" stroke-width="1.3"/>
        <line x1="50" y1="100" x2="110" y2="100" stroke-width="1.3"/>
        <line x1="50" y1="125" x2="110" y2="125" stroke-width="1.3"/>
        <!-- Shelf supports -->
        <line x1="50" y1="30" x2="50" y2="130" stroke-width="1.2"/>
        <line x1="110" y1="30" x2="110" y2="130" stroke-width="1.2"/>
        <!-- Products on shelves -->
        <rect x="55" y="45" width="8" height="8" stroke-opacity="0.6"/>
        <rect x="70" y="45" width="8" height="8" stroke-opacity="0.6"/>
        <rect x="85" y="45" width="8" height="8" stroke-opacity="0.6"/>
        <!-- Display shelves right -->
        <line x1="210" y1="60" x2="270" y2="60" stroke-width="1.3"/>
        <line x1="210" y1="85" x2="270" y2="85" stroke-width="1.3"/>
        <line x1="210" y1="110" x2="270" y2="110" stroke-width="1.3"/>
        <line x1="210" y1="35" x2="210" y2="120" stroke-width="1.2"/>
        <line x1="270" y1="35" x2="270" y2="120" stroke-width="1.2"/>
        <!-- Counter -->
        <path d="M 140 130 L 200 130" stroke-width="1.3"/>
        <!-- Cash register -->
        <rect x="160" y="110" width="30" height="20" fill="currentColor" fill-opacity="0.05"/>
      </g>
    </svg>`,
    tags: ['interior', 'store', 'retail', 'shopping', 'commercial']
  },
  {
    id: 'bg_restaurant',
    name: 'Restaurant',
    nameKo: '식당',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wall -->
        <rect x="40" y="20" width="240" height="130" fill="currentColor" fill-opacity="0.02"/>
        <!-- Table 1 -->
        <rect x="60" y="80" width="50" height="35" fill="currentColor" fill-opacity="0.05"/>
        <line x1="65" y1="95" x2="105" y2="95" stroke-opacity="0.5"/>
        <circle cx="75" cy="90" r="4" fill="currentColor" fill-opacity="0.04"/>
        <!-- Table 2 -->
        <rect x="190" y="85" width="50" height="35" fill="currentColor" fill-opacity="0.05"/>
        <line x1="195" y1="100" x2="235" y2="100" stroke-opacity="0.5"/>
        <!-- Chairs -->
        <circle cx="55" cy="100" r="6" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="115" cy="100" r="6" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="180" cy="110" r="6" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="240" cy="110" r="6" fill="currentColor" fill-opacity="0.06"/>
        <!-- Kitchen area -->
        <rect x="50" y="25" width="80" height="40" fill="currentColor" fill-opacity="0.04"/>
        <!-- Counter top -->
        <line x1="50" y1="50" x2="130" y2="50" stroke-width="1.3"/>
        <!-- Entrance -->
        <rect x="260" y="80" width="25" height="50" fill="currentColor" fill-opacity="0.03"/>
      </g>
    </svg>`,
    tags: ['interior', 'restaurant', 'dining', 'furniture', 'commercial']
  },
  {
    id: 'bg_cinema_theater',
    name: 'Cinema/Theater',
    nameKo: '영화관',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Screen -->
        <rect x="80" y="15" width="160" height="50" fill="currentColor" fill-opacity="0.08"/>
        <line x1="90" y1="25" x2="230" y2="25" stroke-opacity="0.5"/>
        <line x1="90" y1="40" x2="230" y2="40" stroke-opacity="0.5"/>
        <!-- Audience area -->
        <!-- Seats row 1 -->
        <circle cx="100" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="120" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="140" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="160" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="180" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="200" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="220" cy="90" r="4" fill="currentColor" fill-opacity="0.06"/>
        <!-- Seats row 2 -->
        <circle cx="100" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="120" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="140" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="160" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="180" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="200" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="220" cy="115" r="4" fill="currentColor" fill-opacity="0.06"/>
        <!-- Aisle -->
        <line x1="160" y1="85" x2="160" y2="145" stroke-opacity="0.4" stroke-width="1.5"/>
      </g>
    </svg>`,
    tags: ['interior', 'cinema', 'theater', 'entertainment', 'seats']
  },
  {
    id: 'bg_library',
    name: 'Library',
    nameKo: '도서관',
    category: 'background',
    subcategory: 'interior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bookshelves - left -->
        <rect x="40" y="30" width="50" height="110" fill="currentColor" fill-opacity="0.04"/>
        <line x1="40" y1="45" x2="90" y2="45" stroke-opacity="0.6"/>
        <line x1="40" y1="60" x2="90" y2="60" stroke-opacity="0.6"/>
        <line x1="40" y1="75" x2="90" y2="75" stroke-opacity="0.6"/>
        <line x1="40" y1="90" x2="90" y2="90" stroke-opacity="0.6"/>
        <line x1="40" y1="105" x2="90" y2="105" stroke-opacity="0.6"/>
        <!-- Book symbols -->
        <rect x="42" y="46" width="3" height="12" stroke-opacity="0.6"/>
        <rect x="48" y="46" width="3" height="12" stroke-opacity="0.6"/>
        <rect x="54" y="46" width="3" height="12" stroke-opacity="0.6"/>
        <!-- Bookshelves - center -->
        <rect x="135" y="30" width="50" height="110" fill="currentColor" fill-opacity="0.04"/>
        <line x1="135" y1="45" x2="185" y2="45" stroke-opacity="0.6"/>
        <line x1="135" y1="60" x2="185" y2="60" stroke-opacity="0.6"/>
        <line x1="135" y1="75" x2="185" y2="75" stroke-opacity="0.6"/>
        <line x1="135" y1="90" x2="185" y2="90" stroke-opacity="0.6"/>
        <line x1="135" y1="105" x2="185" y2="105" stroke-opacity="0.6"/>
        <!-- Bookshelves - right -->
        <rect x="230" y="30" width="50" height="110" fill="currentColor" fill-opacity="0.04"/>
        <line x1="230" y1="45" x2="280" y2="45" stroke-opacity="0.6"/>
        <line x1="230" y1="60" x2="280" y2="60" stroke-opacity="0.6"/>
        <line x1="230" y1="75" x2="280" y2="75" stroke-opacity="0.6"/>
        <line x1="230" y1="90" x2="280" y2="90" stroke-opacity="0.6"/>
        <line x1="230" y1="105" x2="280" y2="105" stroke-opacity="0.6"/>
        <!-- Reading table -->
        <rect x="110" y="115" width="70" height="25" fill="currentColor" fill-opacity="0.05"/>
      </g>
    </svg>`,
    tags: ['interior', 'library', 'books', 'knowledge', 'study']
  }
];

// COMBINED SKETCHES (Characters in environments)
const combinedSketches: SketchRef[] = [
  {
    id: 'combined_office_desk',
    name: 'Person at Office Desk',
    nameKo: '사무실 책상의 사람',
    category: 'combined',
    subcategory: 'work',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Desk -->
        <path d="M 80 110 L 80 125 Q 80 130 85 130 L 235 130 Q 240 130 240 125 L 240 110" stroke-width="1.3" fill="currentColor" fill-opacity="0.05"/>
        <line x1="80" y1="110" x2="240" y2="110" stroke-width="1.3"/>
        <!-- Monitor -->
        <rect x="160" y="75" width="35" height="30" fill="currentColor" fill-opacity="0.05"/>
        <!-- Keyboard -->
        <rect x="145" y="115" width="65" height="10" fill="currentColor" fill-opacity="0.04"/>
        <!-- Person sitting -->
        <ellipse cx="110" cy="50" rx="11" ry="14"/>
        <path d="M 100 64 L 98 105 Q 98 109 102 109 L 118 109 Q 122 109 122 105 L 120 64 Q 118 61 110 61 Q 102 61 100 64" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 98 64 L 122 64" stroke-width="1.2"/>
        <!-- Arms typing position -->
        <path d="M 100 70 Q 90 85 85 105" stroke-width="1.2"/>
        <path d="M 120 70 Q 130 85 135 105" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 102 109 Q 100 120 98 130" stroke-width="1.2"/>
        <path d="M 118 109 Q 120 120 122 130" stroke-width="1.2"/>
        <!-- Chair back -->
        <path d="M 95 60 Q 95 45 115 45 Q 135 45 135 60" fill="currentColor" fill-opacity="0.04"/>
      </g>
    </svg>`,
    tags: ['combined', 'office', 'work', 'computer', 'professional']
  },
  {
    id: 'combined_living_sofa',
    name: 'Person on Sofa',
    nameKo: '소파의 사람',
    category: 'combined',
    subcategory: 'home',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sofa back -->
        <path d="M 80 75 Q 80 45 160 40 Q 240 45 240 75" fill="currentColor" fill-opacity="0.05" stroke-width="1.3"/>
        <!-- Sofa seat -->
        <path d="M 80 75 L 80 135 Q 80 140 85 140 L 235 140 Q 240 140 240 135 L 240 75" fill="currentColor" fill-opacity="0.05" stroke-width="1.3"/>
        <!-- Armrest right -->
        <path d="M 235 75 L 250 80 L 250 135" stroke-width="1.3"/>
        <!-- Person sitting relaxed -->
        <ellipse cx="160" cy="55" rx="12" ry="15"/>
        <path d="M 150 70 L 148 108 Q 148 112 152 112 L 168 112 Q 172 112 172 108 L 170 70 Q 168 67 160 67 Q 152 67 150 70" fill="currentColor" fill-opacity="0.08"/>
        <!-- Arms relaxed -->
        <path d="M 150 75 Q 140 90 138 120" stroke-width="1.2"/>
        <path d="M 170 75 Q 180 90 182 120" stroke-width="1.2"/>
        <!-- Legs on sofa -->
        <path d="M 152 112 Q 150 125 148 135" stroke-width="1.2"/>
        <path d="M 168 112 Q 170 125 172 135" stroke-width="1.2"/>
        <!-- Pillow -->
        <ellipse cx="175" cy="80" rx="20" ry="15" fill="currentColor" fill-opacity="0.04"/>
      </g>
    </svg>`,
    tags: ['combined', 'home', 'sofa', 'relaxing', 'domestic']
  },
  {
    id: 'combined_walking_outside',
    name: 'Person Walking Outside',
    nameKo: '밖에서 걷기',
    category: 'combined',
    subcategory: 'exterior',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sky -->
        <rect x="40" y="20" width="240" height="60" fill="currentColor" fill-opacity="0.01"/>
        <!-- Building in background -->
        <rect x="200" y="40" width="60" height="70" fill="currentColor" fill-opacity="0.03"/>
        <line x1="210" y1="50" x2="210" y2="105" stroke-opacity="0.4"/>
        <!-- Street ground -->
        <path d="M 40 90 L 280 90" stroke-width="1.3" stroke-opacity="0.5"/>
        <!-- Person walking -->
        <ellipse cx="120" cy="45" rx="12" ry="15"/>
        <path d="M 110 60 L 108 88 Q 108 92 112 92 L 128 92 Q 132 92 132 88 L 130 60 Q 128 57 120 57 Q 112 57 110 60" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 108 60 L 132 60" stroke-width="1.2"/>
        <!-- Walking arms -->
        <path d="M 110 65 Q 95 75 90 90" stroke-width="1.2"/>
        <path d="M 130 65 Q 145 75 150 90" stroke-width="1.2"/>
        <!-- Walking legs -->
        <path d="M 112 92 Q 110 110 108 135" stroke-width="1.2"/>
        <path d="M 128 92 Q 130 110 132 135" stroke-width="1.2"/>
        <!-- Motion lines -->
        <path d="M 160 80 L 180 80" stroke-width="1.2" stroke-dasharray="2,2" opacity="0.5"/>
      </g>
    </svg>`,
    tags: ['combined', 'exterior', 'walking', 'street', 'urban']
  },
  {
    id: 'combined_cooking_kitchen',
    name: 'Person Cooking',
    nameKo: '요리하는 사람',
    category: 'combined',
    subcategory: 'home',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Counter -->
        <path d="M 50 120 L 50 135 Q 50 140 55 140 L 220 140 Q 225 140 225 135 L 225 120" stroke-width="1.3" fill="currentColor" fill-opacity="0.05"/>
        <line x1="50" y1="120" x2="225" y2="120" stroke-width="1.3"/>
        <!-- Stove -->
        <rect x="140" y="85" width="35" height="35" fill="currentColor" fill-opacity="0.05"/>
        <!-- Burners -->
        <circle cx="148" cy="93" r="3" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="165" cy="93" r="3" fill="currentColor" fill-opacity="0.06"/>
        <!-- Person cooking -->
        <ellipse cx="100" cy="50" rx="11" ry="14"/>
        <path d="M 90 64 L 88 108 Q 88 112 92 112 L 108 112 Q 112 112 112 108 L 110 64 Q 108 61 100 61 Q 92 61 90 64" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 88 64 L 112 64" stroke-width="1.2"/>
        <!-- Arm holding pan -->
        <path d="M 90 70 Q 70 80 65 100" stroke-width="1.2"/>
        <!-- Other arm up -->
        <path d="M 110 70 Q 130 65 135 55" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 92 112 Q 90 125 88 140" stroke-width="1.2"/>
        <path d="M 108 112 Q 110 125 112 140" stroke-width="1.2"/>
        <!-- Pan -->
        <ellipse cx="60" cy="100" rx="15" ry="8" fill="currentColor" fill-opacity="0.04"/>
        <path d="M 45 100 L 35 100" stroke-width="1.2"/>
      </g>
    </svg>`,
    tags: ['combined', 'home', 'cooking', 'kitchen', 'action']
  },
  {
    id: 'combined_shopping_cart',
    name: 'Person Shopping',
    nameKo: '쇼핑하는 사람',
    category: 'combined',
    subcategory: 'commercial',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Shelves in background -->
        <line x1="240" y1="50" x2="280" y2="50" stroke-width="1.3" stroke-opacity="0.5"/>
        <line x1="240" y1="70" x2="280" y2="70" stroke-width="1.3" stroke-opacity="0.5"/>
        <line x1="240" y1="90" x2="280" y2="90" stroke-width="1.3" stroke-opacity="0.5"/>
        <!-- Shopping cart -->
        <path d="M 150 130 L 150 85 L 195 85 L 200 130" fill="currentColor" fill-opacity="0.05" stroke-width="1.3"/>
        <path d="M 150 130 L 200 130" stroke-width="1.3"/>
        <!-- Cart wheels -->
        <circle cx="160" cy="140" r="4" fill="currentColor" fill-opacity="0.05"/>
        <circle cx="190" cy="140" r="4" fill="currentColor" fill-opacity="0.05"/>
        <!-- Handle -->
        <path d="M 155 85 Q 155 70 175 70" stroke-width="1.3"/>
        <!-- Person pushing cart -->
        <ellipse cx="120" cy="45" rx="11" ry="14"/>
        <path d="M 110 60 L 108 88 Q 108 92 112 92 L 128 92 Q 132 92 132 88 L 130 60 Q 128 57 120 57 Q 112 57 110 60" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 108 60 L 132 60" stroke-width="1.2"/>
        <!-- Arm on handle -->
        <path d="M 130 65 Q 145 70 155 72" stroke-width="1.2"/>
        <!-- Other arm -->
        <path d="M 110 65 Q 100 75 95 92" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 112 92 Q 110 110 108 135" stroke-width="1.2"/>
        <path d="M 128 92 Q 130 110 132 135" stroke-width="1.2"/>
      </g>
    </svg>`,
    tags: ['combined', 'shopping', 'commercial', 'retail', 'action']
  },
  {
    id: 'combined_reading_library',
    name: 'Person Reading in Library',
    nameKo: '도서관에서 읽기',
    category: 'combined',
    subcategory: 'study',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bookshelves in background -->
        <rect x="200" y="35" width="60" height="95" fill="currentColor" fill-opacity="0.03"/>
        <line x1="200" y1="55" x2="260" y2="55" stroke-opacity="0.5"/>
        <line x1="200" y1="75" x2="260" y2="75" stroke-opacity="0.5"/>
        <line x1="200" y1="95" x2="260" y2="95" stroke-opacity="0.5"/>
        <!-- Books on shelves -->
        <rect x="205" y="50" width="4" height="8" stroke-opacity="0.6"/>
        <rect x="215" y="50" width="4" height="8" stroke-opacity="0.6"/>
        <!-- Table -->
        <rect x="70" y="110" width="60" height="30" fill="currentColor" fill-opacity="0.05"/>
        <line x1="70" y1="120" x2="130" y2="120" stroke-opacity="0.5"/>
        <!-- Person sitting at table -->
        <ellipse cx="110" cy="55" rx="11" ry="14"/>
        <path d="M 100 69 L 98 105 Q 98 109 102 109 L 118 109 Q 122 109 122 105 L 120 69 Q 118 66 110 66 Q 102 66 100 69" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 98 69 L 122 69" stroke-width="1.2"/>
        <!-- Arms reading -->
        <path d="M 100 75 Q 90 85 85 105" stroke-width="1.2"/>
        <path d="M 120 75 Q 130 85 135 105" stroke-width="1.2"/>
        <!-- Legs under table -->
        <path d="M 102 109 Q 100 120 98 135" stroke-width="1.2"/>
        <path d="M 118 109 Q 120 120 122 135" stroke-width="1.2"/>
        <!-- Book on table -->
        <rect x="125" y="105" width="20" height="15" fill="currentColor" fill-opacity="0.06" transform="rotate(-15 135 112)"/>
      </g>
    </svg>`,
    tags: ['combined', 'study', 'library', 'reading', 'learning']
  },
  {
    id: 'combined_restaurant_eating',
    name: 'Person Eating',
    nameKo: '식사하는 사람',
    category: 'combined',
    subcategory: 'dining',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Table -->
        <rect x="80" y="110" width="70" height="30" fill="currentColor" fill-opacity="0.05"/>
        <line x1="80" y1="120" x2="150" y2="120" stroke-opacity="0.5"/>
        <!-- Place settings -->
        <circle cx="110" cy="110" r="12" fill="currentColor" fill-opacity="0.04"/>
        <path d="M 95 120 L 125 120" stroke-width="1.2" stroke-opacity="0.5"/>
        <!-- Fork -->
        <path d="M 90 118 L 90 105" stroke-width="1" stroke-opacity="0.5"/>
        <!-- Person at table -->
        <ellipse cx="115" cy="55" rx="11" ry="14"/>
        <path d="M 105 69 L 103 105 Q 103 109 107 109 L 123 109 Q 127 109 127 105 L 125 69 Q 123 66 115 66 Q 107 66 105 69" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 103 69 L 127 69" stroke-width="1.2"/>
        <!-- Arms eating -->
        <path d="M 105 75 Q 90 90 88 110" stroke-width="1.2"/>
        <path d="M 125 75 Q 140 90 142 110" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 107 109 Q 105 125 103 140" stroke-width="1.2"/>
        <path d="M 123 109 Q 125 125 127 140" stroke-width="1.2"/>
        <!-- Chair back -->
        <path d="M 100 65 Q 100 50 130 50 Q 140 50 140 65" fill="currentColor" fill-opacity="0.03"/>
      </g>
    </svg>`,
    tags: ['combined', 'dining', 'eating', 'restaurant', 'action']
  },
  {
    id: 'combined_phone_conversation',
    name: 'Person on Phone',
    nameKo: '전화하는 사람',
    category: 'combined',
    subcategory: 'interaction',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Window in background -->
        <rect x="200" y="35" width="60" height="60" fill="currentColor" fill-opacity="0.04"/>
        <line x1="230" y1="35" x2="230" y2="95" stroke-opacity="0.5"/>
        <line x1="200" y1="65" x2="260" y2="65" stroke-opacity="0.5"/>
        <!-- Person -->
        <ellipse cx="110" cy="48" rx="11" ry="14"/>
        <path d="M 100 62 L 98 100 Q 98 104 102 104 L 118 104 Q 122 104 122 100 L 120 62 Q 118 59 110 59 Q 102 59 100 62" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 98 62 L 122 62" stroke-width="1.2"/>
        <!-- Arm holding phone -->
        <path d="M 120 68 Q 135 65 145 70" stroke-width="1.2"/>
        <!-- Phone -->
        <rect x="140" y="65" width="15" height="25" fill="currentColor" fill-opacity="0.06" rx="2"/>
        <!-- Other arm relaxed -->
        <path d="M 100 68 Q 85 80 80 100" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 102 104 Q 100 120 98 140" stroke-width="1.2"/>
        <path d="M 118 104 Q 120 120 122 140" stroke-width="1.2"/>
        <!-- Sound waves from phone -->
        <path d="M 155 68 Q 165 65 170 75" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="2,2"/>
      </g>
    </svg>`,
    tags: ['combined', 'communication', 'phone', 'interaction', 'technology']
  },
  {
    id: 'combined_meeting_two',
    name: 'Two People Meeting',
    nameKo: '두 사람 회의',
    category: 'combined',
    subcategory: 'interaction',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Table -->
        <rect x="110" y="105" width="60" height="25" fill="currentColor" fill-opacity="0.05"/>
        <line x1="110" y1="115" x2="170" y2="115" stroke-opacity="0.5"/>
        <!-- Person 1 left -->
        <ellipse cx="80" cy="50" rx="11" ry="14"/>
        <path d="M 70 64 L 68 100 Q 68 104 72 104 L 88 104 Q 92 104 92 100 L 90 64 Q 88 61 80 61 Q 72 61 70 64" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 68 64 L 92 64" stroke-width="1.2"/>
        <!-- Arms of person 1 -->
        <path d="M 70 70 Q 60 85 58 105" stroke-width="1.2"/>
        <path d="M 90 70 Q 105 85 110 105" stroke-width="1.2"/>
        <!-- Legs person 1 -->
        <path d="M 72 104 Q 70 120 68 140" stroke-width="1.2"/>
        <path d="M 88 104 Q 90 120 92 140" stroke-width="1.2"/>
        <!-- Person 2 right -->
        <ellipse cx="240" cy="50" rx="11" ry="14"/>
        <path d="M 230 64 L 228 100 Q 228 104 232 104 L 248 104 Q 252 104 252 100 L 250 64 Q 248 61 240 61 Q 232 61 230 64" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 228 64 L 252 64" stroke-width="1.2"/>
        <!-- Arms of person 2 -->
        <path d="M 230 70 Q 220 85 215 105" stroke-width="1.2"/>
        <path d="M 250 70 Q 260 85 262 105" stroke-width="1.2"/>
        <!-- Legs person 2 -->
        <path d="M 232 104 Q 230 120 228 140" stroke-width="1.2"/>
        <path d="M 248 104 Q 250 120 252 140" stroke-width="1.2"/>
        <!-- Connection line -->
        <path d="M 110 85 L 210 85" stroke-width="1" stroke-dasharray="3,3" opacity="0.4"/>
      </g>
    </svg>`,
    tags: ['combined', 'interaction', 'meeting', 'business', 'dialogue']
  },
  {
    id: 'combined_presentation',
    name: 'Person Presenting',
    nameKo: '프레젠테이션',
    category: 'combined',
    subcategory: 'professional',
    svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="316" height="176" rx="2" stroke="currentColor" fill="none" stroke-opacity="0.3" stroke-width="1"/>
      <g stroke="currentColor" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Screen/Board in background -->
        <rect x="180" y="30" width="70" height="60" fill="currentColor" fill-opacity="0.05"/>
        <!-- Content lines on screen -->
        <line x1="190" y1="40" x2="250" y2="40" stroke-opacity="0.5"/>
        <line x1="190" y1="50" x2="250" y2="50" stroke-opacity="0.5"/>
        <line x1="190" y1="60" x2="240" y2="60" stroke-opacity="0.5"/>
        <!-- Person presenting -->
        <ellipse cx="100" cy="48" rx="11" ry="14"/>
        <path d="M 90 62 L 88 100 Q 88 104 92 104 L 108 104 Q 112 104 112 100 L 110 62 Q 108 59 100 59 Q 92 59 90 62" fill="currentColor" fill-opacity="0.08"/>
        <path d="M 88 62 L 112 62" stroke-width="1.2"/>
        <!-- Pointing arm -->
        <path d="M 112 68 Q 135 55 160 50" stroke-width="1.2"/>
        <!-- Pointer hand -->
        <path d="M 160 50 L 165 45 L 162 55" stroke-width="1.2"/>
        <!-- Other arm relaxed -->
        <path d="M 90 68 Q 80 85 78 104" stroke-width="1.2"/>
        <!-- Legs -->
        <path d="M 92 104 Q 90 120 88 140" stroke-width="1.2"/>
        <path d="M 108 104 Q 110 120 112 140" stroke-width="1.2"/>
        <!-- Audience suggestion -->
        <circle cx="50" cy="130" r="5" fill="currentColor" fill-opacity="0.06"/>
        <circle cx="120" cy="140" r="5" fill="currentColor" fill-opacity="0.06"/>
      </g>
    </svg>`,
    tags: ['combined', 'presentation', 'professional', 'speaking', 'business']
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
