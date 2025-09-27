import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { collection, doc, setDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from './AuthContext';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);

  // Load user's notes when user changes
  useEffect(() => {
    if (!user) {
      setNotes({});
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = {};
      querySnapshot.forEach((doc) => {
        const noteData = doc.data();
        notesData[noteData.topicPath] = {
          id: doc.id,
          ...noteData
        };
      });
      setNotes(notesData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const saveNote = useCallback(async (topicPath, topicTitle, content) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const noteId = `${user.uid}_${topicPath.replace(/\//g, '_')}`;
      const noteRef = doc(db, 'notes', noteId);

      const noteData = {
        userId: user.uid,
        topicPath,
        topicTitle,
        content,
        updatedAt: new Date(),
        createdAt: notes[topicPath]?.createdAt || new Date()
      };

      await setDoc(noteRef, noteData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [user, notes]);

  const getNote = useCallback((topicPath) => {
    return notes[topicPath] || null;
  }, [notes]);

  const deleteNote = useCallback(async (topicPath) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const noteId = `${user.uid}_${topicPath.replace(/\//g, '_')}`;
      await deleteDoc(doc(db, 'notes', noteId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [user]);

  const uploadImage = useCallback(async (file) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    try {
      const path = `notes/${user.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return { success: true, url, path };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, [user]);

  const deleteImage = useCallback(async (imagePath) => {
    try {
      const storageRef = ref(storage, imagePath);
      await deleteObject(storageRef);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, []);

  const getAllNotes = useCallback(() => {
    const toDate = (v) => (v?.toDate ? v.toDate() : v instanceof Date ? v : v ? new Date(v) : new Date(0));
    return Object.values(notes).sort((a, b) => toDate(b.updatedAt) - toDate(a.updatedAt));
  }, [notes]);

  const value = useMemo(() => ({
    notes,
    loading,
    saveNote,
    getNote,
    deleteNote,
    uploadImage,
    deleteImage,
    getAllNotes
  }), [notes, loading, saveNote, getNote, deleteNote, uploadImage, deleteImage, getAllNotes]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};
