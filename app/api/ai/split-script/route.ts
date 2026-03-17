import { NextRequest, NextResponse } from 'next/server';
import { SHOT_SIZES, CAMERA_ANGLES, CAMERA_MOVEMENTS } from '@/lib/constants';

interface AIScene {
  id: string;
  title: string;
  duration: number;
  camera_angle: string;
  shot_size: string;
  camera_movement: string;
  description: string;
  dialogue: string;
  notes: string;
}

interface ParsedScene {
  title: string;
  description: string;
  dialogue: string;
  notes: string;
  shot_size?: string;
  camera_angle?: string;
  camera_movement?: string;
}

// Rule-based fallback parser for script splitting
function parseScriptWithRules(script: string): ParsedScene[] {
  const scenes: ParsedScene[] = [];

  // Split by common scene delimiters (Korean and English)
  const sceneDelimiters = /(?:^|\n\n)(?:씬|Scene|S\d+|#\d+|\[씬|【씬)[\s\d]*[:：]?/gm;
  const blocks = script.split(sceneDelimiters).filter(block => block.trim().length > 0);

  const shotSizesArray = SHOT_SIZES.map(s => s.value);
  const camerAnglesArray = CAMERA_ANGLES.map(c => c.value);
  const cameraMovementsArray = CAMERA_MOVEMENTS.map(m => m.value);

  blocks.forEach((block, index) => {
    const lines = block.split('\n').filter(l => l.trim());
    if (lines.length === 0) return;

    const sceneTitle = lines[0].trim();
    let description = '';
    let dialogue = '';
    let notes = '';
    let shotSize = shotSizesArray[index % shotSizesArray.length];
    let cameraAngle = camerAnglesArray[index % camerAnglesArray.length];
    let cameraMovement = cameraMovementsArray[index % cameraMovementsArray.length];

    // Parse remaining lines
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for shot size markers
      const foundShotSize = shotSizesArray.find(s => line.toLowerCase().includes(s.toLowerCase()));
      if (foundShotSize) {
        shotSize = foundShotSize;
      }

      // Check for camera angle markers
      const foundAngle = camerAnglesArray.find(a => line.toLowerCase().includes(a.toLowerCase()));
      if (foundAngle) {
        cameraAngle = foundAngle;
      }

      // Check for camera movement markers
      const foundMovement = cameraMovementsArray.find(m => line.toLowerCase().includes(m.toLowerCase()));
      if (foundMovement) {
        cameraMovement = foundMovement;
      }

      // Categorize content
      if (line.match(/^\(.*\)$/)) {
        description += (description ? '\n' : '') + line;
      } else if (line.match(/["'].*["']/)) {
        dialogue += (dialogue ? '\n' : '') + line;
      } else if (line.startsWith('주:') || line.startsWith('NOTE:')) {
        notes += (notes ? '\n' : '') + line;
      } else {
        description += (description ? '\n' : '') + line;
      }
    }

    scenes.push({
      title: sceneTitle,
      description: description || '(설명 필요)',
      dialogue: dialogue || '',
      notes: notes || '',
      shot_size: shotSize,
      camera_angle: cameraAngle,
      camera_movement: cameraMovement,
    });
  });

  return scenes.length > 0 ? scenes : [];
}

// Call OpenAI API with native fetch
async function callOpenAI(prompt: string, systemPrompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', error);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    return null;
  }
}

// Parse JSON from response (handle markdown code blocks)
function extractJSON(text: string): any[] | null {
  try {
    // Try direct JSON parsing
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Try markdown code block
    const blockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (blockMatch) {
      return JSON.parse(blockMatch[1]);
    }

    // Last resort - find array in text
    const bracketMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (bracketMatch) {
      return JSON.parse(bracketMatch[0]);
    }

    return null;
  } catch (e) {
    console.error('JSON parsing failed:', e);
    return null;
  }
}

function splitScriptIntoChunks(script: string, maxChunkSize: number = 3000): string[] {
  if (script.length <= maxChunkSize) {
    return [script];
  }

  const chunks: string[] = [];
  let currentChunk = '';

  const paragraphs = script.split('\n\n');

  for (const para of paragraphs) {
    if ((currentChunk + para).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export async function POST(req: NextRequest) {
  try {
    const { script } = await req.json();

    if (!script || typeof script !== 'string' || script.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '대본이 비어있습니다.' },
        { status: 400 }
      );
    }

    let aiScenes: ParsedScene[] = [];
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Try to use OpenAI API
      const shotSizesList = SHOT_SIZES.map(s => `- ${s.value} (${s.short})`).join('\n');
      const cameraAnglesList = CAMERA_ANGLES.map(c => c.value).join(', ');
      const cameraMovementsList = CAMERA_MOVEMENTS.map(m => m.value).join(', ');

      const systemPrompt = `당신은 15년 경력의 영화 감독입니다. 주어진 대본을 분석하여 각 씬을 구조화된 JSON 형식으로 분할해야 합니다.

각 씬은 다음 정보를 포함해야 합니다:
- title: 씬의 제목 (장소와 주요 액션)
- description: 씬의 영상적 설명 (분위기, 배경, 조명 등)
- dialogue: 대사나 음성
- notes: 제작 시 주의사항
- shot_size: 다음 중 하나: ${SHOT_SIZES.map(s => s.value).join(', ')}
- camera_angle: 다음 중 하나: ${cameraAnglesList}
- camera_movement: 다음 중 하나: ${cameraMovementsList}

당신의 목표는 대본의 의도를 최대한 보존하면서 시각적으로 강력하고 실현 가능한 씬을 제안하는 것입니다.`;

      const userPrompt = `다음 대본을 분석하여 각 씬을 구조화된 JSON 배열로 변환해주세요. JSON만 반환하고 다른 설명은 하지 마세요.

대본:
${script}

응답 형식 (반드시 JSON 배열이어야 함):
[
  {
    "title": "씬 제목",
    "description": "영상적 설명",
    "dialogue": "대사",
    "notes": "제작 주의사항",
    "shot_size": "샷 크기",
    "camera_angle": "카메라 앵글",
    "camera_movement": "카메라 움직임"
  }
]`;

      const aiResponse = await callOpenAI(userPrompt, systemPrompt);

      if (aiResponse) {
        try {
          const parsed = extractJSON(aiResponse);
          if (Array.isArray(parsed) && parsed.length > 0) {
            aiScenes = parsed.map(scene => ({
              title: scene.title || '(제목 없음)',
              description: scene.description || '(설명 필요)',
              dialogue: scene.dialogue || '',
              notes: scene.notes || '',
              shot_size: scene.shot_size || SHOT_SIZES[0].value,
              camera_angle: scene.camera_angle || CAMERA_ANGLES[0].value,
              camera_movement: scene.camera_movement || CAMERA_MOVEMENTS[0].value,
            }));
          }
        } catch (e) {
          console.error('Failed to parse AI response:', e);
        }
      }
    }

    // Fallback to rule-based parsing if AI didn't work
    if (aiScenes.length === 0) {
      aiScenes = parseScriptWithRules(script);
    }

    if (aiScenes.length === 0) {
      return NextResponse.json(
        { success: false, error: '대본을 분석할 수 없습니다. 씬으로 구분되어 있는지 확인해주세요.' },
        { status: 400 }
      );
    }

    // Convert to AIScene format with IDs
    const scenes: AIScene[] = aiScenes.map((scene, index) => ({
      id: `scene_${Date.now()}_${index}`,
      title: scene.title,
      duration: 5, // Default duration
      camera_angle: scene.camera_angle || CAMERA_ANGLES[0].value,
      shot_size: scene.shot_size || SHOT_SIZES[index % SHOT_SIZES.length].value,
      camera_movement: scene.camera_movement || CAMERA_MOVEMENTS[0].value,
      description: scene.description,
      dialogue: scene.dialogue,
      notes: scene.notes,
    }));

    return NextResponse.json({
      success: true,
      scenes,
    });
  } catch (error) {
    console.error('Script splitting error:', error);
    return NextResponse.json(
      { success: false, error: '대본 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
