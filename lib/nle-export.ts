export interface SceneForExport {
  id: string;
  title: string;
  duration: number; // seconds
  camera_angle?: string;
  shot_size?: string;
  camera_movement?: string;
  description?: string;
  dialogue?: string;
  notes?: string;
  transition?: string;
}

/**
 * Convert seconds to SMPTE timecode (HH:MM:SS:FF format)
 * @param seconds - Duration in seconds
 * @param fps - Frames per second (default: 24)
 * @returns Timecode string in HH:MM:SS:FF format
 */
export function secondsToTimecode(seconds: number, fps: number = 24): string {
  const totalFrames = Math.round(seconds * fps);
  const hours = Math.floor(totalFrames / (fps * 3600));
  const minutes = Math.floor((totalFrames % (fps * 3600)) / (fps * 60));
  const secs = Math.floor((totalFrames % (fps * 60)) / fps);
  const frames = totalFrames % fps;

  return [hours, minutes, secs, frames]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}

/**
 * Convert timecode back to seconds
 * @param timecode - SMPTE timecode string (HH:MM:SS:FF)
 * @param fps - Frames per second (default: 24)
 * @returns Duration in seconds
 */
function timecodeToSeconds(timecode: string, fps: number = 24): number {
  const [hours, minutes, seconds, frames] = timecode.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds + frames / fps;
}

/**
 * Export scenes as Final Cut Pro XML (fcpxml v1.10)
 * @param scenes - Array of scenes to export
 * @param projectTitle - Title of the project
 * @param fps - Frames per second (default: 24)
 * @returns XML string in fcpxml format
 */
