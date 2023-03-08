import React from 'react';

function NoteList(props) {
  return (
    <ul>
      {props.notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
