import {useState, FormEvent, MouseEvent} from "react";
import "./App.css";

type Note = {
  id: string;
  title: string;
  content: string;
  source: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: crypto.randomUUID(),
      title: "A title",
      content: "The content of the note",
      source: "default",
    },
    {
      id: crypto.randomUUID(),
      title: "A 2nd title",
      content: "The content of the second note",
      source: "default",
    },
    {
      id: crypto.randomUUID(),
      title: "A third title",
      content: "The content of the third note",
      source: "default",
    },
    {
      id: crypto.randomUUID(),
      title: "Fourth note title",
      content: "The content of the 4th note",
      source: "default",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSource(note.source);
  };

  const handleAddNote = (event: FormEvent) => {
    event.preventDefault();
    const source = "added";
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      source,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setSource("");
  };

  const handleUpdateNote = (event: FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title,
      content,
      source: "updated",
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSource("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleDeleteNote = (event: MouseEvent, noteId: string) => {
    event.stopPropagation();
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const renderedNotes = notes.map((note) => {
    return (
      <div
        className="note-item"
        key={note.id.toString()}
        onClick={() => handleNoteClick(note)}
      >
        <div className="notes-header">
          <button onClick={(e) => handleDeleteNote(e, note.id)}>x</button>
        </div>
        <h2 className="note-title">{note.title}</h2>
        <p className="note-content">{note.content}</p>
        <p className="note-source">
          <label htmlFor="source">source: </label>
          {note.source}
        </p>
      </div>
    );
  });

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(event) => {
          selectedNote ? handleUpdateNote(event) : handleAddNote(event);
        }}
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
          type="text"
          className="note-title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="content"
          rows={10}
          required
        ></textarea>
        <input value={source} hidden placeholder="source" readOnly />
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit" onClick={handleUpdateNote}>
              Save
            </button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add note</button>
        )}
      </form>
      <div className="notes-grid">{renderedNotes}</div>
    </div>
  );
}

export default App;
