import { useState, useEffect } from 'react';
import { db } from '../../core/firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../core/auth/AuthContext';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

function Notes() {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'notes'),
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const notesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setNotes(notesData);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notlarım</h1>
      <NoteForm setNotes={setNotes} />
      {loading ? (
        <p>Notlar yükleniyor...</p>
      ) : (
        <NoteList notes={notes} setNotes={setNotes} />
      )}
    </div>
  );
}

export default Notes;