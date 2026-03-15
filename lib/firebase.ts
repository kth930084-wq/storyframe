import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase (prevent duplicate initialization)
// Only initialize if we have valid config (skip during build/SSR with missing env vars)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  if (getApps().length === 0 && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
  } else if (getApps().length > 0) {
    app = getApps()[0];
  }

  // Only initialize auth and db if app was successfully initialized
  if (app) {
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  // Silently fail during SSR/build time
  console.warn('Firebase initialization skipped (running on server or missing config)');
}

// ========== 공지사항 (Announcements) ==========
export interface Announcement {
  id?: string;
  title: string;
  content: string;
  type: 'info' | 'update' | 'important';
  active: boolean;
  created_at?: any;
  updated_at?: any;
  author_email?: string;
}

const ANNOUNCEMENTS_COLLECTION = 'announcements';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, ANNOUNCEMENTS_COLLECTION), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Announcement));
  } catch (error) {
    console.error('공지사항 불러오기 실패:', error);
    return [];
  }
};

export const addAnnouncement = async (announcement: Omit<Announcement, 'id'>): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = await addDoc(collection(db, ANNOUNCEMENTS_COLLECTION), {
      ...announcement,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('공지사항 추가 실패:', error);
    return null;
  }
};

export const updateAnnouncement = async (id: string, data: Partial<Announcement>): Promise<boolean> => {
  if (!db) return false;
  try {
    await updateDoc(doc(db, ANNOUNCEMENTS_COLLECTION, id), {
      ...data,
      updated_at: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
    return false;
  }
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, ANNOUNCEMENTS_COLLECTION, id));
    return true;
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
    return false;
  }
};

export { app, auth, db };
export type { User, Auth, Firestore };
