'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getProjectByShareToken, subscribeFeedbacks, addFeedback, FeedbackItem } from '@/lib/share-utils';
import { Film } from 'lucide-react';

interface ProjectData {
  title?: string;
  brand?: string;
  description?: string;
  scenes?: SceneData[];
  shareToken?: string;
}

interface SceneData {
  id: string;
  sceneNumber: number;
  description?: string;
  dialogue?: string;
  shotInfo?: string;
  imageUrl?: string;
  thumbnail?: string;
}

interface SceneWithFeedback {
  scene: SceneData;
  feedbacks: FeedbackItem[];
  approvalsCount: number;
  commentsCount: number;
  editsCount: number;
}

interface NameModalState {
  isOpen: boolean;
  inputValue: string;
}

export default function SharePage() {
  const params = useParams();
  const token = params.token as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [projectId, setProjectId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [nameModal, setNameModal] = useState<NameModalState>({ isOpen: false, inputValue: '' });
  const [userName, setUserName] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [scenesWithFeedback, setScenesWithFeedback] = useState<SceneWithFeedback[]>([]);
  const [expandedScenes, setExpandedScenes] = useState<Set<string>>(new Set());
  const [activeCommentScene, setActiveCommentScene] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [submittingFeedback, setSubmittingFeedback] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Initialize: get project and check for saved name
  useEffect(() => {
    const initializeShare = async () => {
      setLoading(true);

      // Check for saved name
      if (typeof window !== 'undefined') {
        const savedName = localStorage.getItem('pewpew_feedback_name');
        if (savedName) {
          setUserName(savedName);
        } else {
          setNameModal({ isOpen: true, inputValue: '' });
        }
      }

      // Get project by share token
      const result = await getProjectByShareToken(token);

      if (!result) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProject(result.project);
      setProjectId(result.projectId);
      setUserId(result.userId);
      setLoading(false);
    };

    if (token) {
      initializeShare();
    }
  }, [token]);

  // Subscribe to feedbacks when we have userId and projectId
  useEffect(() => {
    if (!userId || !projectId) return;

    const unsubscribe = subscribeFeedbacks(userId, projectId, (updatedFeedbacks) => {
      setFeedbacks(updatedFeedbacks);
    });

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [userId, projectId]);

  // Update scenesWithFeedback when feedbacks or project changes
  useEffect(() => {
    if (!project?.scenes) return;

    const updated: SceneWithFeedback[] = project.scenes.map((scene) => {
      const sceneFeedbacks = feedbacks.filter((f) => f.sceneId === scene.id);
      const approvalsCount = sceneFeedbacks.filter((f) => f.type === 'approve').length;
      const commentsCount = sceneFeedbacks.filter((f) => f.type === 'comment').length;
      const editsCount = sceneFeedbacks.filter((f) => f.type === 'request_edit').length;

      return {
        scene,
        feedbacks: sceneFeedbacks,
        approvalsCount,
        commentsCount,
        editsCount,
      };
    });

    setScenesWithFeedback(updated);
  }, [project, feedbacks]);

  const handleNameModalSubmit = () => {
    const name = nameModal.inputValue.trim() || '익명';
    setUserName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pewpew_feedback_name', name);
    }
    setNameModal({ isOpen: false, inputValue: '' });
  };

  const handleQuickApprove = async (sceneId: string) => {
    if (!userId || !projectId || !userName) return;
    setSubmittingFeedback(sceneId);

    try {
      await addFeedback(userId, projectId, {
        sceneId,
        author: userName,
        type: 'approve',
        content: '',
      });
    } catch (error) {
      console.error('Error adding approval:', error);
    } finally {
      setSubmittingFeedback(null);
    }
  };

  const handleCommentSubmit = async (sceneId: string) => {
    if (!userId || !projectId || !userName || !commentText.trim()) return;

    setSubmittingFeedback(sceneId);

    try {
      await addFeedback(userId, projectId, {
        sceneId,
        author: userName,
        type: activeCommentScene === sceneId ? 'comment' : 'request_edit',
        content: commentText,
      });
      setCommentText('');
      setActiveCommentScene(null);
    } catch (error) {
      console.error('Error adding feedback:', error);
    } finally {
      setSubmittingFeedback(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diff = now.getTime() - date.getTime();

      // Less than 1 minute
      if (diff < 60000) {
        return '방금 전';
      }
      // Less than 1 hour
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}분 전`;
      }
      // Less than 1 day
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}시간 전`;
      }
      // Less than 7 days
      if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}일 전`;
      }

      // Format as date
      return date.toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return '';
    }
  };

  const getFeedbackTypeBadge = (type: string) => {
    switch (type) {
      case 'approve':
        return (
          <span className="inline-block px-2 py-1 bg-green-900 text-green-200 text-xs rounded">
            ✓ 승인
          </span>
        );
      case 'comment':
        return (
          <span className="inline-block px-2 py-1 bg-blue-900 text-blue-200 text-xs rounded">
            💬 코멘트
          </span>
        );
      case 'request_edit':
        return (
          <span className="inline-block px-2 py-1 bg-yellow-900 text-yellow-200 text-xs rounded">
            ✏️ 수정요청
          </span>
        );
      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gray-700 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">로딩 중...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h1 className="text-2xl font-bold mb-2">이 링크는 더 이상 유효하지 않습니다</h1>
          <p className="text-gray-400">공유된 스토리보드를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // Calculate total feedback stats
  const totalApprovals = scenesWithFeedback.reduce((sum, s) => sum + s.approvalsCount, 0);
  const totalComments = scenesWithFeedback.reduce((sum, s) => sum + s.commentsCount, 0);
  const totalEdits = scenesWithFeedback.reduce((sum, s) => sum + s.editsCount, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Name Modal */}
      {nameModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm mx-4 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">피드백을 남길 이름을 입력해주세요</h2>
            <input
              type="text"
              placeholder="이름 (필수)"
              value={nameModal.inputValue}
              onChange={(e) => setNameModal({ ...nameModal, inputValue: e.target.value })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNameModalSubmit();
                }
              }}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-4"
              autoFocus
            />
            <button
              onClick={handleNameModalSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">PEWPEW 스토리보드</h1>
          </div>
          {project && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{project.title || 'Untitled Project'}</h2>
              {project.brand && <p className="text-gray-400 mb-1">브랜드: {project.brand}</p>}
              {project.description && <p className="text-gray-300">{project.description}</p>}
            </div>
          )}
        </div>
      </header>

      {/* Feedback Stats */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6">
            <div>
              <div className="text-sm text-gray-400">승인</div>
              <div className="text-2xl font-bold text-green-400">{totalApprovals}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">코멘트</div>
              <div className="text-2xl font-bold text-blue-400">{totalComments}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">수정요청</div>
              <div className="text-2xl font-bold text-yellow-400">{totalEdits}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">활성 피드백 제공자</div>
              <div className="text-2xl font-bold text-purple-400">{userName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenes Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenesWithFeedback.map(({ scene, feedbacks, approvalsCount, commentsCount, editsCount }) => (
            <div
              key={scene.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
            >
              {/* Scene Image */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center border-b border-gray-800 relative overflow-hidden">
                {scene.imageUrl || scene.thumbnail ? (
                  <img
                    src={scene.imageUrl || scene.thumbnail}
                    alt={`Scene ${scene.sceneNumber}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Film className="w-12 h-12 text-gray-700 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">이미지 없음</p>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-3 py-1 rounded text-sm font-bold">
                  Scene {scene.sceneNumber}
                </div>
              </div>

              {/* Scene Info */}
              <div className="p-4 border-b border-gray-800">
                {scene.description && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">상황</p>
                    <p className="text-sm text-gray-300">{scene.description}</p>
                  </div>
                )}

                {scene.dialogue && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">대사</p>
                    <p className="text-sm text-gray-300 italic">"{scene.dialogue}"</p>
                  </div>
                )}

                {scene.shotInfo && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">샷 정보</p>
                    <div className="flex flex-wrap gap-2">
                      {scene.shotInfo.split(',').map((info, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                        >
                          {info.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Stats for Scene */}
              <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex gap-3 text-xs">
                <span className="text-green-400">승인 {approvalsCount}</span>
                <span className="text-blue-400">코멘트 {commentsCount}</span>
                <span className="text-yellow-400">수정 {editsCount}</span>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-b border-gray-800 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQuickApprove(scene.id)}
                  disabled={submittingFeedback === scene.id}
                  className="py-2 px-3 bg-green-900 hover:bg-green-800 disabled:bg-gray-700 text-green-200 text-sm font-medium rounded transition-colors"
                >
                  {submittingFeedback === scene.id ? '저장...' : '👍 승인'}
                </button>

                <button
                  onClick={() => {
                    setActiveCommentScene(activeCommentScene === scene.id ? null : scene.id);
                    setCommentText('');
                  }}
                  className="py-2 px-3 bg-blue-900 hover:bg-blue-800 text-blue-200 text-sm font-medium rounded transition-colors"
                >
                  💬 코멘트
                </button>

                <button
                  onClick={() => {
                    setActiveCommentScene(activeCommentScene === `edit_${scene.id}` ? null : `edit_${scene.id}`);
                    setCommentText('');
                  }}
                  className="py-2 px-3 bg-yellow-900 hover:bg-yellow-800 text-yellow-200 text-sm font-medium rounded transition-colors"
                >
                  ✏️ 수정요청
                </button>
              </div>

              {/* Comment Input */}
              {activeCommentScene === scene.id && (
                <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="코멘트를 입력하세요..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-2"
                    rows={3}
                  />
                  <button
                    onClick={() => handleCommentSubmit(scene.id)}
                    disabled={submittingFeedback === scene.id || !commentText.trim()}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
                  >
                    {submittingFeedback === scene.id ? '저장...' : '코멘트 제출'}
                  </button>
                </div>
              )}

              {activeCommentScene === `edit_${scene.id}` && (
                <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="수정 요청 내용을 입력하세요..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 mb-2"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      if (commentText.trim()) {
                        setSubmittingFeedback(scene.id);
                        addFeedback(userId, projectId, {
                          sceneId: scene.id,
                          author: userName,
                          type: 'request_edit',
                          content: commentText,
                        })
                          .then(() => {
                            setCommentText('');
                            setActiveCommentScene(null);
                          })
                          .catch(console.error)
                          .finally(() => setSubmittingFeedback(null));
                      }
                    }}
                    disabled={submittingFeedback === scene.id || !commentText.trim()}
                    className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
                  >
                    {submittingFeedback === scene.id ? '저장...' : '수정요청 제출'}
                  </button>
                </div>
              )}

              {/* Feedbacks List */}
              {feedbacks.length > 0 && (
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">피드백</p>
                  <div className="space-y-3">
                    {feedbacks.map((feedback) => (
                      <div key={feedback.id} className="bg-gray-800 rounded p-3 border border-gray-700">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {getFeedbackTypeBadge(feedback.type)}
                            <span className="text-xs text-gray-400">{feedback.author}</span>
                          </div>
                          <span className="text-xs text-gray-600 whitespace-nowrap">
                            {formatDate(feedback.createdAt)}
                          </span>
                        </div>
                        {feedback.content && (
                          <p className="text-sm text-gray-300 mt-2">{feedback.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {(!scenesWithFeedback || scenesWithFeedback.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-400">시작할 신(Scene)이 없습니다.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>PEWPEW 스토리보드 | 클라이언트 피드백</p>
        </div>
      </footer>
    </div>
  );
}