export function exportToFCPXML(
  scenes: SceneForExport[],
  projectTitle: string,
  fps: number = 24
): string {
  const timebase = fps === 23.976 ? '24000/1001s' : `${Math.round(fps)}/1s`;

  // Build assets
  let assetsXml = '';
  scenes.forEach((scene, index) => {
    const format = fps === 23.976 ? '24000/1001s' : `${Math.round(fps)}/1s`;
    const duration = Math.round(scene.duration * fps);
    assetsXml += `
    <asset id="asset-${index + 1}" name="${escapeXml(scene.title)}" duration="${duration}s" format="${format}">
      <metadata>
        <md key="angle">${escapeXml(scene.camera_angle || 'N/A')}</md>
        <md key="shot">${escapeXml(scene.shot_size || 'N/A')}</md>
        <md key="movement">${escapeXml(scene.camera_movement || 'N/A')}</md>
        <md key="description">${escapeXml(scene.description || '')}</md>
        <md key="dialogue">${escapeXml(scene.dialogue || '')}</md>
        <md key="notes">${escapeXml(scene.notes || '')}</md>
        <md key="transition">${escapeXml(scene.transition || 'Cut')}</md>
      </metadata>
    </asset>`;
  });

  // Build timeline clips
  let timelineXml = '';
  let timelinePosition = 0;
  scenes.forEach((scene, index) => {
    const duration = Math.round(scene.duration * fps);
    const offset = Math.round(timelinePosition);
    timelineXml += `
      <clip name="${escapeXml(scene.title)}" offset="${offset}s" duration="${duration}s">
        <asset-clip asset-id="asset-${index + 1}" offset="0s" duration="${duration}s" />
      </clip>`;
    timelinePosition += scene.duration;
  });

  const totalFrames = Math.round(scenes.reduce((sum, s) => sum + s.duration, 0) * fps);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.10">
  <resources>
    <format id="fmt-1" name="NTSC 24p" frameDuration="1001/24000s" width="1920" height="1080" />
    <timecodeFormat id="tc1" name="Timecode 1" fps="24" />
  </resources>
  <library>
    <event name="${escapeXml(projectTitle)}">
      <clip name="${escapeXml(projectTitle)}" duration="${totalFrames}s">
        <assetclip>
          ${assetsXml}
        </assetclip>
      </clip>
      <sequence name="${escapeXml(projectTitle)}" duration="${totalFrames}s" format="fmt-1" tcStart="0s" tcFormat="tc1">
        <spine>
          ${timelineXml}
        </spine>
      </sequence>
    </event>
  </library>
</fcpxml>`;

  return xml;
}

/**
 * Export scenes as CMX3600 EDL format
 * @param scenes - Array of scenes to export
 * @param projectTitle - Title of the project
 * @param fps - Frames per second (default: 24)
 * @returns EDL string
 */
export function exportToEDL(
  scenes: SceneForExport[],
  projectTitle: string,
  fps: number = 24
): string {
  const lines: string[] = [];

  // Header
  lines.push(`TITLE: ${projectTitle}`);
  lines.push('FCM: NON-DROP FRAME');
  lines.push('');

  // EDL Events
  let recordingPosition = 0;
  scenes.forEach((scene, index) => {
    const sceneNumber = String(index + 1).padStart(3, '0');

    // Source in/out (assuming 1 hour max per clip for simplicity)
    const sourceStart = secondsToTimecode(0, fps);
    const sourceEnd = secondsToTimecode(scene.duration, fps);
    const recordStart = secondsToTimecode(recordingPosition, fps);
    const recordEnd = secondsToTimecode(recordingPosition + scene.duration, fps);

    // Main EDL line: 001  AX  V  C  00:00:00:00 00:00:05:00 00:00:00:00 00:00:05:00
    lines.push(
      `${sceneNumber}  AX  V  C    ${sourceStart} ${sourceEnd} ${recordStart} ${recordEnd}`
    );

    // Clip name comment
    lines.push(`* FROM CLIP NAME: ${scene.title}`);

    // Shot details comment
    const shotDetails = [
      scene.shot_size,
      scene.camera_angle,
      scene.camera_movement,
    ]
      .filter(Boolean)
      .join(' / ');

    if (shotDetails) {
      lines.push(`* COMMENT: ${shotDetails}`);
    }

    // Description if available
    if (scene.description) {
      lines.push(`* DESC: ${scene.description.substring(0, 120)}`);
    }

    // Transition
    if (scene.transition && scene.transition !== 'Cut') {
      lines.push(`* TRANSITION: ${scene.transition}`);
    }

    lines.push('');
    recordingPosition += scene.duration;
  });

  return lines.join('\n');
}

/**
 * Export scenes as CSV format with Korean headers
 * @param scenes - Array of scenes to export
 * @returns CSV string with proper escaping
 */
export function exportToCSV(scenes: SceneForExport[]): string {
  const headers = [
    '씬번호',
    '제목',
    '시간(초)',
    '시간(타임코드)',
    '앵글',
    '샷사이즈',
    '카메라무빙',
    '설명',
    '대사',
    '전환',
    '비고',
  ];

  const lines: string[] = [];

  // Add headers
  lines.push(headers.map(h => escapeCsvField(h)).join(','));

  // Add scene data
  let accumulatedTime = 0;
  scenes.forEach((scene, index) => {
    const sceneNumber = index + 1;
    const timecode = secondsToTimecode(accumulatedTime, 24);

    const row = [
      sceneNumber.toString(),
      escapeCsvField(scene.title),
      scene.duration.toString(),
      timecode,
      escapeCsvField(scene.camera_angle || ''),
      escapeCsvField(scene.shot_size || ''),
      escapeCsvField(scene.camera_movement || ''),
      escapeCsvField(scene.description || ''),
      escapeCsvField(scene.dialogue || ''),
      escapeCsvField(scene.transition || 'Cut'),
      escapeCsvField(scene.notes || ''),
    ];

    lines.push(row.join(','));
    accumulatedTime += scene.duration;
  });

  return lines.join('\n');
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Escape CSV field values
 */
function escapeCsvField(field: string): string {
  if (!field) return '';
  // If field contains comma, newline, or quote, wrap in quotes and escape quotes
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

/**
 * Trigger a file download in the browser
 * @param content - File content as string
 * @param filename - Filename for download
 * @param mimeType - MIME type (default: text/plain)
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  try {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download file:', error);
    throw new Error('파일 다운로드에 실패했습니다.');
  }
}

/**
 * Calculate total duration of scenes
 * @param scenes - Array of scenes
 * @returns Total duration in seconds
 */
export function calculateTotalDuration(scenes: SceneForExport[]): number {
  return scenes.reduce((sum, scene) => sum + scene.duration, 0);
}

/**
 * Format duration in MM:SS format
 * @param seconds - Duration in seconds
 * @returns Formatted string MM:SS
 */
export function formatDurationDisplay(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
