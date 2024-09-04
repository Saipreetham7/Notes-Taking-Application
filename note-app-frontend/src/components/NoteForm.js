import React, { useState, useEffect } from 'react';
import '../CSS/LoginPage.css';

function NoteForm({ note, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ _id: note?._id, title, content });
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     placeholder="Title"
    //     required
    //   />
    //   <textarea
    //     value={content}
    //     onChange={(e) => setContent(e.target.value)}
    //     placeholder="Content"
    //     required
    //   />
    //   <button type="submit">Save</button>
    // </form>
    <div>
      <div className="container">
        <div className="note-form">
          <form onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              value={title}
              placeholder="Note Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea-field"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note Content"
              required
            ></textarea>
            <button className="save-button" type="submit">
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;
