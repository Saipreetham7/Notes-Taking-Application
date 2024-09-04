import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import '../CSS/NotesPage.css';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  const handleSaveNote = async (note) => {
    const token = localStorage.getItem('token');
    if (note._id) {
      await axios.put(`/api/notes/${note._id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post('/api/notes', note, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setEditingNote(null);
    const response = await axios.get('/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(response.data);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div>
      {/* <h1>My Notes</h1>
      <NoteForm note={editingNote} onSave={handleSaveNote} />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleEditNote(note)}>Edit</button>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <header>My Notes</header>
      <div className="container">
        <NoteForm note={editingNote} onSave={handleSaveNote} />
        <ul className="notes-list">
          {notes.map((note) => (
            <li className="note-item" key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <button
                className="edit-button"
                onClick={() => handleEditNote(note)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteNote(note._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotesPage;
