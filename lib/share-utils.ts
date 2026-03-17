import { db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  collectionGroup,
  Unsubscribe,
  QueryConstraint,
} from 'firebase/firestore';

export interface FeedbackItem {
  id: string;
  sceneId: string;
  author: string;
  type: 'comment' | 'approve' | 'request_edit';
  content: string;
  resolved: boolean;
  createdAt: any;
}

/**
 * Generate a random share token using Math.random
 * Creates a 12-character alphanumeric string
 */
export function generateShareToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Get project by share token
 * Searches across all users' projects for matching shareToken
 */
export async function getProjectByShareToken(
  token: string
): Promise<{ project: any; projectId: string; userId: string } | null> {
  if (!db) return null;

  try {
    // Query collectionGroup to search all projects across all users
    const projectsQuery = query(
      collectionGroup(db, 'projects'),
      where('shareToken', '==', token)
    );

    const snapshot = await getDocs(projectsQuery);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const projectData = doc.data();

    // Extract userId from document path: users/{uid}/projects/{projectId}
    const pathParts = doc.ref.path.split('/');
    const userId = pathParts[1];
    const projectId = pathParts[3];

    return {
      project: projectData,
      projectId,
      userId,
    };
  } catch (error) {
    console.error('Error getting project by share token:', error);
    return null;
  }
}

/**
 * Add feedback to project's feedbacks subcollection
 */
export async function addFeedback(
  userId: string,
  projectId: string,
  feedback: Omit<FeedbackItem, 'id' | 'createdAt' | 'resolved'>
): Promise<string> {
  if (!db) throw new Error('Database not initialized');

  try {
    const feedbacksRef = collection(
      db,
      'users',
      userId,
      'projects',
      projectId,
      'feedbacks'
    );

    const docRef = await addDoc(feedbacksRef, {
      sceneId: feedback.sceneId,
      author: feedback.author,
      type: feedback.type,
      content: feedback.content,
      resolved: false,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
}

/**
 * Subscribe to feedbacks in real-time
 * Returns unsubscribe function
 */
export function subscribeFeedbacks(
  userId: string,
  projectId: string,
  callback: (feedbacks: FeedbackItem[]) => void
): Unsubscribe {
  if (!db) {
    return () => {};
  }

  try {
    const feedbacksRef = collection(
      db,
      'users',
      userId,
      'projects',
      projectId,
      'feedbacks'
    );

    const feedbacksQuery = query(
      feedbacksRef,
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(feedbacksQuery, (snapshot) => {
      const feedbacks: FeedbackItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as FeedbackItem));

      callback(feedbacks);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to feedbacks:', error);
    return () => {};
  }
}

/**
 * Enable share link for a project
 * Generates a token and saves it to project document
 */
export async function enableShareLink(
  userId: string,
  projectId: string
): Promise<string> {
  if (!db) throw new Error('Database not initialized');

  try {
    const token = generateShareToken();
    const projectRef = doc(db, 'users', userId, 'projects', projectId);

    await updateDoc(projectRef, {
      shareToken: token,
      shareEnabledAt: serverTimestamp(),
    });

    return token;
  } catch (error) {
    console.error('Error enabling share link:', error);
    throw error;
  }
}

/**
 * Disable share link for a project
 * Removes shareToken from project document
 */
export async function disableShareLink(
  userId: string,
  projectId: string
): Promise<void> {
  if (!db) throw new Error('Database not initialized');

  try {
    const projectRef = doc(db, 'users', userId, 'projects', projectId);

    await updateDoc(projectRef, {
      shareToken: null,
      shareEnabledAt: null,
    });
  } catch (error) {
    console.error('Error disabling share link:', error);
    throw error;
  }
}
