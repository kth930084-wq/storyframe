import { NextRequest, NextResponse } from 'next/server';

// 이메일 발송 (formsubmit.co 활용) + Firestore REST API 저장
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // 1. Firestore REST API로 저장 (인증 없이 공개 컬렉션)
    let firestoreId = '';
    try {
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'pewpew-cabe0';
      const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/proposals`;
      const firestoreRes = await fetch(firestoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            clientName: { stringValue: data.clientName || '' },
            clientCompany: { stringValue: data.clientCompany || '' },
            clientEmail: { stringValue: data.clientEmail || '' },
            clientPhone: { stringValue: data.clientPhone || '' },
            projectTitle: { stringValue: data.projectTitle || '' },
            projectDescription: { stringValue: data.projectDescription || '' },
            category: { stringValue: data.category || '' },
            contentType: { stringValue: data.contentType || '' },
            platforms: { stringValue: (data.platforms || []).join(', ') },
            tone: { stringValue: `${data.tonePref?.temp || ''} ${data.tonePref?.feel || ''}` },
            selectedPortfolios: { stringValue: (data.selectedPortfolioTitles || []).join(', ') },
            referenceNotes: { stringValue: data.referenceNotes || '' },
            budget: { stringValue: data.budget || '' },
            desiredDate: { stringValue: data.desiredDate || '' },
            deadline: { stringValue: data.deadline || '' },
            additionalNotes: { stringValue: data.additionalNotes || '' },
            submittedAt: { stringValue: new Date().toISOString() },
            status: { stringValue: 'new' },
          }
        }),
      });
      if (firestoreRes.ok) {
        const result = await firestoreRes.json();
        firestoreId = result.name || '';
      }
    } catch (e) {
      console.error('Firestore save failed:', e);
    }

    // 2. FormSubmit.co로 이메일 발송 → taehyoungking@pewpewstudio.com
    const emailBody = `
[PEWPEW Studio 영상 기획안]

■ 클라이언트
이름: ${data.clientName}
회사: ${data.clientCompany || '-'}
이메일: ${data.clientEmail}
연락처: ${data.clientPhone || '-'}

■ 프로젝트
제목: ${data.projectTitle}
설명: ${data.projectDescription || '-'}
카테고리: ${data.categoryLabel || '-'} / 유형: ${data.contentTypeLabel || '-'}
플랫폼: ${(data.platforms || []).join(', ') || '-'}
톤: ${data.tonePref?.temp || ''} ${data.tonePref?.feel || ''}
타겟: ${data.targetAudience || '-'}
목적: ${data.videoPurpose || '-'}
길이: ${data.desiredDuration || '-'}
납품 포맷: ${(data.deliveryFormat || []).join(', ') || '-'}

■ 참고 영상
${data.referenceText || '-'}

■ 일정/예산
촬영: ${data.desiredDate || '미정'} / 납품: ${data.deadline || '미정'}
예산: ${data.budget || '미정'}
${data.additionalNotes ? `\n추가: ${data.additionalNotes}` : ''}
`.trim();

    const emailRes = await fetch('https://formsubmit.co/ajax/taehyoungking@pewpewstudio.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `[영상 기획안] ${data.projectTitle} - ${data.clientCompany || data.clientName}`,
        name: data.clientName,
        email: data.clientEmail,
        message: emailBody,
        _template: 'box',
      }),
    });

    const emailResult = await emailRes.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      firestoreId,
      emailSent: emailRes.ok,
      emailResult,
    });
  } catch (err) {
    console.error('Proposal submission error:', err);
    return NextResponse.json({ success: false, error: 'Failed to submit proposal' }, { status: 500 });
  }
}
